import { makeFeature, FeatureKind } from './feats/_schema'

export const divineFeatures = [
  // =========================
  // AHARADAK
  // =========================
  makeFeature({ id: 'divine.aharadak.afinidade_com_a_tormenta', name: 'Afinidade com a Tormenta', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'aharadak' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.aharadak.extase_da_loucura', name: 'Êxtase da Loucura', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'aharadak' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.aharadak.percepcao_temporal', name: 'Percepção Temporal', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'aharadak' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.aharadak.rejeicao_divina', name: 'Rejeição Divina', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'aharadak' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.aharadak.obrigacoes',
    name: 'Obrigações & Restrições — Aharadak',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'aharadak' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Início de cena de ação', text: 'Role 1d6. Se o resultado for ímpar, você fica fascinado na primeira rodada (mesmo que seja imune).' }
    ]
  },

  // =========================
  // ALLIHANNA
  // =========================
  makeFeature({ id: 'divine.allihanna.compreender_os_ermos', name: 'Compreender os Ermos', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'allihanna' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.allihanna.dedo_verde', name: 'Dedo Verde', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'allihanna' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.allihanna.descanso_natural', name: 'Descanso Natural', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'allihanna' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.allihanna.voz_da_natureza', name: 'Voz da Natureza', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'allihanna' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.allihanna.obrigacoes',
    name: 'Obrigações & Restrições — Allihanna',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'allihanna' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Metal proibido', text: 'Você não pode usar armaduras ou escudos feitos de metal (exceto materiais especiais não metálicos).' },
      { type: 'RULE_NOTE', title: 'Descanso', text: 'Você não recupera PV/PM ao descansar em comunidades maiores que uma aldeia.' }
    ]
  },

  // =========================
  // ARSENAL
  // =========================
  makeFeature({ id: 'divine.arsenal.conjurar_arma', name: 'Conjurar Arma', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'arsenal' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.arsenal.coragem_total', name: 'Coragem Total', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'arsenal' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.arsenal.fe_guerreira', name: 'Fé Guerreira', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'arsenal' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.arsenal.sangue_de_ferro', name: 'Sangue de Ferro', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'arsenal' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.arsenal.obrigacoes',
    name: 'Obrigações & Restrições — Arsenal',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'arsenal' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Proibição', text: 'Você é proibido de ser derrotado em qualquer combate ou disputa; derrota do grupo também viola as obrigações.' }
    ]
  },

  // =========================
  // AZGHER
  // =========================
  makeFeature({ id: 'divine.azgher.espada_solar', name: 'Espada Solar', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'azgher' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.azgher.fulgor_solar', name: 'Fulgor Solar', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'azgher' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.azgher.habitante_do_deserto', name: 'Habitante do Deserto', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'azgher' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.azgher.inimigo_de_tenebra', name: 'Inimigo de Tenebra', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'azgher' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.azgher.obrigacoes',
    name: 'Obrigações & Restrições — Azgher',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'azgher' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Rosto coberto', text: 'Você deve manter o rosto sempre coberto; pode revelar apenas ao sumo-sacerdote ou no funeral.' },
      { type: 'RULE_NOTE', title: 'Doação', text: 'Você deve doar 20% de qualquer tesouro obtido para a igreja de Azgher.' }
    ]
  },

  // =========================
  // HYNINN
  // =========================
  makeFeature({ id: 'divine.hyninn.apostar_com_o_trapaceiro', name: 'Apostar com o Trapaceiro', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'hyninn' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.hyninn.farsa_do_fingidor', name: 'Farsa do Fingidor', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'hyninn' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.hyninn.forma_de_macaco', name: 'Forma de Macaco', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'hyninn' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.hyninn.golpista_divino', name: 'Golpista Divino', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'hyninn' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.hyninn.obrigacoes',
    name: 'Obrigações & Restrições — Hyninn',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'hyninn' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Golpes e trapaças', text: 'Você não recusa participar de um golpe/trapaça, exceto quando prejudica aliados.' },
      { type: 'RULE_NOTE', title: 'Oferenda diária', text: 'Você deve realizar um ato furtivo/ousado/proibido por dia (ou por sessão). Em termos de jogo: ação com teste de Enganação ou Ladinagem CD mínima 15 + metade do seu nível.' }
    ]
  },

  // =========================
  // KALLYADRANOCH
  // =========================
  makeFeature({ id: 'divine.kallyadranoch.aura_de_medo', name: 'Aura de Medo', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'kallyadranoch' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.kallyadranoch.escamas_draconicas', name: 'Escamas Dracônicas', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'kallyadranoch' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.kallyadranoch.presas_primordiais', name: 'Presas Primordiais', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'kallyadranoch' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.kallyadranoch.servos_do_dragao', name: 'Servos do Dragão', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'kallyadranoch' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.kallyadranoch.obrigacoes',
    name: 'Obrigações & Restrições — Kallyadranoch',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'kallyadranoch' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Oferenda ao subir de nível', text: 'Para subir de nível, além do XP, você deve realizar uma oferenda em tesouro (valor: 20% da diferença do dinheiro inicial do novo nível para o nível atual).' }
    ]
  },

  // =========================
  // KHALMYR
  // =========================
  makeFeature({ id: 'divine.khalmyr.coragem_total', name: 'Coragem Total', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'khalmyr' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.khalmyr.dom_da_verdade', name: 'Dom da Verdade', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'khalmyr' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.khalmyr.espada_justiceira', name: 'Espada Justiceira', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'khalmyr' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.khalmyr.reparar_injustica', name: 'Reparar Injustiça', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'khalmyr' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.khalmyr.obrigacoes',
    name: 'Obrigações & Restrições — Khalmyr',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'khalmyr' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Ajuda aos inocentes', text: 'Você não pode recusar pedidos de ajuda de pessoas inocentes.' },
      { type: 'RULE_NOTE', title: 'Hierarquia', text: 'Você deve cumprir ordens de superiores na hierarquia da igreja (devotos de nível maior).' },
      { type: 'RULE_NOTE', title: 'Itens mágicos', text: 'Você só pode usar itens mágicos permanentes criados por devotos do mesmo deus.' }
    ]
  },

  // =========================
  // LENA
  // =========================
  makeFeature({ id: 'divine.lena.ataque_piedoso', name: 'Ataque Piedoso', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'lena' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.lena.aura_restauradora', name: 'Aura Restauradora', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'lena' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.lena.cura_gentil', name: 'Cura Gentil', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'lena' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.lena.curandeira_perfeita', name: 'Curandeira Perfeita', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'lena' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.lena.obrigacoes',
    name: 'Obrigações & Restrições — Lena',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'lena' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Violência proibida', text: 'Você não pode causar dano letal ou perda de PV a criaturas vivas (nem conceder bônus em dano letal). Pode causar dano não letal e impor condições.' },
      { type: 'RULE_NOTE', title: 'Restrição de devotos', text: 'Apenas mulheres podem ser devotas de Lena (paladinos de Lena podem ser homens ou mulheres; são a exceção).' },
      { type: 'RULE_NOTE', title: 'Clériga', text: 'Uma clériga precisa dar à luz pelo menos uma vez antes de receber poderes divinos.' },
      { type: 'RULE_NOTE', title: 'Arma Espiritual', text: 'Servos de Lena não podem lançar Arma Espiritual e similares.' }
    ]
  },

  // =========================
  // LIN-WU
  // =========================
  makeFeature({ id: 'divine.linwu.coragem_total', name: 'Coragem Total', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'linwu' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.linwu.kiai_divino', name: 'Kiai Divino', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'linwu' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.linwu.mente_vazia', name: 'Mente Vazia', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'linwu' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.linwu.tradicao_de_linwu', name: 'Tradição de Lin-Wu', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'linwu' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.linwu.obrigacoes',
    name: 'Obrigações & Restrições — Lin-Wu',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'linwu' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Honra', text: 'Você deve agir de forma honrada e não pode recorrer a mentiras e subterfúgios.' },
      { type: 'RULE_NOTE', title: 'Proibição de testes', text: 'Você é proibido de tentar ações que exigiriam Enganação, Furtividade ou Ladinagem.' }
    ]
  },

  // =========================
  // MARAH
  // =========================
  makeFeature({ id: 'divine.marah.aura_de_paz', name: 'Aura de Paz', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'marah' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.marah.dom_da_esperanca', name: 'Dom da Esperança', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'marah' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.marah.palavras_de_bondade', name: 'Palavras de Bondade', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'marah' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.marah.talento_artistico', name: 'Talento Artístico', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'marah' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.marah.obrigacoes',
    name: 'Obrigações & Restrições — Marah',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'marah' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Violência proibida', text: 'Você não pode causar dano, perda de PV ou condições (exceto enfeitiçado, fascinado e pasmo). Em combate, só pode proteger/curar/fugir/render-se/aceitar a morte.' },
      { type: 'RULE_NOTE', title: 'Arma Espiritual', text: 'Devotos de Marah não podem lançar Arma Espiritual e similares.' }
    ]
  },

  // =========================
  // MEGALOKK
  // =========================
  makeFeature({ id: 'divine.megalokk.olhar_amedrontador', name: 'Olhar Amedrontador', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'megalokk' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.megalokk.presas_primordiais', name: 'Presas Primordiais', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'megalokk' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.megalokk.urro_divino', name: 'Urro Divino', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'megalokk' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.megalokk.voz_dos_monstros', name: 'Voz dos Monstros', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'megalokk' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.megalokk.obrigacoes',
    name: 'Obrigações & Restrições — Megalokk',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'megalokk' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Restrições', text: 'Você é proibido de usar perícias baseadas em Inteligência ou Carisma (exceto Adestramento e Intimidação). Não pode preparar ação, escolher 10/20 em testes ou lançar magias sustentadas.' }
    ]
  },

  // =========================
  // NIMB
  // =========================
  makeFeature({ id: 'divine.nimb.extase_da_loucura', name: 'Êxtase da Loucura', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'nimb' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.nimb.poder_oculto', name: 'Poder Oculto', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'nimb' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.nimb.sorte_dos_loucos', name: 'Sorte dos Loucos', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'nimb' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.nimb.transmissao_da_loucura', name: 'Transmissão da Loucura', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'nimb' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.nimb.obrigacoes',
    name: 'Obrigações & Restrições — Nimb',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'nimb' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Sem obrigações (mas com restrições)', text: 'Você nunca perde PM por descumprir O&R, mas sofre restrições próprias.' },
      { type: 'RULE_NOTE', title: 'Carisma', text: 'Você sofre –5 em testes de perícias baseadas em Carisma.' },
      { type: 'RULE_NOTE', title: 'Início de cena de ação', text: 'Role 1d6. Com resultado 1, você fica confuso (mesmo que seja imune).' }
    ]
  },

  // =========================
  // OCEANO
  // =========================
  makeFeature({ id: 'divine.oceano.anfibio', name: 'Anfíbio', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'oceano' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.oceano.arsenal_das_profundezas', name: 'Arsenal das Profundezas', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'oceano' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.oceano.mestre_dos_mares', name: 'Mestre dos Mares', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'oceano' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.oceano.sopro_do_mar', name: 'Sopro do Mar', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'oceano' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.oceano.obrigacoes',
    name: 'Obrigações & Restrições — Oceano',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'oceano' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Armas permitidas', text: 'Apenas azagaia, lança, tridente e rede.' },
      { type: 'RULE_NOTE', title: 'Armaduras', text: 'Apenas armaduras leves.' },
      { type: 'RULE_NOTE', title: 'Distância do oceano', text: 'Você não pode se manter afastado do oceano por mais de um mês.' }
    ]
  },

  // =========================
  // SSZZAAS
  // =========================
  makeFeature({ id: 'divine.sszzaas.astucia_da_serpente', name: 'Astúcia da Serpente', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'sszzaas' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.sszzaas.familiar_ofidico', name: 'Familiar Ofídico', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'sszzaas' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.sszzaas.presas_venenosas', name: 'Presas Venenosas', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'sszzaas' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.sszzaas.sangue_ofidico', name: 'Sangue Ofídico', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'sszzaas' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.sszzaas.obrigacoes',
    name: 'Obrigações & Restrições — Sszzaas',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'sszzaas' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Oferenda diária', text: 'Você deve fazer um ato de traição, intriga ou corrupção por dia (ou por sessão).' },
      { type: 'RULE_NOTE', title: 'Em termos de jogo', text: 'Uma ação exigindo Enganação CD mínima 15 + metade do seu nível.' }
    ]
  },

  // =========================
  // TANNA-TOH
  // =========================
  makeFeature({ id: 'divine.tanna_toh.conhecimento_enciclopedico', name: 'Conhecimento Enciclopédico', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'tanna_toh' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.tanna_toh.mente_analitica', name: 'Mente Analítica', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'tanna_toh' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.tanna_toh.pesquisa_abencoada', name: 'Pesquisa Abençoada', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'tanna_toh' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.tanna_toh.voz_da_civilizacao', name: 'Voz da Civilização', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'tanna_toh' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.tanna_toh.obrigacoes',
    name: 'Obrigações & Restrições — Tanna-Toh',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'tanna_toh' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Missões de conhecimento', text: 'Você jamais pode recusar uma missão envolvendo busca por novo conhecimento ou informação.' },
      { type: 'RULE_NOTE', title: 'Verdade', text: 'Você sempre deve dizer a verdade e não pode recusar responder uma pergunta direta.' },
      { type: 'RULE_NOTE', title: 'Proibição', text: 'É proibido esconder qualquer conhecimento.' }
    ]
  },

  // =========================
  // TENEBRA
  // =========================
  makeFeature({ id: 'divine.tenebra.caricia_sombria', name: 'Carícia Sombria', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'tenebra' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.tenebra.manto_da_penumbra', name: 'Manto da Penumbra', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'tenebra' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.tenebra.visao_nas_trevas', name: 'Visão nas Trevas', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'tenebra' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.tenebra.zumbificar', name: 'Zumbificar', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'tenebra' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.tenebra.obrigacoes',
    name: 'Obrigações & Restrições — Tenebra',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'tenebra' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Sol proibido', text: 'Você deve se cobrir inteiramente durante o dia, sem expor ao sol nenhum pedaço de pele.' }
    ]
  },

  // =========================
  // THWOR
  // =========================
  makeFeature({ id: 'divine.thwor.almejar_o_impossivel', name: 'Almejar o Impossível', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'thwor' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.thwor.furia_divina', name: 'Fúria Divina', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'thwor' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.thwor.olhar_amedrontador', name: 'Olhar Amedrontador', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'thwor' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.thwor.tropas_duyshidakk', name: 'Tropas Duyshidakk', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'thwor' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.thwor.obrigacoes',
    name: 'Obrigações & Restrições — Thwor',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'thwor' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Ser duyshidakk', text: 'Você deve ser aceito como membro do povo goblinoide (duyshidakk).' },
      { type: 'RULE_NOTE', title: 'Objetivo', text: 'Você deve se esforçar para que o “Mundo Como Deve Ser” tome o continente.' },
      { type: 'RULE_NOTE', title: 'Alianças', text: 'Procure alianças com goblinoides e só lute contra eles em último caso.' }
    ]
  },

  // =========================
  // THYATIS
  // =========================
  makeFeature({ id: 'divine.thyatis.ataque_piedoso', name: 'Ataque Piedoso', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'thyatis' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.thyatis.dom_da_imortalidade', name: 'Dom da Imortalidade', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'thyatis' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.thyatis.dom_da_profecia', name: 'Dom da Profecia', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'thyatis' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.thyatis.dom_da_ressurreicao', name: 'Dom da Ressurreição', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'thyatis' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.thyatis.obrigacoes',
    name: 'Obrigações & Restrições — Thyatis',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'thyatis' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Proibição', text: 'Você é proibido de matar criaturas inteligentes (Int –3 ou maior). Pode atacar e causar dano, mas jamais levar à morte.' }
    ]
  },

  // =========================
  // VALKARIA
  // =========================
  makeFeature({ id: 'divine.valkaria.almejar_o_impossivel', name: 'Almejar o Impossível', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'valkaria' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.valkaria.armas_da_ambicao', name: 'Armas da Ambição', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'valkaria' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.valkaria.coragem_total', name: 'Coragem Total', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'valkaria' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.valkaria.liberdade_divina', name: 'Liberdade Divina', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'valkaria' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.valkaria.obrigacoes',
    name: 'Obrigações & Restrições — Valkaria',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'valkaria' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Vida itinerante', text: 'Você não pode fixar moradia em um mesmo lugar por muito tempo (máx. 2d10+10 dias na mesma cidade/vila/aldeia/povoado ou 1d4+2 meses no mesmo reino).' },
      { type: 'RULE_NOTE', title: 'Proibição', text: 'Você é proibido de se casar ou formar qualquer união estável.' }
    ]
  },

  // =========================
  // WYNNA
  // =========================
  makeFeature({ id: 'divine.wynna.bencao_do_mana', name: 'Bênção do Mana', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'wynna' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.wynna.centelha_magica', name: 'Centelha Mágica', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'wynna' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.wynna.escudo_magico', name: 'Escudo Mágico', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'wynna' }, choiceRules: [], effects: []  }),
  makeFeature({ id: 'divine.wynna.teurgista_mistico', name: 'Teurgista Místico', kind: FeatureKind.DIVINE_POWER, source: { type: 'deity', sourceId: 'wynna' }, choiceRules: [], effects: []  }),
  {
    id: 'divine.wynna.obrigacoes',
    name: 'Obrigações & Restrições — Wynna',
    kind: 'divine_obligation',
    source: { type: 'deity', sourceId: 'wynna' },
    choiceRules: [],
    effects: [
      { type: 'RULE_NOTE', title: 'Bondade', text: 'Você jamais pode recusar pedido de ajuda de um inocente.' },
      { type: 'RULE_NOTE', title: 'Proibição', text: 'Você é proibido de matar seres mágicos (elfos, qareen, sílfides etc., a critério do mestre) e conjuradores arcanos.' }
    ]
  }
];
