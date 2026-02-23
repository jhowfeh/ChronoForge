export const FeatureKind = Object.freeze({
  GENERAL_COMBAT: 'GENERAL_COMBAT',
  GENERAL_FATE: 'GENERAL_FATE',
  GENERAL_MAGIC: 'GENERAL_MAGIC',
  ORIGIN_POWER: 'ORIGIN_POWER',
  RACIAL_TRAIT: 'RACIAL_TRAIT',
  CLASS_FEATURE: 'CLASS_FEATURE'
})

/**
 * Normaliza um objeto de feature.
 * Mantém compatibilidade com seus arquivos existentes (general.*).
 */
export function makeFeature(feature) {
  return {
    choiceRules: [],
    effects: [],
    prerequisites: [],
    group: 'misc',
    source: { type: 'unknown' },
    ...feature
  }
}
