// src/core/character/createEmptyCharacter.js

import { uid } from '@/app/utils/uid'
import { getRuleset } from '@/rulesets/registry'

/**
 * Converte um array de chaves em um objeto-mapa: { key: initValue }
 *
 * @template T
 * @param {string[]} keys
 * @param {T | ((key: string) => T)} initValue
 * @returns {Record<string, T>}
 */
function arrayToMap(keys, initValue) {
  return (keys || []).reduce((acc, k) => {
    acc[k] = typeof initValue === 'function' ? initValue(k) : initValue
    return acc
  }, {})
}

/**
 * ===============================
 * 🧠 Atributos — Modelo Canônico
 * ===============================
 *
 * Estrutura adotada:
 *
 * sheet.attributes = {
 *   creation: {
 *     method: 'manual'|'pointBuy'|'array'|'roll',
 *     base: { str: 0, dex: 0, ... },
 *     notes: ''
 *   },
 *   advancement: {
 *     increases: { str: 0, dex: 0, ... },
 *     byLevel: {
 *       2: { str: 1 },
 *       5: { dex: 1 }
 *     }
 *   },
 *   misc: { str: 0, dex: 0, ... },
 *   temp: { str: 0, dex: 0, ... }
 * }
 *
 * Valor final de atributo =
 *   creation.base
 * + advancement.increases
 * + misc
 * + temp
 * (+ modifiers vindos do engine)
 */

/**
 * Retorna o valor atual de um atributo.
 *
 * @param {object} character
 * @param {string} attrKey
 * @param {object} schema
 * @param {object} [mods] - modificadores resolvidos pelo engine (opcional)
 * @returns {number}
 */
export function getAttributeCurrent(character, attrKey, schema, mods = null) {
  const attributeKeys = (schema?.attributes ?? []).map(a => a.key)

  const attrs = character?.sheet?.attributes ?? {}

  const creation = attrs.creation?.base ?? arrayToMap(attributeKeys, 0)
  const inc = attrs.advancement?.increases ?? arrayToMap(attributeKeys, 0)
  const misc = attrs.misc ?? arrayToMap(attributeKeys, 0)
  const temp = attrs.temp ?? arrayToMap(attributeKeys, 0)

  const baseValue =
    (Number(creation?.[attrKey]) || 0) +
    (Number(inc?.[attrKey]) || 0) +
    (Number(misc?.[attrKey]) || 0) +
    (Number(temp?.[attrKey]) || 0)

  const modValue = Number(mods?.attributes?.[attrKey] || 0)

  return baseValue + modValue
}

/**
 * Aplica aumento permanente de atributo (ex: poder de classe).
 *
 * @param {object} character
 * @param {string} attrKey
 * @param {number} amount
 */
export function applyAttributeIncrease(character, attrKey, amount = 1) {
  const attrs = character?.sheet?.attributes
  if (!attrs) return

  if (!attrs.advancement) {
    attrs.advancement = { increases: {}, byLevel: {} }
  }

  if (!attrs.advancement.increases[attrKey]) {
    attrs.advancement.increases[attrKey] = 0
  }

  attrs.advancement.increases[attrKey] += amount

  const level = Number(character?.progression?.level || 1)

  if (!attrs.advancement.byLevel[level]) {
    attrs.advancement.byLevel[level] = {}
  }

  if (!attrs.advancement.byLevel[level][attrKey]) {
    attrs.advancement.byLevel[level][attrKey] = 0
  }

  attrs.advancement.byLevel[level][attrKey] += amount
}

/**
 * ===============================
 * 🎭 Criação do Personagem
 * ===============================
 *
 * Compatível com:
 * - Modelo antigo (build.grantedFeatureIds)
 * - Modelo novo (progression.classId + picksByLevel)
 *
 * @param {object} [params]
 * @param {string} [params.systemId='t20']
 * @returns {object}
 */
export function createEmptyCharacter({ systemId = 't20' } = {}) {
  const ruleset = getRuleset(systemId)
  if (!ruleset) {
    throw new Error(`Ruleset "${systemId}" não encontrado no registry.`)
  }

  const schema = ruleset.schema ?? ruleset
  if (!schema?.id) {
    throw new Error(`Ruleset "${systemId}" inválido: schema não encontrado.`)
  }

  const defaultAttr = schema.defaults?.attributeBase ?? 0

  const attributeKeys = (schema.attributes ?? []).map(a => a.key)
  const skillKeys = (schema.skills ?? []).map(s => s.key)

  const equipmentSlots = schema.equipmentModel?.slots
    ? Object.keys(schema.equipmentModel.slots)
    : []

  const derivedStatKeys = (schema.stats ?? []).map(s => s.key)

  return {
    id: uid(),
    systemId: schema.id,

    meta: {
      name: '',
      player: '',
      notes: '',
      description: ''
    },

    progression: {
      level: 1,
      experience: 0,

      classId: null,
      classes: [],

      deityId: null,
      raceId: null,
      originId: null,

      picksByLevel: {},

      size: 'medium'
    },

    sheet: {
      attributes: {
        creation: {
          method: schema.defaults?.attributeMethod ?? 'manual',
          base: arrayToMap(attributeKeys, defaultAttr),
          notes: ''
        },
        advancement: {
          increases: arrayToMap(attributeKeys, 0),
          byLevel: {}
        },
        misc: arrayToMap(attributeKeys, 0),
        temp: arrayToMap(attributeKeys, 0)
      },

      training: {
        skills: arrayToMap(skillKeys, false)
      },

      equipment: arrayToMap(equipmentSlots, null),

      resources: {
        hp: { current: 0, temp: 0 },
        mp: { current: 0, temp: 0 }
      },

      attacks: [],

      spellcasting: {
        keyAttribute: null,
        spells: []
      },

      bonuses: {
        defense: { misc: 0 },
        skills: {}
      },

      derived: arrayToMap(derivedStatKeys, null)
    },

    proficiencies: {
      weapons: [],
      armors: [],
      shields: [],
      tools: [],
      misc: []
    },

    inventory: {
      money: { ts: 0 },
      items: []
    },

    build: {
      grantedFeatureIds: {
        race: [],
        origin: [],
        classes: [],
        general: [],
        items: [],
        misc: []
      },
      choices: {}
    }
  }
}