import { t20Schema } from './t20/schema'
import { t20Engine } from './t20/engine'
import { buildT20Catalog } from './t20/catalog'

const rulesets = {
  t20: {
    id: 't20',
    label: 'Tormenta 20',
    schema: t20Schema,
    engine: t20Engine,
    buildCatalog: buildT20Catalog
  }
}

export function getRuleset(systemId) {
  const rs = rulesets[systemId]
  if (!rs) throw new Error(`Ruleset not found: ${systemId}`)
  return rs
}

export function listRulesets() {
  return Object.values(rulesets)
}
