
const rulesets = {
  t20: {
    id: 't20',
    label: 'Tormenta 20',
    schema: null,
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
