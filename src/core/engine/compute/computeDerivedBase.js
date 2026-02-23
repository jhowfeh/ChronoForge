import { createEmptyModifiers, applyFeatureEffects } from '../applyEffects'

export function getActiveFeatureIds(character) {
  const g = character.build?.grantedFeatureIds || {}
  return [
    ...(g.race || []),
    ...(g.origin || []),
    ...(g.classes || []),
    ...(g.general || []),
    ...(g.items || []),
    ...(g.misc || [])
  ]
}

export function resolveModifiers({ schema, character, featureIndex }) {
  const choices = character.build?.choices || {}
  const mods = createEmptyModifiers(schema)

  const visited = new Set()
  const stack = [...getActiveFeatureIds(character)]

  while (stack.length) {
    const id = stack.pop()
    if (!id || visited.has(id)) continue
    visited.add(id)

    const feat = featureIndex.get(id)
    if (!feat) continue

    // ✅ passa schema para efeitos
    applyFeatureEffects({ schema, feature: feat, choices, mods })

    const grants = mods.grants.featureIds.splice(0)
    for (const gid of grants) {
      if (!visited.has(gid)) stack.push(gid)
    }
  }

  return { mods, activeFeatureIds: [...visited] }
}
