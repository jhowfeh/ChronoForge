// src/rulesets/t20/engine.js
import { resolveModifiers } from '@/core/engine/compute/computeDerivedBase'

/**
 * ============================================================
 * Helpers: Character access / compat
 * ============================================================
 */

/**
 * Retorna o nível do personagem, suportando múltiplos formatos
 * (compat com versões antigas de storage/estrutura).
 *
 * @param {object} character
 * @returns {number} level (>= 1)
 */
function getLevel(character) {
  return (
    Number(character?.progression?.level) ||
    Number(character?.basics?.level) ||
    Number(character?.level) ||
    Number(character?.sheet?.basics?.level) ||
    Number(character?.sheet?.progression?.level) ||
    Number(character?.sheet?.level) ||
    1
  )
}

/**
 * Lê o bloco de treinamento de uma perícia em formatos suportados.
 *
 * Formatos suportados:
 * 1) character.training.skills[skillKey] = { trained: true, misc: 0, attr?: 'dex' }
 * 2) character.training.skills[skillKey] = true
 * 3) character.sheet.training.skills[skillKey] boolean ou objeto
 *
 * @param {object} character
 * @param {string} skillKey
 * @returns {{trained:boolean,misc:number,attr:(string|null)}|null}
 */
function getTrainingEntry(character, skillKey) {
  const old = character?.training?.skills?.[skillKey]
  if (old != null) {
    if (typeof old === 'boolean') return { trained: old, misc: 0, attr: null }
    if (typeof old === 'object') {
      return { trained: !!old.trained, misc: Number(old.misc || 0), attr: old.attr || null }
    }
  }

  const newer = character?.sheet?.training?.skills?.[skillKey]
  if (newer != null) {
    if (typeof newer === 'boolean') return { trained: newer, misc: 0, attr: null }
    if (typeof newer === 'object') {
      return { trained: !!newer.trained, misc: Number(newer.misc || 0), attr: newer.attr || null }
    }
  }

  return null
}

/**
 * Verifica se a perícia está treinada (considerando compat).
 *
 * @param {object} character
 * @param {string} skillKey
 * @returns {boolean}
 */
function isSkillTrained(character, skillKey) {
  const entry = getTrainingEntry(character, skillKey)
  return !!entry?.trained
}

/**
 * Retorna o misc da perícia (considerando compat).
 *
 * @param {object} character
 * @param {string} skillKey
 * @returns {number}
 */
function getSkillMisc(character, skillKey) {
  const entry = getTrainingEntry(character, skillKey)
  return Number(entry?.misc || 0)
}

/**
 * Retorna override de atributo da perícia (considerando compat).
 * Ex.: Ofício pode usar Wis em vez de Int, etc.
 *
 * @param {object} character
 * @param {string} skillKey
 * @returns {string|null} attrKey (ex: 'dex') ou null
 */
function getSkillAttrOverride(character, skillKey) {
  const entry = getTrainingEntry(character, skillKey)
  return entry?.attr || null
}

/**
 * Retorna o modelo de equipamento do personagem, suportando formatos compat.
 *
 * @param {object} character
 * @returns {object} equipment
 */
function getEquipment(character) {
  return character?.sheet?.equipment || character?.equipment || {}
}

/**
 * Extrai o `classId` em formatos suportados.
 * (o modelo “novo” recomendado é character.progression.classId)
 *
 * @param {object} character
 * @returns {string|null}
 */
function getClassId(character) {
  return (
    character?.progression?.classId ||
    character?.basics?.classId ||
    character?.basics?.class ||
    character?.classId ||
    character?.sheet?.basics?.classId ||
    character?.sheet?.basics?.class ||
    null
  )
}

/**
 * Lê picksByLevel do modelo novo (se existir).
 *
 * @param {object} character
 * @returns {Record<string, any>}
 */
function getPicksByLevel(character) {
  return character?.progression?.picksByLevel || {}
}

/**
 * ============================================================
 * Context builder (padroniza ctx para rules do schema)
 * ============================================================
 *
 * O t20Schema.rules (patchado) usa `getAttr(ctx, attrKey)` para ler atributos
 * do novo modelo:
 * - sheet.attributes.creation.base
 * - sheet.attributes.advancement.increases
 * - sheet.attributes.misc
 * - sheet.attributes.temp
 *
 * Este builder garante que ctx sempre tenha:
 * - schema, level, sheet, training, equipment, bonuses, mods
 *
 * @param {object} params
 * @param {object} params.schema
 * @param {object} params.character
 * @param {object} params.mods
 * @param {string[]} [params.trainedSkills] - treino efetivo (manual + classe)
 * @returns {object} ctx
 */
function buildCtx({ schema, character, mods, trainedSkills = [] }) {
  const level = getLevel(character)
  const sheet = character?.sheet || {}
  const training = sheet.training || character?.training || { skills: {} }
  const equipment = getEquipment(character)

  // Bônus misc no seu modelo: sheet.bonuses
  const bonuses = sheet.bonuses || character?.bonuses || { defense: { misc: 0 }, skills: {} }

  return {
    schema,
    level,

    // dados canônicos
    sheet,
    training,
    equipment,
    bonuses,

    // treino efetivo (patch): manual OR classe
    trainedSkills,

    // mods resolvidos por features/itens/condições (resolveModifiers)
    mods: mods || null,

    /**
     * Compat legado para qualquer trecho antigo que ainda acesse:
     * - ctx.attributes.dex
     * - ctx.attributes.base.dex
     *
     * Observação: o schema.rules.getAttr(ctx,key) é a fonte de verdade.
     */
    attributes: {
      base:
        sheet?.attributes?.creation?.base ||
        sheet?.attributes?.base ||
        character?.attributes?.base ||
        {},
      ...(
        sheet?.attributes?.creation?.base ||
        sheet?.attributes?.base ||
        character?.attributes?.base ||
        {}
      )
    }
  }
}

/**
 * ============================================================
 * Class progression resolver (Data-driven)
 * ============================================================
 */

/**
 * Resolve progressão de classe até o nível atual, retornando:
 * - features concedidas automaticamente por nível (grants)
 * - features escolhidas por nível (picksByLevel)
 * - perícias treinadas vindas da classe (fixas + escolhas)
 * - escolhas pendentes (p/ UI)
 * - debug por nível (p/ UI)
 *
 * @param {object} params
 * @param {object} params.schema
 * @param {object} params.character
 * @param {object} params.classDef
 * @param {Map<string, object>} params.featureIndex
 * @returns {object}
 */
export function resolveClassProgression({ schema, character, classDef, featureIndex }) {
  const level = getLevel(character)
  const picksByLevel = getPicksByLevel(character)

  const activeFeatureIds = new Set()
  const trainedSkills = new Set(classDef?.trainedSkills?.fixed || [])
  const pendingChoices = []
  const debugByLevel = {}

  const normalizePick = (pick) => {
    if (pick == null) return []
    if (Array.isArray(pick)) return pick.filter(Boolean)
    return [pick].filter(Boolean)
  }

  // Heurística: pool de perícias
  const isSkillPool = (poolName) => poolName === 'arcanist_class_skills'

  const prog = Array.isArray(classDef?.progression) ? classDef.progression : []

  for (let lv = 1; lv <= level; lv++) {
    const step = prog.find(p => Number(p.level) === lv)
    if (!step) continue

    const grants = (step.grants || []).filter(Boolean)
    for (const fid of grants) activeFeatureIds.add(fid)

    const choices = Array.isArray(step.choices) ? step.choices : []
    const picksForLevel = picksByLevel?.[lv] || {}

    debugByLevel[lv] = { grants: [...grants], picks: {}, pending: [] }

    for (const ch of choices) {
      const slotKey = ch.key
      const poolName = ch.pool
      const count = Number(ch.count || 1)

      const pickRaw = picksForLevel?.[slotKey]
      const picks = normalizePick(pickRaw)

      debugByLevel[lv].picks[slotKey] = picks

      // aplica picks
      if (isSkillPool(poolName)) {
        for (const sk of picks) trainedSkills.add(sk)
      } else {
        for (const fid of picks) activeFeatureIds.add(fid)
      }

      // pendências (para UI)
      const missing = Math.max(0, count - picks.length)
      if (missing > 0) {
        const poolOptions = (classDef?.pools?.[poolName] || []).slice()

        pendingChoices.push({
          level: lv,
          slotKey,
          pool: poolName,
          missing,
          options: poolOptions,
          optionFeatures: isSkillPool(poolName)
            ? null
            : poolOptions.map(id => featureIndex?.get(id) || null).filter(Boolean)
        })

        debugByLevel[lv].pending.push({ slotKey, pool: poolName, missing })
      }
    }
  }

  return {
    level,
    activeFeatureIds: Array.from(activeFeatureIds),
    trainedSkills: Array.from(trainedSkills),
    pendingChoices,
    debugByLevel
  }
}

/**
 * ============================================================
 * Public API: T20 engine (derived)
 * ============================================================
 */

export const t20Engine = {
  /**
   * Calcula os valores derivados do personagem.
   *
   * Patch aplicado:
   * - Atributos finais agora consideram:
   *   creation + advancement + misc + temp + mods.attributes
   *   via schema.rules.getAttr(ctx, attrKey)
   *
   * - Defesa/perícias usam ctx padronizado, reduzindo divergências
   *   entre "ctx.attributes.base" e "ctx.attributes.dex".
   *
   * @param {object} params
   * @param {object} params.schema schema do ruleset (t20Schema)
   * @param {object} params.character personagem
   * @param {object} params.catalog catálogo do ruleset (buildT20Catalog())
   * @returns {object} derived
   */
  computeDerived({ schema, character, catalog }) {
    const featureIndex = catalog?.featureIndex
    const level = getLevel(character)
    const halfLevel = schema.rules.halfLevel(level)
    const equipment = getEquipment(character)

    // =========================
    // Classe / Progressão
    // =========================
    const classId = getClassId(character)
    const classDef = classId ? catalog?.getClass?.(classId) : null

    const classProg = classDef
      ? resolveClassProgression({ schema, character, classDef, featureIndex })
      : {
          level,
          activeFeatureIds: [],
          trainedSkills: [],
          pendingChoices: [],
          debugByLevel: {}
        }

    const classTrainedSet = new Set(classProg.trainedSkills || [])

    // =========================
    // MODS via Features
    // - injeta features vindas de progressão de classe
    // =========================
    const { mods, activeFeatureIds } = resolveModifiers({
      schema,
      character,
      catalog,
      featureIndex,
      extraFeatureIds: classProg.activeFeatureIds
    })

    // =========================
    // Treino efetivo (patch)
    // =========================
    const effectiveTrainedSkills = []
    const skillsDef = Array.isArray(catalog?.skills) ? catalog.skills : []
    for (const s of skillsDef || []) {
      if (isSkillTrained(character, s.key) || classTrainedSet.has(s.key)) {
        effectiveTrainedSkills.push(s.key)
      }
    }

    // =========================
    // ctx padronizado (fonte para rules.getAttr/defense/skills breakdown)
    // =========================
    const ctx = buildCtx({
      schema,
      character,
      mods,
      trainedSkills: effectiveTrainedSkills
    })

    // =========================
    // ATTR FINAL
    // - Usa o novo modelo via schema.rules.getAttr(ctx, key)
    // - Soma mods.attributes (features/itens/etc.)
    // =========================
    const attrFinal = {}
    for (const a of schema.attributes || []) {
      const base = schema.rules.getAttr ? schema.rules.getAttr(ctx, a.key) : 0
      const total = Number(base || 0) + Number(mods?.attributes?.[a.key] || 0)
      attrFinal[a.key] = total
    }

    // =========================
    // HP/MP base por classe (quando houver)
    // =========================
    let hpBase = null
    let mpBase = null

    if (classDef?.hitPoints) {
      // PV: base + (perLevel*(level-1)) + Con*level (se addConEachLevel)
      const con = Number(attrFinal.con || 0)
      const base = Number(classDef.hitPoints.base || 0)
      const per = Number(classDef.hitPoints.perLevel || 0)
      const addCon = classDef.hitPoints.addConEachLevel !== false // default true
      hpBase = base + per * Math.max(0, level - 1) + (addCon ? con * level : con)
    }

    if (classDef?.manaPoints) {
      const per = Number(classDef.manaPoints.perLevel || 0)

      // atributo-chave depende do Caminho (por enquanto, inferimos por feature escolhida)
      // path_mago -> int, path_bruxo -> int, path_feiticeiro -> cha
      const has = (id) => (classProg.activeFeatureIds || []).includes(id)
      let keyAttr = null
      if (has('path_feiticeiro')) keyAttr = 'cha'
      else if (has('path_mago') || has('path_bruxo')) keyAttr = 'int'

      const keyBonus = keyAttr ? Number(attrFinal[keyAttr] || 0) : 0
      const addKey = classDef.manaPoints.addKeyAttrToTotal === true

      mpBase = per * level + (addKey ? keyBonus : 0)
    }

    // =========================
    // SKILLS
    // - agora centraliza regra em schema.rules.skillTotal quando possível
    // - mantém “misc manual” e “override de atributo” via training entry
    // - soma mods.skills
    // =========================
    const skills = {}
    const armorPenaltyValue = equipment?.armor?.skillPenalty ?? 0
    
    for (const s of skillsDef || []) {
      const trained = effectiveTrainedSkills.includes(s.key)
      const miscManual = getSkillMisc(character, s.key)

      // trainedOnly e não treinada => null
      if (s.trainedOnly && !trained) {
        skills[s.key] = null
        continue
      }

      const attrKey = getSkillAttrOverride(character, s.key) || s.baseAttr

      // Nota: aqui usamos attrFinal (já inclui mods.attributes),
      // pois perícia no T20 soma atributo "final" (incluindo bônus permanentes/traits).
      const attrBonus = schema.rules.attributeBonus(attrFinal[attrKey] ?? 0)

      const training = trained ? schema.rules.trainingBonusByLevel(level) : 0
      const armorPenalty = s.armorPenalty ? Number(armorPenaltyValue || 0) : 0

      const miscMods = Number(mods?.skills?.[s.key] || 0)

      skills[s.key] = halfLevel + attrBonus + training + miscManual + miscMods - armorPenalty
    }

    // =========================
    // “SAVES” como alias (opcional)
    // =========================
    const saves = {}
    const saveKeys = schema.skillGroups?.saves || ['fortitude', 'reflexes', 'will']
    for (const k of saveKeys) saves[k] = skills[k] ?? null

    // =========================
    // DEFESA / CARGA
    // - usa ctx padronizado + attrFinal (para garantir dex correto)
    // =========================
    const defense = schema.rules.defenseTotal({
      schema,
      level,

      // compat: algumas regras antigas leem attributes.dex
      // aqui garantimos que attributes exista e seja "final"
      attributes: attrFinal,

      equipment,

      // misc de defesa vindo de mods.stats.defense (como você já fazia)
      bonuses: { defense: { misc: mods?.stats?.defense || 0 } },

      // também passamos sheet/training pra getAttr funcionar caso a regra use
      sheet: character?.sheet || {}
    })

    const carry_capacity =
      schema.rules.carryCapacity(attrFinal.str) + (mods?.stats?.carry_capacity || 0)

    // HP/MP finais = base (se houver) + mods
    const hpFinal = (hpBase ?? 0) + (mods?.stats?.hp_max || 0)
    const mpFinal = (mpBase ?? 0) + (mods?.stats?.mp_max || 0)

    return {
      attrFinal,
      halfLevel,
      level,
      skills,
      saves,
      stats: {
        defense,
        carry_capacity,
        hp_max: hpFinal,
        mp_max: mpFinal,
        speed: (mods?.stats?.speed || 0),
        armor_penalty:
          schema.rules.armorPenalty({ equipment }) + (mods?.stats?.armor_penalty || 0)
      },
      modifiers: mods,

      // features do core (raça/origem/divindade/gerais/itens/misc + classe injetada)
      activeFeatureIds,

      // extra: útil pra UI mostrar “por nível” e pendências
      classProgression: classProg
    }
  }
}