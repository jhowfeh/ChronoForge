// src/modules/CharSheetT20/services/deities.js

export const deities = [
  {
    label: 'Aharadak',
    value: 'aharadak',
    channelEnergy: 'negative',
    favoredWeapon: 'Corrente de espinhos',
    holySymbol: 'Um olho macabro de pupila vertical e cercado de espinhos.',
    devotees: ['Quaisquer'],
    beliefsAndGoals:
      'Reverenciar a Tormenta, apregoar a inevitabilidade de sua chegada ao mundo. Praticar devassidão e perversão. Deturpar tudo que é correto, desfigurar tudo que é normal. Abraçar agonia, crueldade e loucura.',
    grantedFeatureIds: [
      'divine.aharadak.afinidade_com_a_tormenta',
      'divine.aharadak.extase_da_loucura',
      'divine.aharadak.percepcao_temporal',
      'divine.aharadak.rejeicao_divina'
    ],
    obligationFeatureId: 'divine.aharadak.obrigacoes'
  },

  {
    label: 'Allihanna',
    value: 'allihanna',
    channelEnergy: 'positive',
    favoredWeapon: 'Bordão',
    holySymbol:
      'Para bárbaros e outros adoradores de animais, corresponde ao respectivo animal. Para outros, uma pequena árvore.',
    devotees: ['Dahllan', 'Elfos', 'Sílfides', 'Bárbaros', 'Caçadores', 'Druidas'],
    beliefsAndGoals:
      'Reverenciar os seres da natureza. Proteger a vida selvagem. Promover harmonia entre natureza e civilização. Combater monstros, mortos-vivos e outras criaturas que perturbam o equilíbrio natural.',
    grantedFeatureIds: [
      'divine.allihanna.compreender_os_ermos',
      'divine.allihanna.dedo_verde',
      'divine.allihanna.descanso_natural',
      'divine.allihanna.voz_da_natureza'
    ],
    obligationFeatureId: 'divine.allihanna.obrigacoes'
  },

  {
    label: 'Arsenal',
    value: 'arsenal',
    channelEnergy: 'any',
    favoredWeapon: 'Martelo de guerra',
    holySymbol: 'Um martelo de guerra e uma espada longa cruzados sobre um escudo.',
    devotees: ['Anões', 'Minotauros', 'Bárbaros', 'Cavaleiros', 'Guerreiros', 'Lutadores'],
    beliefsAndGoals:
      'Promover a guerra e o conflito. Vencer a qualquer custo, pela força ou estratégia. Jamais oferecer ou aceitar rendição. Eliminar as próprias fraquezas. Conhecer o inimigo como a si mesmo. Criar condições de vitória quando não existirem.',
    grantedFeatureIds: [
      'divine.arsenal.conjurar_arma',
      'divine.arsenal.coragem_total',
      'divine.arsenal.fe_guerreira',
      'divine.arsenal.sangue_de_ferro'
    ],
    obligationFeatureId: 'divine.arsenal.obrigacoes'
  },

  {
    label: 'Azgher',
    value: 'azgher',
    channelEnergy: 'positive',
    favoredWeapon: 'Cimitarra',
    holySymbol: 'Um sol dourado.',
    devotees: ['Aggelus', 'Qareen', 'Arcanistas', 'Bárbaros', 'Caçadores', 'Cavaleiros', 'Guerreiros', 'Nobres', 'Paladinos'],
    beliefsAndGoals:
      'Praticar gratidão pela proteção e generosidade do sol. Promover honestidade, expor mentiras. Praticar caridade e altruísmo. Proteger os necessitados. Oferecer clemência, perdão e redenção. Combater o mal.',
    grantedFeatureIds: [
      'divine.azgher.espada_solar',
      'divine.azgher.fulgor_solar',
      'divine.azgher.habitante_do_deserto',
      'divine.azgher.inimigo_de_tenebra'
    ],
    obligationFeatureId: 'divine.azgher.obrigacoes'
  },

  {
    label: 'Hyninn',
    value: 'hyninn',
    channelEnergy: 'any',
    favoredWeapon: 'Adaga',
    holySymbol: 'Uma adaga atravessando uma máscara, ou uma raposa.',
    devotees: ['Hynne', 'Goblins', 'Sílfides', 'Bardos', 'Bucaneiros', 'Ladinos', 'Inventores', 'Nobres'],
    beliefsAndGoals:
      'Praticar astúcia e esperteza. Demonstrar que honestidade e sinceridade levam ao fracasso. Desafiar lei e ordem. Ser vitorioso sem seguir regras. Levar vantagem em tudo.',
    grantedFeatureIds: [
      'divine.hyninn.apostar_com_o_trapaceiro',
      'divine.hyninn.farsa_do_fingidor',
      'divine.hyninn.forma_de_macaco',
      'divine.hyninn.golpista_divino'
    ],
    obligationFeatureId: 'divine.hyninn.obrigacoes'
  },

  {
    label: 'Kallyadranoch',
    value: 'kallyadranoch',
    channelEnergy: 'negative',
    favoredWeapon: 'Lança',
    holySymbol: 'Escamas de cinco cores diferentes.',
    devotees: ['Elfos', 'Medusas', 'Sulfure', 'Arcanistas', 'Cavaleiros', 'Guerreiros', 'Lutadores', 'Nobres'],
    beliefsAndGoals:
      'Praticar soberania, orgulho e superioridade. Acumular riquezas. Proteger posses e dignidade. Ser implacável com inimigos. Reverenciar dragões e suas crias.',
    grantedFeatureIds: [
      'divine.kallyadranoch.aura_de_medo',
      'divine.kallyadranoch.escamas_draconicas',
      'divine.kallyadranoch.presas_primordiais',
      'divine.kallyadranoch.servos_do_dragao'
    ],
    obligationFeatureId: 'divine.kallyadranoch.obrigacoes'
  },

  {
    label: 'Khalmyr',
    value: 'khalmyr',
    channelEnergy: 'positive',
    favoredWeapon: 'Espada longa',
    holySymbol: 'Espada sobreposta a uma balança.',
    devotees: ['Aggelus', 'Anões', 'Cavaleiros', 'Guerreiros', 'Nobres', 'Paladinos'],
    beliefsAndGoals:
      'Praticar caridade e altruísmo. Defender lei e ordem. Combater mentira, crime e mal. Oferecer clemência, perdão e redenção. Lutar o bom combate.',
    grantedFeatureIds: [
      'divine.khalmyr.coragem_total',
      'divine.khalmyr.dom_da_verdade',
      'divine.khalmyr.espada_justiceira',
      'divine.khalmyr.reparar_injustica'
    ],
    obligationFeatureId: 'divine.khalmyr.obrigacoes'
  },

  {
    label: 'Lena',
    value: 'lena',
    channelEnergy: 'positive',
    favoredWeapon: 'Nenhuma',
    holySymbol: 'Lua crescente prateada.',
    devotees: ['Dahllan', 'Qareen', 'Nobres', 'Paladinos'],
    beliefsAndGoals:
      'Reverenciar e proteger a vida em todas as formas. Reverenciar fertilidade, maternidade e infância. Praticar caridade e altruísmo. Oferecer clemência, perdão e redenção. Aliviar dor e sofrimento físico, mental ou espiritual.',
    grantedFeatureIds: [
      'divine.lena.ataque_piedoso',
      'divine.lena.aura_restauradora',
      'divine.lena.cura_gentil',
      'divine.lena.curandeira_perfeita'
    ],
    obligationFeatureId: 'divine.lena.obrigacoes'
  },

  {
    label: 'Lin-Wu',
    value: 'linwu',
    channelEnergy: 'any',
    favoredWeapon: 'Katana',
    holySymbol: 'Placa de metal com a silhueta de um dragão-serpente celestial.',
    devotees: ['Anões', 'Cavaleiros', 'Guerreiros', 'Nobres', 'Paladinos'],
    beliefsAndGoals:
      'Promover honra acima de tudo. Praticar honestidade, coragem, cortesia e compaixão. Demonstrar integridade e dignidade. Ser leal a companheiros. Buscar redenção após cometer desonra.',
    grantedFeatureIds: [
      'divine.linwu.coragem_total',
      'divine.linwu.kiai_divino',
      'divine.linwu.mente_vazia',
      'divine.linwu.tradicao_de_linwu'
    ],
    obligationFeatureId: 'divine.linwu.obrigacoes'
  },

  {
    label: 'Marah',
    value: 'marah',
    channelEnergy: 'positive',
    favoredWeapon: 'Nenhuma',
    holySymbol: 'Um coração vermelho.',
    devotees: ['Aggelus', 'Elfos', 'Hynne', 'Qareen', 'Bardos', 'Nobres', 'Paladinos'],
    beliefsAndGoals:
      'Praticar amor e gratidão pela vida. Promover paz, harmonia e felicidade. Aliviar dor e sofrimento, trazer conforto aos aflitos. Praticar caridade e altruísmo. Oferecer clemência, perdão e redenção.',
    grantedFeatureIds: [
      'divine.marah.aura_de_paz',
      'divine.marah.dom_da_esperanca',
      'divine.marah.palavras_de_bondade',
      'divine.marah.talento_artistico'
    ],
    obligationFeatureId: 'divine.marah.obrigacoes'
  },

  {
    label: 'Megalokk',
    value: 'megalokk',
    channelEnergy: 'negative',
    favoredWeapon: 'Maça',
    holySymbol: 'A garra de um monstro.',
    devotees: ['Goblins', 'Medusas', 'Minotauros', 'Sulfure', 'Trogs', 'Bárbaros', 'Caçadores', 'Druidas', 'Lutadores'],
    beliefsAndGoals:
      'Praticar violência e soberania do mais forte. Jamais reprimir instintos. Jamais ser domado. Jamais oferecer perdão ou rendição. Eliminar fracos. Destruir inimigos.',
    grantedFeatureIds: [
      'divine.megalokk.olhar_amedrontador',
      'divine.megalokk.presas_primordiais',
      'divine.megalokk.urro_divino',
      'divine.megalokk.voz_dos_monstros'
    ],
    obligationFeatureId: 'divine.megalokk.obrigacoes'
  },

  {
    label: 'Nimb',
    value: 'nimb',
    channelEnergy: 'any',
    favoredWeapon: 'Nenhuma e todas',
    holySymbol: 'Um dado de seis faces.',
    devotees: ['Goblins', 'Qareen', 'Sílfides', 'Arcanistas', 'Bárbaros', 'Bardos', 'Bucaneiros', 'Inventores', 'Ladinos'],
    beliefsAndGoals:
      'Reverenciar caos, aleatoriedade, sorte e azar. Praticar ousadia e rebeldia. Rejeitar bom senso. Tornar o mundo mais interessante.',
    grantedFeatureIds: [
      'divine.nimb.extase_da_loucura',
      'divine.nimb.poder_oculto',
      'divine.nimb.sorte_dos_loucos',
      'divine.nimb.transmissao_da_loucura'
    ],
    obligationFeatureId: 'divine.nimb.obrigacoes'
  },

  {
    label: 'Oceano',
    value: 'oceano',
    channelEnergy: 'any',
    favoredWeapon: 'Tridente',
    holySymbol: 'Uma concha.',
    devotees: ['Dahllan', 'Hynne', 'Minotauros', 'Sereias/Tritões', 'Bárbaros', 'Bucaneiros', 'Caçadores', 'Druidas'],
    beliefsAndGoals:
      'Reverenciar mares, oceano e seres marinhos. Promover harmonia entre oceano e mundo seco. Proteger seres marinhos e quem viaja sobre as ondas. Demandar respeito ao mar e seu poder.',
    grantedFeatureIds: [
      'divine.oceano.anfibio',
      'divine.oceano.arsenal_das_profundezas',
      'divine.oceano.mestre_dos_mares',
      'divine.oceano.sopro_do_mar'
    ],
    obligationFeatureId: 'divine.oceano.obrigacoes'
  },

  {
    label: 'Sszzaas',
    value: 'sszzaas',
    channelEnergy: 'negative',
    favoredWeapon: 'Adaga',
    holySymbol: 'Uma naja vertendo veneno pelas presas.',
    devotees: ['Medusas', 'Arcanistas', 'Bardos', 'Bucaneiros', 'Inventores', 'Ladinos', 'Nobres'],
    beliefsAndGoals:
      'Praticar mentira e trapaça. Buscar sempre a solução mais inteligente. Demonstrar que lealdade e confiança são fraquezas. Promover competição, rivalidade e desconfiança. Usar recursos do inimigo. Levar outros a se sacrificarem em seu lugar.',
    grantedFeatureIds: [
      'divine.sszzaas.astucia_da_serpente',
      'divine.sszzaas.familiar_ofidico',
      'divine.sszzaas.presas_venenosas',
      'divine.sszzaas.sangue_ofidico'
    ],
    obligationFeatureId: 'divine.sszzaas.obrigacoes'
  },

  {
    label: 'Tanna-Toh',
    value: 'tanna_toh',
    channelEnergy: 'any',
    favoredWeapon: 'Bordão',
    holySymbol: 'Pergaminho e pena.',
    devotees: ['Golens', 'Kliren', 'Arcanistas', 'Bardos', 'Inventores', 'Nobres', 'Paladinos'],
    beliefsAndGoals:
      'Reverenciar mente racional, conhecimento, civilização e verdade. Proteger progresso. Promover ensino e prática de artes e ciências. Solucionar mistérios, revelar mentiras. Buscar novo conhecimento. Não tolerar ignorância.',
    grantedFeatureIds: [
      'divine.tanna_toh.conhecimento_enciclopedico',
      'divine.tanna_toh.mente_analitica',
      'divine.tanna_toh.pesquisa_abencoada',
      'divine.tanna_toh.voz_da_civilizacao'
    ],
    obligationFeatureId: 'divine.tanna_toh.obrigacoes'
  },

  {
    label: 'Tenebra',
    value: 'tenebra',
    channelEnergy: 'negative',
    favoredWeapon: 'Adaga',
    holySymbol: 'Estrela negra de cinco pontas.',
    devotees: ['Anões', 'Medusas', 'Qareen', 'Osteon', 'Sulfure', 'Trogs', 'Arcanistas', 'Bardos', 'Ladinos'],
    beliefsAndGoals:
      'Reverenciar noite, escuridão, lua e estrelas. Proteger segredos e mistérios. Reverenciar não vida e mortos-vivos. Propagar necromancia. Rejeitar sol e luz.',
    grantedFeatureIds: [
      'divine.tenebra.caricia_sombria',
      'divine.tenebra.manto_da_penumbra',
      'divine.tenebra.visao_nas_trevas',
      'divine.tenebra.zumbificar'
    ],
    obligationFeatureId: 'divine.tenebra.obrigacoes'
  },

  {
    label: 'Thwor',
    value: 'thwor',
    channelEnergy: 'any',
    favoredWeapon: 'Machado de guerra',
    holySymbol: 'Um grande punho fechado.',
    devotees: ['Qualquer duyshidakk'],
    beliefsAndGoals:
      'Reverenciar lealdade, força e coragem. Promover união entre goblinoides e outros povos humanoides. Reverenciar caos, mutação e vida em movimento. Proteger cultura goblinoide. Destruir elfos.',
    grantedFeatureIds: [
      'divine.thwor.almejar_o_impossivel',
      'divine.thwor.furia_divina',
      'divine.thwor.olhar_amedrontador',
      'divine.thwor.tropas_duyshidakk'
    ],
    obligationFeatureId: 'divine.thwor.obrigacoes'
  },

  {
    label: 'Thyatis',
    value: 'thyatis',
    channelEnergy: 'positive',
    favoredWeapon: 'Espada longa',
    holySymbol: 'Uma ave fênix.',
    devotees: ['Aggelus', 'Cavaleiros', 'Guerreiros', 'Inventores', 'Lutadores', 'Paladinos'],
    beliefsAndGoals:
      'Proteger vida e aqueles necessitados de novas chances. Renegar morte e mentira. Ajudar perdidos a encontrar caminhos e destinos. Oferecer clemência, perdão e redenção.',
    grantedFeatureIds: [
      'divine.thyatis.ataque_piedoso',
      'divine.thyatis.dom_da_imortalidade',
      'divine.thyatis.dom_da_profecia',
      'divine.thyatis.dom_da_ressurreicao'
    ],
    obligationFeatureId: 'divine.thyatis.obrigacoes'
  },

  {
    label: 'Valkaria',
    value: 'valkaria',
    channelEnergy: 'positive',
    favoredWeapon: 'Mangual',
    holySymbol: 'A Estátua de Valkaria ou seis faixas entrelaçadas.',
    devotees: ['Aventureiros (todas as classes)'],
    beliefsAndGoals:
      'Praticar otimismo, evolução e rebeldia. Desafiar limites, almejar o impossível. Combater mal, opressão e tirania. Proteger liberdade. Aceitar o novo. Demonstrar ambição, paixão e coragem. Desfrutar e amar a vida.',
    grantedFeatureIds: [
      'divine.valkaria.almejar_o_impossivel',
      'divine.valkaria.armas_da_ambicao',
      'divine.valkaria.coragem_total',
      'divine.valkaria.liberdade_divina'
    ],
    obligationFeatureId: 'divine.valkaria.obrigacoes'
  },

  {
    label: 'Wynna',
    value: 'wynna',
    channelEnergy: 'any',
    favoredWeapon: 'Adaga',
    holySymbol: 'Um anel metálico.',
    devotees: ['Elfos', 'Golens', 'Qareen', 'Sílfides', 'Arcanistas', 'Bardos'],
    beliefsAndGoals:
      'Reverenciar magia arcana e seus praticantes. Promover ensino da magia. Usar magia para proteger necessitados e trazer felicidade ao mundo.',
    grantedFeatureIds: [
      'divine.wynna.bencao_do_mana',
      'divine.wynna.centelha_magica',
      'divine.wynna.escudo_magico',
      'divine.wynna.teurgista_mistico'
    ],
    obligationFeatureId: 'divine.wynna.obrigacoes'
  }
];
