
const rulesets = {
  t20jda: {
    id: 't20jda',
    label: 'Tormenta 20 Jogo do Ano',
    image: 't20jda.png',
    loadSchema: () => import('./t20jda/schema.js'),
  },
  det3Alpha: {
    id: 'det3Alpha',
    label:'Defensores de Tóquio 3Ed. Alpha',
    image: 'det3alpha.png',
    schema: null,
  },
  detVictory: {
    id: 'detVictory',
    label: 'Defensores de Tóquio 3Ed. Victory',
    image: 'det3victory.png',
    schema: null,
  },
  dh: {
    id: 'dh',
    label: 'Daggerheart',
    image: 'daggerheart.png',
    schema: null,
  },
  fu: {
    id: 'fu',
    label: 'Fabula Ultima',
    image: 'fu.png',
    schema: null,
  },
  phantyr: {
    id: 'phantyr',
    label: 'Phantyr',
    image: 'phantyr.png',
    schema: null,
  },
  coc8: {
    id: 'coc8',
    label: 'Chamado de Cthulhu 8Ed',
    image: 'coc8.png',
    schema: null,
  },
}

export function getRuleset(systemId) {
  const rs = rulesets[systemId]
  if (!rs) throw new Error(`Ruleset not found: ${systemId}`)
  return rs
}

export function listRulesets() {
  return Object.values(rulesets)
}
