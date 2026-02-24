// src/core/engine/derive.js

import { buildCtx } from './buildCtx'

/**
 * Calcula derivados padrão para a ficha.
 *
 * @param {object} params
 * @param {object} params.schema
 * @param {object} params.character
 * @param {object} [params.mods] - modificadores resolvidos pelo engine (opcional)
 * @returns {object} derived
 */
export function deriveCharacter({ schema, character, mods = null } = {}) {
  const ctx = buildCtx({ schema, character, mods })

  // Skills totals
  const skills = {}
  for (const s of schema.skills ?? []) {
    skills[s.key] = schema.rules.skillTotal(ctx, s.key)
  }

  // Defense totals
  const defense = schema.rules.defenseTotal(ctx)
  const defenseParts = schema.rules.defenseBreakdown(ctx)

  // Outros stats
  const hp_max = null
  const mp_max = null
  const speed = schema.rules?.getAttr ? schema.rules.getAttr(ctx, 'dex') : null // exemplo
  const carry_capacity = schema.rules.carryCapacity(schema.rules.getAttr(ctx, 'str'))
  const armor_penalty = schema.rules.armorPenalty(ctx)

  return {
    skills,
    defense,
    defenseParts,

    stats: {
      hp_max,
      mp_max,
      defense,
      speed,
      carry_capacity,
      armor_penalty
    }
  }
}