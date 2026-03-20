// src/core/engine/applyEffects.js

/**
 * ============================================================
 *  MODIFIERS SHAPE (core)
 *  - O core conhece um "shape" mínimo: attributes, skills, saves, stats...
 *  - Sistemas podem customizar via schema (ex: skillGroups.saves)
 *  - Regras específicas (ex: saves também contam como skills) NÃO ficam aqui.
 * ============================================================
 */
export function createEmptyModifiers(schema, catalog) {
  if (!schema) throw new Error('createEmptyModifiers: schema está undefined/null')

  const attributesArr = Array.isArray(schema.attributes) ? schema.attributes : []

  // 👇 skills agora podem vir do catalog (preferência) ou do schema (compat)
  const skillsArr =
    Array.isArray(catalog?.skills) ? catalog.skills :
    Array.isArray(schema.skills) ? schema.skills :
    []

  const statsArr = Array.isArray(schema.stats) ? schema.stats : []

  const attributes = Object.fromEntries(attributesArr.map(a => [a.key, 0]))
  const skills = Object.fromEntries(skillsArr.map(s => [s.key, 0]))
  const stats = Object.fromEntries(statsArr.map(s => [s.key, 0]))

  const savesArr = Array.isArray(schema.saves)
    ? schema.saves
    : (Array.isArray(schema.skillGroups?.saves) ? schema.skillGroups.saves.map(key => ({ key })) : [])

  const saves = Object.fromEntries(savesArr.map(s => [s.key, 0]))

  return {
    attributes,
    skills,
    saves,
    stats,
    proficiencies: { weapons: [], armors: [], shields: [], tools: [], misc: [] },
    grants: { featureIds: [] }
  }
}

/**
 * ============================================================
 *  EFFECT HANDLERS (core)
 *  - Cada effect.type é tratado por um handler.
 *  - Rulesets podem sobrescrever handlers específicos.
 * ============================================================
 */

export function createDefaultEffectHandlers() {
  return {
    ATTR_MOD: ({ eff, choices, mods }) => {
      const v = eff.values || {}
      if (v.$choice) {
        const picked = choices?.[v.$choice] || []
        const amt = Number(eff.meta?.amountEach ?? 1)
        for (const k of picked) mods.attributes[k] = (mods.attributes[k] || 0) + amt
      } else {
        for (const [k, n] of Object.entries(v)) {
          mods.attributes[k] = (mods.attributes[k] || 0) + Number(n || 0)
        }
      }
    },

    SKILL_MOD: ({ eff, choices, mods }) => {
      const v = eff.values || {}
      if (v.$choice) {
        const picked = choices?.[v.$choice] || []
        const amt = Number(v.amount || 0)
        for (const sk of picked) mods.skills[sk] = (mods.skills[sk] || 0) + amt
      } else if (v.skill) {
        mods.skills[v.skill] = (mods.skills[v.skill] || 0) + Number(v.amount || 0)
      }
    },

    /**
     * SAVE_MOD (core)
     * - Aplica em mods.saves quando existirem keys.
     * - Se v.group === 'saves', usa schema.skillGroups.saves (se existir).
     * - NÃO espelha para skills (isso é regra do ruleset, se quiser).
     */
    SAVE_MOD: ({ schema, eff, mods }) => {
      const v = eff.values || {}
      const amt = Number(v.amount || 0)

      // save específico
      if (v.save) {
        if (mods.saves && (v.save in mods.saves)) {
          mods.saves[v.save] = (mods.saves[v.save] || 0) + amt
        }
      }

      // grupo de saves
      if (v.group === 'saves') {
        const keys = Array.isArray(schema?.skillGroups?.saves) ? schema.skillGroups.saves : []
        for (const k of keys) {
          if (mods.saves && (k in mods.saves)) {
            mods.saves[k] = (mods.saves[k] || 0) + amt
          }
        }
      }
    },

    STAT_MOD: ({ eff, mods }) => {
      const v = eff.values || {}
      if (v.stat) mods.stats[v.stat] = (mods.stats[v.stat] || 0) + Number(v.amount || 0)
    },

    PROFICIENCY_GRANT: ({ eff, mods }) => {
      const v = eff.values || {}
      if (v.category && v.value && mods.proficiencies[v.category]) {
        mods.proficiencies[v.category].push(v.value)
      }
    },

    FEATURE_GRANT: ({ eff, choices, mods }) => {
      const v = eff.values || {}
      if (v.$choice) {
        const picked = choices?.[v.$choice] || []
        mods.grants.featureIds.push(...picked)
      } else if (v.featureId) {
        mods.grants.featureIds.push(v.featureId)
      }
    }
  }
}

/**
 * Merge simples: overrides ganham do base.
 */
export function mergeEffectHandlers(base, overrides) {
  return { ...(base || {}), ...(overrides || {}) }
}

/**
 * Aplica effects usando handlers.
 * - Se não passar handlers, usa default (core).
 */
export function applyFeatureEffects({ schema, feature, choices, mods, handlers }) {
  const h = handlers || createDefaultEffectHandlers()

  for (const eff of feature.effects || []) {
    const fn = h[eff.type]
    if (typeof fn === 'function') {
      fn({ schema, feature, eff, choices, mods, handlers: h })
    }
    // desconhecido: ignora (compat)
  }
}