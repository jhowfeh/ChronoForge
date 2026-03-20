// src/rulesets/t20/engine/effects.js

import { createDefaultEffectHandlers, mergeEffectHandlers } from '@/core/engine/applyEffects'

/**
 * T20: saves são "perícias tipo resistência" (fortitude/reflexes/will) dentro de skills.
 * Logo, qualquer SAVE_MOD deve também afetar mods.skills quando a key existir lá.
 */
export function createT20EffectHandlers() {
  const base = createDefaultEffectHandlers()

  const overrides = {
    SAVE_MOD: (ctx) => {
      const { schema, eff, mods } = ctx

      // 1) aplica comportamento padrão do core (só em mods.saves)
      base.SAVE_MOD(ctx)

      // 2) T20 bridge: espelha em skills quando fizer sentido
      const v = eff.values || {}
      const amt = Number(v.amount || 0)

      // flag opcional (se quiser controlar)
      const savesAsSkills = schema?.flags?.savesAsSkills ?? true
      if (!savesAsSkills) return

      // save específico
      if (v.save && mods.skills && (v.save in mods.skills)) {
        mods.skills[v.save] = (mods.skills[v.save] || 0) + amt
      }

      // grupo de saves
      if (v.group === 'saves') {
        const keys = Array.isArray(schema?.skillGroups?.saves) ? schema.skillGroups.saves : []
        for (const k of keys) {
          if (mods.skills && (k in mods.skills)) {
            mods.skills[k] = (mods.skills[k] || 0) + amt
          }
        }
      }
    }
  }

  return mergeEffectHandlers(base, overrides)
}