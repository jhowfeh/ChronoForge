import { resolveModifiers } from '@/core/engine/compute/computeDerivedBase'

function getSkillDef(schema, key) {
  return schema.skills?.find(s => s.key === key) || null
}

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

function isSkillTrained(character, skillKey) {
  // formatos suportados:
  // 1) training.skills[skillKey] = { trained: true, misc: 0, attr?: 'dex' }
  // 2) training.skills[skillKey] = true
  // 3) sheet.training.skills[skillKey] boolean ou objeto
  const old = character.training?.skills?.[skillKey]
  if (old && typeof old === 'object') return !!old.trained
  if (typeof old === 'boolean') return old

  const newer = character.sheet?.training?.skills?.[skillKey]
  if (typeof newer === 'boolean') return newer
  if (newer && typeof newer === 'object') return !!newer.trained

  return false
}

function getSkillMisc(character, skillKey) {
  const old = character.training?.skills?.[skillKey]
  if (old && typeof old === 'object') return Number(old.misc || 0)

  const newer = character.sheet?.training?.skills?.[skillKey]
  if (newer && typeof newer === 'object') return Number(newer.misc || 0)

  return 0
}

function getSkillAttrOverride(character, skillKey) {
  // permite override de atributo por perícia (multi-sistema / UI)
  const old = character.training?.skills?.[skillKey]
  if (old && typeof old === 'object' && old.attr) return old.attr

  const newer = character.sheet?.training?.skills?.[skillKey]
  if (newer && typeof newer === 'object' && newer.attr) return newer.attr

  return null
}

function getEquipment(character) {
  return character.sheet?.equipment || character.equipment || {}
}

export const t20Engine = {
  computeDerived({ schema, character, featureIndex }) {
    const { mods, activeFeatureIds } = resolveModifiers({ schema, character, featureIndex })

    const level = getLevel(character)
    const halfLevel = schema.rules.halfLevel(level)

    const equipment = getEquipment(character)

    // =========================
    // ATTR FINAL (JdA: atributo é bônus direto)
    // =========================
    const attrFinal = {}
    for (const a of schema.attributes || []) {
      const base =
        character.attributes?.base?.[a.key] ??
        character.sheet?.attributes?.base?.[a.key] ??
        0

      const total = Number(base || 0) + (mods.attributes?.[a.key] || 0)
      attrFinal[a.key] = total
    }

    // =========================
    // SKILLS (inclui Fort/Ref/Will)
    // =========================
    const skills = {}

    const armorPenaltyValue = equipment?.armor?.skillPenalty ?? 0

    for (const s of schema.skills || []) {
      const trained = isSkillTrained(character, s.key)
      const misc = getSkillMisc(character, s.key)

      // Se a perícia é trainedOnly e não está treinada
      if (s.trainedOnly && !trained) {
        skills[s.key] = null
        continue
      }

      // ✅ suporte ao override de atributo por perícia (ex.: Ofício/int->wis, etc.)
      const attrKey = getSkillAttrOverride(character, s.key) || s.baseAttr

      const attrBonus = schema.rules.attributeBonus(attrFinal[attrKey] ?? 0)
      const training = trained ? schema.rules.trainingBonusByLevel(level) : 0

      const armorPenalty = s.armorPenalty ? Number(armorPenaltyValue || 0) : 0

      // mods.skills já é bônus vindo de efeitos (SKILL_MOD etc.)
      const effBonus = Number(mods.skills?.[s.key] || 0)

      skills[s.key] = halfLevel + attrBonus + training + misc + effBonus - armorPenalty
    }

    // =========================
    // “SAVES” como alias (opcional)
    // =========================
    const saves = {}
    const saveKeys = schema.skillGroups?.saves || ['fortitude', 'reflexes', 'will']
    for (const k of saveKeys) saves[k] = skills[k] ?? null

    // =========================
    // DEFESA / CARGA
    // =========================
    const defense = schema.rules.defenseTotal({
      schema,
      level,
      attributes: attrFinal,
      equipment,
      bonuses: { defense: { misc: mods.stats?.defense || 0 } }
    })

    const carry_capacity =
      schema.rules.carryCapacity(attrFinal.str) + (mods.stats?.carry_capacity || 0)

    return {
      attrFinal,
      halfLevel,
      level, // ✅ útil para debug/UI
      skills,
      saves,
      stats: {
        defense,
        carry_capacity,
        hp_max: (mods.stats?.hp_max || 0),
        mp_max: (mods.stats?.mp_max || 0),
        speed: (mods.stats?.speed || 0),
        armor_penalty: schema.rules.armorPenalty({ equipment }) + (mods.stats?.armor_penalty || 0)
      },
      modifiers: mods,
      activeFeatureIds
    }
  }
}
