export function createEmptyModifiers(schema) {
  if (!schema) throw new Error('createEmptyModifiers: schema está undefined/null')

  const attributesArr = Array.isArray(schema.attributes) ? schema.attributes : []
  const skillsArr = Array.isArray(schema.skills) ? schema.skills : []
  const statsArr = Array.isArray(schema.stats) ? schema.stats : []

  const attributes = Object.fromEntries(attributesArr.map(a => [a.key, 0]))
  const skills = Object.fromEntries(skillsArr.map(s => [s.key, 0]))
  const stats = Object.fromEntries(statsArr.map(s => [s.key, 0]))

  // ✅ compat: saves pode existir (outros sistemas) OU ser grupo no T20 JdA
  const savesArr = Array.isArray(schema.saves)
    ? schema.saves
    : (schema.skillGroups?.saves || []).map(key => ({ key }))

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

export function applyFeatureEffects({ schema, feature, choices, mods }) {
  for (const eff of feature.effects || []) {
    switch (eff.type) {
      case 'ATTR_MOD': {
        const v = eff.values || {}
        if (v.$choice) {
          const picked = choices?.[v.$choice] || []
          const amt = Number(eff.meta?.amountEach ?? 1)
          for (const k of picked) mods.attributes[k] = (mods.attributes[k] || 0) + amt
        } else {
          for (const [k, n] of Object.entries(v)) mods.attributes[k] = (mods.attributes[k] || 0) + Number(n || 0)
        }
        break
      }

      case 'SKILL_MOD': {
        const v = eff.values || {}
        if (v.$choice) {
          const picked = choices?.[v.$choice] || []
          for (const sk of picked) mods.skills[sk] = (mods.skills[sk] || 0) + Number(v.amount || 0)
        } else if (v.skill) {
          mods.skills[v.skill] = (mods.skills[v.skill] || 0) + Number(v.amount || 0)
        }
        break
      }

      // ✅ compat: SAVE_MOD continua existindo, mas em T20 JdA também cai em skills
      case 'SAVE_MOD': {
        const v = eff.values || {}
        const amt = Number(v.amount || 0)

        // 1) caso “um save específico”
        if (v.save) {
          mods.saves[v.save] = (mods.saves[v.save] || 0) + amt

          // se saves são skills (T20 JdA), aplica também na skill equivalente
          if (mods.skills && (v.save in mods.skills)) {
            mods.skills[v.save] = (mods.skills[v.save] || 0) + amt
          }
        }

        // 2) caso “grupo de resistências”
        if (v.group === 'saves') {
          const keys = schema?.skillGroups?.saves || ['fortitude', 'reflexes', 'will']
          for (const k of keys) {
            if (mods.saves && (k in mods.saves)) mods.saves[k] = (mods.saves[k] || 0) + amt
            if (mods.skills && (k in mods.skills)) mods.skills[k] = (mods.skills[k] || 0) + amt
          }
        }

        break
      }

      case 'STAT_MOD': {
        const v = eff.values || {}
        if (v.stat) mods.stats[v.stat] = (mods.stats[v.stat] || 0) + Number(v.amount || 0)
        break
      }

      case 'PROFICIENCY_GRANT': {
        const v = eff.values || {}
        if (v.category && v.value && mods.proficiencies[v.category]) mods.proficiencies[v.category].push(v.value)
        break
      }

      case 'FEATURE_GRANT': {
        const v = eff.values || {}
        if (v.$choice) {
          const picked = choices?.[v.$choice] || []
          mods.grants.featureIds.push(...picked)
        } else if (v.featureId) {
          mods.grants.featureIds.push(v.featureId)
        }
        break
      }

      default:
        break
    }
  }
}

