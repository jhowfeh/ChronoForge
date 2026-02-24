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
 * Cria o esqueleto padrão de um personagem para um ruleset.
 *
 * ✅ Compatível com:
 * - Modelo antigo (features): character.build.grantedFeatureIds + character.build.choices
 * - Modelo novo (classes por nível): character.progression.classId + picksByLevel
 *   (usado pelo resolveClassProgression + engine t20 patchado)
 *
 * Observações de design:
 * - “sheet.*” é um namespace para dados “do personagem” editáveis (atributos base, training, equipamento etc.)
 * - “build.*” continua existindo para manter compat com seu resolver de features (raça/origem/etc.)
 * - “progression.picksByLevel” guarda as escolhas por nível (histórico), sem precisar duplicar em training/featureIds.
 *
 * @param {object} [params]
 * @param {string} [params.systemId='t20'] - id do ruleset (ex.: 't20')
 * @returns {object} character
 */
export function createEmptyCharacter({ systemId = 't20' } = {}) {
  /**
   * ⚠️ IMPORTANTE:
   * Dependendo do seu registry, getRuleset(systemId) pode retornar:
   * - o schema direto, OU
   * - um objeto { schema, catalog, engine }
   *
   * Aqui tratamos os dois casos.
   */
  const ruleset = getRuleset(systemId)
  if (!ruleset) throw new Error(`Ruleset "${systemId}" não encontrado no registry.`)

  const schema = ruleset.schema ?? ruleset
  if (!schema?.id) throw new Error(`Ruleset "${systemId}" inválido: schema não encontrado.`)

  // Defaults do schema (T20 JdA: atributos como bônus direto, default costuma ser 0)
  const defaultAttr = schema.defaults?.attributeBase ?? 0

  const attributeKeys = (schema.attributes ?? []).map(a => a.key)
  const skillKeys = (schema.skills ?? []).map(s => s.key)

  const equipmentSlots = schema.equipmentModel?.slots
    ? Object.keys(schema.equipmentModel.slots)
    : []

  // (opcional) cache de stats derivados — pode remover se não usar
  const derivedStatKeys = (schema.stats ?? []).map(s => s.key)

  const characterId = uid()

  return {
    id: characterId,
    systemId: schema.id,

    /**
     * Meta “do app” (não necessariamente regras do sistema)
     */
    meta: {
      name: '',
      player: '',
      notes: '',
      description: ''
    },

    /**
     * Progressão / Identidade (modelo NOVO)
     *
     * - classId: classe principal selecionada (compat com engine patchado)
     * - picksByLevel: histórico de escolhas por nível (ex.: poder escolhido no 2º nível)
     *
     * Campos mantidos por compat:
     * - classes: array (se você quiser multiclass no futuro)
     */
    progression: {
      level: 1,
      experience: 0,

      // ✅ modelo novo: 1 classe principal (por enquanto)
      classId: null,

      // (futuro) multiclass / histórico de classes
      classes: [],

      // ids principais do personagem (header)
      deityId: null,
      raceId: null,
      originId: null,

      // escolha por nível (para “refletir na ficha o que foi escolhido por nível”)
      // ex: { 1: { arcanist_path: 'path_mago', class_skill_picks: ['knowledge','initiative'] }, ... }
      picksByLevel: {},

      size: 'medium'
    },

    /**
     * Dados “editáveis” da ficha (modelo canonical recomendado)
     */
    sheet: {
      attributes: {
        // ✅ o que a pessoa escolheu na criação
        creation: {
          method: schema.defaults?.attributeMethod ?? 'manual', // 'pointBuy'|'array'|'roll'|'manual'
          base: arrayToMap(attributeKeys, defaultAttr),         // valores escolhidos na criação
          notes: ''                                             // opcional
        },

        // ✅ aumentos permanentes ao longo dos níveis (poder de classe, etc.)
        advancement: {
          // soma “global” por atributo (fácil de calcular)
          increases: arrayToMap(attributeKeys, 0),

          // histórico por nível (opcional, mas MUITO útil)
          byLevel: {} // ex: { 2: { str: 1 }, 5: { dex: 1 } }
        },

        // ✅ bônus/penalidades fora do fluxo de feature (opcional)
        misc: arrayToMap(attributeKeys, 0),

        // ✅ temporários (buff/debuff)
        temp: arrayToMap(attributeKeys, 0),

        // (opcional) cache — você pode nem persistir isso se preferir
        // current: arrayToMap(attributeKeys, defaultAttr)
      },

      training: {
        /**
         * Treinamento por perícia.
         *
         * Você já suporta formatos legacy (boolean ou objeto) no engine.
         * Aqui começamos simples com boolean, mas você pode migrar
         * para objeto { trained, misc, attr } conforme necessário.
         */
        skills: arrayToMap(skillKeys, false)
      },

      equipment: arrayToMap(equipmentSlots, null),

      resources: {
        hp: { current: 0, temp: 0 },
        mp: { current: 0, temp: 0 }
      },

      attacks: [],

      // placeholder futuro (magias etc.)
      spellcasting: {
        keyAttribute: null,
        spells: []
      },

      // bônus misc (se você usar no UI; o engine atual usa mods.*)
      bonuses: {
        defense: { misc: 0 },
        skills: {}
      },

      // cache opcional
      derived: arrayToMap(derivedStatKeys, null)
    },

    /**
     * Proficiências genéricas (você pode passar a preencher por classe/feature depois)
     */
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

    /**
     * Modelo ANTIGO de build (mantido para compat com:
     * - resolveModifiers() que lê character.build.grantedFeatureIds e character.build.choices
     *
     * Patch aplicado:
     * - mantém intacto, porque o engine patchado injeta features de classe via extraFeatureIds.
     */
    build: {
      grantedFeatureIds: {
        race: [],
        origin: [],
        classes: [],
        general: [],
        items: [],
        misc: []
      },

      /**
       * choices consolidados (por featureId, slotKey etc.)
       * - você pode continuar usando isso para choices de feats e,
       *   no futuro, também salvar choices de poderes escolhidos por nível.
       */
      choices: {}
    }
  }
}