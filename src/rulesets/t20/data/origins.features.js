import { makeFeature, FeatureKind } from './feats/_schema'

export const originFeatures = [
  makeFeature({
    id: 'o_membro_da_igreja',
    name: 'Membro da Igreja',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você consegue hospedagem confortável e informação em qualquer templo de sua divindade, para você e seus aliados.',
    effects: [{ type: 'RULE_NOTE', title: 'Narrativo', text: 'Hospedagem e informação em templos da divindade.' }]
  }),
  makeFeature({
    id: 'o_amigo_especial',
    name: 'Amigo Especial',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você recebe +5 em testes de Adestramento com animais e possui um parceiro (não conta no limite).',
    effects: [{ type: 'SKILL_MOD', values: { skill: 'animal_handling', amount: 5 } }],
    choiceRules: [
      { key: 'amigo_especial_skill', type: 'PICK_SKILLS', count: 1, filters: { exclude: ['melee', 'ranged'] } }
    ]
  }),
  makeFeature({
    id: 'o_lembrancas_graduais',
    name: 'Lembranças Graduais',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Em momentos a critério do mestre, você pode fazer um teste de Sabedoria (CD 10) para reconhecer pessoas, criaturas ou lugares.',
    effects: [{ type: 'RULE_NOTE', title: 'Teste', text: 'Sabedoria CD 10 (a critério do mestre).' }]
  }),
  makeFeature({
    id: 'o_sangue_azul',
    name: 'Sangue Azul',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você tem alguma influência política, suficiente para ser tratado com mais leniência pela guarda, conseguir uma audiência etc.',
    effects: [{ type: 'RULE_NOTE', title: 'Narrativo', text: 'Influência social/política.' }]
  }),
  makeFeature({
    id: 'o_frutos_do_trabalho',
    name: 'Frutos do Trabalho',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'No início de cada aventura, você recebe até 5 itens gerais que possa fabricar num valor total de até T$ 50 (aumenta por patamar).',
    effects: [{ type: 'RULE_NOTE', title: 'Itens', text: 'Gera itens no início da aventura (automatização futura).' }]
  }),
  makeFeature({
    id: 'o_dom_artistico',
    name: 'Dom Artístico',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você recebe +2 em testes de Atuação e recebe o dobro de tibares em apresentações.',
    effects: [{ type: 'SKILL_MOD', values: { skill: 'performance', amount: 2 } }]
  }),
  makeFeature({
    id: 'o_esse_cheiro',
    name: 'Esse Cheiro...',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você recebe +2 em Fortitude e detecta automaticamente a presença (não localização) de itens alquímicos em alcance curto.',
    effects: [{ type: 'SAVE_MOD', values: { save: 'fortitude', amount: 2 } }, { type: 'RULE_NOTE', title: 'Detecção', text: 'Detecta presença de itens alquímicos em alcance curto.' }]
  }),
  makeFeature({
    id: 'o_a_prova_de_tudo',
    name: 'À Prova de Tudo',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você não sofre penalidade em deslocamento e Sobrevivência por clima ruim e por terreno difícil natural.',
    effects: [{ type: 'RULE_NOTE', title: 'Movimento', text: 'Ignora penalidades de clima/terreno natural.' }]
  }),
  makeFeature({
    id: 'o_confissao',
    name: 'Confissão',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você pode usar Intimidação para interrogar sem custo e em uma hora.',
    effects: [{ type: 'RULE_NOTE', title: 'Interrogar', text: 'Usa Intimidação como Investigação (interrogatório).' }]
  }),
  makeFeature({
    id: 'o_alpinista_social',
    name: 'Alpinista Social',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você pode substituir testes de Diplomacia por testes de Enganação.',
    effects: [{ type: 'RULE_NOTE', title: 'Substituição', text: 'Diplomacia -> Enganação (onde fizer sentido).' }]
  }),
  makeFeature({
    id: 'o_truque_de_magica',
    name: 'Truque de Mágica',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você pode lançar Explosão de Chamas, Hipnotismo e Queda Suave, mas apenas com o aprimoramento Truque.',
    effects: [{ type: 'RULE_NOTE', title: 'Truques', text: 'Permite lançar 3 magias como truque (não-mágico).' }]
  }),
  makeFeature({
    id: 'o_punguista',
    name: 'Punguista',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você pode fazer testes de Ladinagem para sustento em um dia; se passar, recebe o dobro.',
    effects: [{ type: 'RULE_NOTE', title: 'Sustento', text: 'Ladinagem como Ofício (1 dia), dobra renda se sucesso.' }]
  }),
  makeFeature({
    id: 'o_medico_de_campo',
    name: 'Médico de Campo',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você soma sua Sabedoria aos PV restaurados por suas habilidades e itens mundanos de cura.',
    effects: [{ type: 'RULE_NOTE', title: 'Cura', text: 'Soma Sabedoria aos PV restaurados por cura mundana.' }]
  }),
  makeFeature({
    id: 'o_busca_interior',
    name: 'Busca Interior',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Gaste 1 PM para meditar e receber uma dica do mestre quando o grupo estiver travado.',
    effects: [{ type: 'RULE_NOTE', title: 'PM', text: 'Gasta 1 PM para receber dica (a critério do mestre).' }]
  }),
  makeFeature({
    id: 'o_desejo_de_liberdade',
    name: 'Desejo de Liberdade',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você recebe +5 em testes contra agarrar e efeitos de movimento.',
    effects: [{ type: 'RULE_NOTE', title: 'Resistência', text: '+5 contra agarrar/movimento.' }]
  }),
  makeFeature({
    id: 'o_palpite_fundamentado',
    name: 'Palpite Fundamentado',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Gaste 2 PM para substituir um teste de perícia baseada em Int/Sab por Conhecimento.',
    effects: [{ type: 'RULE_NOTE', title: 'PM', text: '2 PM: teste -> Conhecimento.' }]
  }),
  makeFeature({
    id: 'o_agua_no_feijao',
    name: 'Água no Feijão',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você não sofre penalidade de –5 e não gasta matéria-prima adicional para fabricar pratos para cinco pessoas.',
    effects: [{ type: 'RULE_NOTE', title: 'Cozinha', text: 'Ignora penalidade e custo adicional em pratos para 5.' }]
  }),
  makeFeature({
    id: 'o_cultura_exotica',
    name: 'Cultura Exótica',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você pode gastar 1 PM para fazer um teste de perícia somente treinada, mesmo sem ser treinado.',
    effects: [{ type: 'RULE_NOTE', title: 'PM', text: '1 PM: usa perícia treinada sem treino (exceção).' }]
  }),
  makeFeature({
    id: 'o_pao_e_circo',
    name: 'Pão e Circo',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você pode causar dano não letal sem penalidade de –5.',
    effects: [{ type: 'RULE_NOTE', title: 'Combate', text: 'Não letal sem penalidade.' }]
  }),
  makeFeature({
    id: 'o_detetive',
    name: 'Detetive',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Gaste 1 PM para substituir testes de Percepção e Intuição por Investigação até o fim da cena.',
    effects: [{ type: 'RULE_NOTE', title: 'PM', text: '1 PM: Percepção/Intuição -> Investigação (cena).' }]
  }),
  makeFeature({
    id: 'o_heranca',
    name: 'Herança',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você herdou um item de até T$ 1.000. Pode escolher este poder duas vezes (até T$ 2.000).',
    effects: [{ type: 'RULE_NOTE', title: 'Item', text: 'Concede item (automatização futura).' }]
  }),
  makeFeature({
    id: 'o_coracao_heroico',
    name: 'Coração Heroico',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você recebe +3 PM. Ao atingir novo patamar, recebe +3 PM.',
    effects: [{ type: 'STAT_MOD', values: { stat: 'mp_max', amount: 3 } }]
  }),
  makeFeature({
    id: 'o_passagem_de_navio',
    name: 'Passagem de Navio',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você consegue transporte marítimo sem custos, pagando com trabalho durante a viagem.',
    effects: [{ type: 'RULE_NOTE', title: 'Narrativo', text: 'Transporte marítimo com trabalho.' }]
  }),
  makeFeature({
    id: 'o_vendedor_de_carcacas',
    name: 'Vendedor de Carcaças',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Extrai recursos de criaturas em 1 minuto (em vez de 1 hora) e recebe +5 no teste.',
    effects: [{ type: 'RULE_NOTE', title: 'Coleta', text: 'Extrai em 1 min e +5 no teste.' }]
  }),
  makeFeature({
    id: 'o_rede_de_contatos',
    name: 'Rede de Contatos',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você pode usar Diplomacia para interrogar sem custo e em uma hora.',
    effects: [{ type: 'RULE_NOTE', title: 'Interrogar', text: 'Diplomacia para interrogar (1h, sem custo).' }]
  }),
  makeFeature({
    id: 'o_negociacao',
    name: 'Negociação',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você pode vender itens 10% mais caro (não cumulativo).',
    effects: [{ type: 'RULE_NOTE', title: 'Economia', text: 'Vende 10% mais caro.' }]
  }),
  makeFeature({
    id: 'o_escavador',
    name: 'Escavador',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você se torna proficiente em picaretas, causa +1 de dano e ignora terreno difícil em masmorras/subterrâneos.',
    effects: [{ type: 'PROFICIENCY_GRANT', values: { category: 'weapons', value: 'pickaxe' } }, { type: 'RULE_NOTE', title: 'Combate', text: '+1 dano com picaretas; ignora terreno difícil em masmorras.' }]
  }),
  makeFeature({
    id: 'o_mochileiro',
    name: 'Mochileiro',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Seu limite de carga aumenta em 5 espaços.',
    effects: [{ type: 'STAT_MOD', values: { stat: 'carry_capacity', amount: 5 } }]
  }),
  makeFeature({
    id: 'o_quebra_galho',
    name: 'Quebra-galho',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Em cidades/metrópoles, compra item mundano não superior por metade do preço (não revende).',
    effects: [{ type: 'RULE_NOTE', title: 'Compra', text: 'Compra por metade (itens mundanos não superiores) em cidades.' }]
  }),
  makeFeature({
    id: 'o_estoico',
    name: 'Estoico',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Sua condição de descanso é uma categoria acima do padrão pela situação.',
    effects: [{ type: 'RULE_NOTE', title: 'Descanso', text: 'Descanso 1 categoria melhor.' }]
  }),
  makeFeature({
    id: 'o_antigo_mestre',
    name: 'Antigo Mestre',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Uma vez por aventura, seu antigo mestre surge e ajuda por uma cena (parceiro mestre).',
    effects: [{ type: 'RULE_NOTE', title: 'Aliado', text: '1x/aventura: parceiro mestre por 1 cena.' }]
  }),
  makeFeature({
    id: 'o_vida_rustica',
    name: 'Vida Rústica',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Imune a efeitos prejudiciais de itens ingeríveis e descansa mesmo em locais desconfortáveis.',
    effects: [{ type: 'RULE_NOTE', title: 'Resistência', text: 'Imunidade a ingeríveis prejudiciais; recuperação mínima = nível.' }]
  }),
  makeFeature({
    id: 'o_influencia_militar',
    name: 'Influência Militar',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Em bases militares, consegue hospedagem e informações para você e aliados.',
    effects: [{ type: 'RULE_NOTE', title: 'Narrativo', text: 'Hospedagem e info em bases.' }]
  }),
  makeFeature({
    id: 'o_gororoba',
    name: 'Gororoba',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você não sofre a penalidade de –5 para fabricar um prato especial adicional.',
    effects: [{ type: 'RULE_NOTE', title: 'Cozinha', text: 'Ignora –5 para prato especial adicional.' }]
  }),
  makeFeature({
    id: 'o_esforcado',
    name: 'Esforçado',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você recebe +2 em todos os testes de perícias estendidos (inclui perigos complexos).',
    effects: [{ type: 'RULE_NOTE', title: 'Estendido', text: '+2 em testes estendidos.' }]
  }),

  // Placeholders para escolhas “a sua escolha” que a UI vai resolver
  makeFeature({
    id: 'o_poder_combate_escolha',
    name: 'Poder de Combate (Escolha)',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Escolha um poder geral de combate.',
    choiceRules: [{ key: 'origin_pick_combat', type: 'PICK_FEATURES', count: 1, filters: { prefix: 'general.combat.' } }],
    effects: [{ type: 'FEATURE_GRANT', values: { $choice: 'origin_pick_combat' } }]
  }),
  makeFeature({
    id: 'o_poder_tormenta_escolha',
    name: 'Poder da Tormenta (Escolha)',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Escolha um poder da Tormenta (quando existir no catálogo).',
    effects: [{ type: 'RULE_NOTE', title: 'TODO', text: 'Mapear poderes da Tormenta no catálogo.' }]
  }),
  makeFeature({
    id: 'o_amn_escolhas_mestre',
    name: 'Amnésico (Escolhas do Mestre)',
    kind: FeatureKind.ORIGIN_POWER,
    group: 'origin',
    source: { type: 'origin' },
    text: 'Você recebe uma perícia e um poder escolhidos pelo mestre.',
    effects: [{ type: 'RULE_NOTE', title: 'Mestre', text: 'Escolhas fora do automatizável.' }]
  })
]
