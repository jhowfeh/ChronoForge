// src/core/engine/compute/computeDerivedBase.js

import { createEmptyModifiers, applyFeatureEffects } from '../applyEffects'

/**
 * Retorna a lista de featureIds “ativas” a partir do modelo antigo (character.build)
 * + featureIds extras (ex.: vindas de progressão de classe).
 *
 * @param {object} character
 * @param {string[]} [extraFeatureIds=[]] featureIds adicionais para compor o stack inicial
 * @returns {string[]} featureIds ativos (iniciais) para o resolvedor processar
 */
export function getActiveFeatureIds(character, extraFeatureIds = []) {
  const g = character?.build?.grantedFeatureIds || {}
  return [
    ...(g.race || []),
    ...(g.origin || []),
    ...(g.classes || []),
    ...(g.general || []),
    ...(g.items || []),
    ...(g.misc || []),
    ...(extraFeatureIds || [])
  ]
}

/**
 * Resolve modificadores (mods) a partir de uma lista de features ativas.
 *
 * - Percorre as features (stack/DFS) aplicando effects em `mods`
 * - Suporta “feature que concede outras features” via `mods.grants.featureIds`
 * - Mantém compatibilidade com o modelo antigo:
 *   - choices default: character.build.choices
 *   - stack inicial default: character.build.grantedFeatureIds
 *
 * Extensões adicionadas (patch):
 * - `extraFeatureIds`: permite injetar features vindas de progressão (ex.: classe por nível)
 * - `choices`: permite sobrescrever/fornecer choices consolidados (ex.: choices por nível)
 *
 * @param {object} params
 * @param {object} params.schema schema do ruleset
 * @param {object} params.character personagem
 * @param {Map<string, object>} params.featureIndex Map(featureId -> feature)
 * @param {string[]} [params.extraFeatureIds] featureIds adicionais para o stack inicial
 * @param {object} [params.choices] choices consolidados (sobrescreve character.build.choices)
 *
 * @returns {{ mods: object, activeFeatureIds: string[] }}
 */
export function resolveModifiers({ schema, character, featureIndex, extraFeatureIds = [], choices = null }) {
  const resolvedChoices = choices ?? character?.build?.choices ?? {}
  const mods = createEmptyModifiers(schema)

  const visited = new Set()
  const stack = [...getActiveFeatureIds(character, extraFeatureIds)]

  while (stack.length) {
    const id = stack.pop()
    if (!id || visited.has(id)) continue
    visited.add(id)

    const feat = featureIndex?.get?.(id)
    if (!feat) continue

    // ✅ aplica efeitos da feature no acumulador de mods
    applyFeatureEffects({ schema, feature: feat, choices: resolvedChoices, mods })

    // ✅ processa “grants” emitidos por efeitos (feature concede outras)
    const grants = mods?.grants?.featureIds?.splice?.(0) || []
    for (const gid of grants) {
      if (gid && !visited.has(gid)) stack.push(gid)
    }
  }

  return { mods, activeFeatureIds: [...visited] }
}