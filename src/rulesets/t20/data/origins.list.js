// ORIGINS (conectadas por IDs)
// - poderes gerais: general.fate.*, general.combat.*, general.magic.*
// - poderes de origem: o_* (originFeatures do seu origins.js)

export const origins = [
  {
    label: "Acólito",
    value: "acolito",
    proficiencies: ["Armas simples", "Armaduras leves"],
    trainedSkills: ["cura", "religiao", "vontade"],
    startingEquipment: [
      { id: "simbolo_sagrado", name: "Símbolo sagrado" },
      { id: "traje_sacerdote", name: "Traje de sacerdote" },
    ],
    grantedFeatureIds: [
      "general.fate.medicina",
      "o_membro_da_igreja",
      "general.fate.vontade_de_ferro",
    ],
  },

  {
    label: "Amigo dos Animais",
    value: "amigo_dos_animais",
    proficiencies: [],
    trainedSkills: ["adestramento", "cavalgar"],
    startingEquipment: [
      { id: "montaria_ou_cao_escolha", name: "Cão de caça, cavalo, pônei ou trobo (escolha um)" },
    ],
    grantedFeatureIds: ["o_amigo_especial"],
  },

  {
    label: "Amnésico",
    value: "amnesico",
    proficiencies: [],
    trainedSkills: [],
    startingEquipment: [
      { id: "itens_misteriosos_ate_500", name: "Um ou mais itens (somando até T$ 500), aprovados pelo mestre" },
    ],
    grantedFeatureIds: ["o_amn_escolhas_mestre", "o_lembrancas_graduais"],
    notes:
      "Em vez de dois benefícios de uma lista, você recebe uma perícia e um poder escolhidos pelo mestre (e ganha Lembranças Graduais).",
  },

  {
    label: "Aristocrata",
    value: "aristocrata",
    proficiencies: [],
    trainedSkills: ["diplomacia", "enganacao", "nobreza"],
    startingEquipment: [
      { id: "joia_familia_300", name: "Joia de família (T$ 300)" },
      { id: "traje_corte", name: "Traje da corte" },
    ],
    grantedFeatureIds: ["general.fate.comandar", "o_sangue_azul"],
  },

  {
    label: "Artesão",
    value: "artesao",
    proficiencies: [],
    trainedSkills: ["oficio", "vontade"],
    startingEquipment: [
      { id: "instrumentos_oficio", name: "Instrumentos de ofício (qualquer)" },
      { id: "item_fabricavel_50", name: "Um item que você possa fabricar de até T$ 50" },
    ],
    grantedFeatureIds: ["o_frutos_do_trabalho", "general.fate.sortudo"],
  },

  {
    label: "Artista",
    value: "artista",
    proficiencies: [],
    trainedSkills: ["atuacao", "enganacao"],
    startingEquipment: [
      { id: "disfarces_ou_instrumento", name: "Estojo de disfarces ou um instrumento musical (à escolha)" },
    ],
    grantedFeatureIds: ["general.fate.atraente", "o_dom_artistico", "general.fate.sortudo", "general.fate.torcida"],
  },

  {
    label: "Assistente de Laboratório",
    value: "assistente_de_laboratorio",
    proficiencies: [],
    trainedSkills: ["oficio_alquimista", "misticismo"],
    startingEquipment: [
      { id: "instrumentos_oficio_alquimista", name: "Instrumentos de Ofício (alquimista)" },
    ],
    grantedFeatureIds: ["o_esse_cheiro", "general.fate.veneficio", "o_poder_tormenta_escolha"],
  },

  {
    label: "Batedor",
    value: "batedor",
    proficiencies: [],
    trainedSkills: ["furtividade", "percepcao", "sobrevivencia"],
    startingEquipment: [
      { id: "barraca", name: "Barraca" },
      { id: "equipamento_viagem", name: "Equipamento de viagem" },
      { id: "arma_distancia_escolha", name: "Uma arma simples ou marcial de ataque à distância (escolha)" },
    ],
    grantedFeatureIds: ["o_a_prova_de_tudo", "general.combat.estilo_de_disparo", "general.fate.sentidos_agucados"],
  },

  {
    label: "Capanga",
    value: "capanga",
    proficiencies: [],
    trainedSkills: ["luta", "intimidacao"],
    startingEquipment: [
      { id: "tatuagem_gangue", name: "Tatuagem ou adereço da gangue (+1 em Intimidação)" },
      { id: "arma_simples_corpo_a_corpo", name: "Uma arma simples corpo a corpo" },
    ],
    grantedFeatureIds: ["o_confissao", "o_poder_combate_escolha"],
  },

  {
    label: "Charlatão",
    value: "charlatao",
    proficiencies: [],
    trainedSkills: ["enganacao", "jogatina"],
    startingEquipment: [
      { id: "estojo_disfarces", name: "Estojo de disfarces" },
      { id: "joia_falsificada", name: "Joia falsificada (valor aparente T$ 100; sem valor real)" },
    ],
    grantedFeatureIds: ["o_alpinista_social", "general.fate.aparencia_inofensiva", "general.fate.sortudo"],
  },

  {
    label: "Circense",
    value: "circense",
    proficiencies: [],
    trainedSkills: ["acrobacia", "atuacao", "reflexos"],
    startingEquipment: [{ id: "bolas_malabarismo", name: "Três bolas coloridas para malabarismo (+1 em Atuação)" }],
    grantedFeatureIds: ["general.fate.acrobatico", "general.fate.torcida", "o_truque_de_magica"],
  },

  {
    label: "Criminoso",
    value: "criminoso",
    proficiencies: [],
    trainedSkills: ["enganacao", "furtividade", "ladinagem"],
    startingEquipment: [{ id: "disfarces_ou_gazua", name: "Estojo de disfarces ou gazua" }],
    grantedFeatureIds: ["o_punguista", "general.fate.veneficio"],
  },

  {
    label: "Curandeiro",
    value: "curandeiro",
    proficiencies: [],
    trainedSkills: ["cura", "vontade"],
    startingEquipment: [
      { id: "balsamo_restaurador_x2", name: "Bálsamo restaurador x2" },
      { id: "maleta_medicamentos", name: "Maleta de medicamentos" },
    ],
    grantedFeatureIds: ["general.fate.medicina", "o_medico_de_campo", "general.fate.veneficio"],
  },

  {
    label: "Eremita",
    value: "eremita",
    proficiencies: [],
    trainedSkills: ["misticismo", "religiao", "sobrevivencia"],
    startingEquipment: [
      { id: "barraca", name: "Barraca" },
      { id: "equipamento_viagem", name: "Equipamento de viagem" },
    ],
    grantedFeatureIds: ["o_busca_interior", "general.fate.lobo_solitario"],
  },

  {
    label: "Escravo",
    value: "escravo",
    proficiencies: [],
    trainedSkills: ["atletismo", "fortitude", "furtividade"],
    startingEquipment: [
      { id: "algemas", name: "Algemas" },
      { id: "ferramenta_pesada_maca", name: "Ferramenta pesada (mesmas estatísticas de uma maça)" },
    ],
    grantedFeatureIds: ["o_desejo_de_liberdade", "general.combat.vitalidade"],
  },

  {
    label: "Estudioso",
    value: "estudioso",
    proficiencies: [],
    trainedSkills: ["conhecimento", "guerra", "misticismo"],
    startingEquipment: [
      { id: "colecao_livros_bonus_escolha", name: "Coleção de livros (+1 em Conhecimento, Guerra, Misticismo ou Nobreza — escolha)" },
    ],
    grantedFeatureIds: ["general.fate.aparencia_inofensiva", "o_palpite_fundamentado"],
  },

  {
    label: "Fazendeiro",
    value: "fazendeiro",
    proficiencies: [],
    trainedSkills: ["adestramento", "cavalgar", "oficio", "sobrevivencia"],
    startingEquipment: [
      { id: "carroca", name: "Carroça" },
      { id: "ferramenta_agricola_lanca", name: "Ferramenta agrícola (mesmas estatísticas de uma lança)" },
      { id: "racoes_10", name: "10 rações de viagem" },
      { id: "animal_nao_combativo", name: "Um animal não combativo (ex.: galinha, porco ou ovelha)" },
    ],
    grantedFeatureIds: ["o_agua_no_feijao", "general.combat.ginete"],
  },

  {
    label: "Forasteiro",
    value: "forasteiro",
    proficiencies: [],
    trainedSkills: ["cavalgar", "pilotagem", "sobrevivencia"],
    startingEquipment: [
      { id: "equipamento_viagem", name: "Equipamento de viagem" },
      { id: "instrumento_exotico_bonus_car_escolha", name: "Instrumento musical exótico (+1 em uma perícia de Carisma aprovada pelo mestre)" },
      { id: "traje_estrangeiro", name: "Traje estrangeiro" },
    ],
    grantedFeatureIds: ["o_cultura_exotica", "general.fate.lobo_solitario"],
  },

  {
    label: "Gladiador",
    value: "gladiador",
    proficiencies: [],
    trainedSkills: ["atuacao", "luta"],
    startingEquipment: [
      { id: "arma_marcial_ou_exotica", name: "Uma arma marcial ou exótica" },
      { id: "lembranca_fa", name: "Um item sem valor recebido de um admirador" },
    ],
    grantedFeatureIds: ["general.fate.atraente", "o_pao_e_circo", "general.fate.torcida", "o_poder_combate_escolha"],
  },

  {
    label: "Guarda",
    value: "guarda",
    proficiencies: [],
    trainedSkills: ["investigacao", "luta", "percepcao"],
    startingEquipment: [
      { id: "apito", name: "Apito" },
      { id: "insignia_milicia", name: "Insígnia da milícia" },
      { id: "arma_marcial", name: "Uma arma marcial" },
    ],
    grantedFeatureIds: ["o_detetive", "general.fate.investigador", "o_poder_combate_escolha"],
  },

  {
    label: "Herdeiro",
    value: "herdeiro",
    proficiencies: [],
    trainedSkills: ["misticismo", "nobreza", "oficio"],
    startingEquipment: [{ id: "simbolo_heranca", name: "Símbolo de herança (anel de sinete, manto cerimonial etc.)" }],
    grantedFeatureIds: ["general.fate.comandar", "o_heranca"],
  },

  {
    label: "Herói Camponês",
    value: "heroi_campones",
    proficiencies: [],
    trainedSkills: ["adestramento", "oficio"],
    startingEquipment: [
      { id: "instrumentos_oficio_ou_arma_simples", name: "Instrumentos de ofício ou uma arma simples" },
      { id: "traje_plebeu", name: "Traje de plebeu" },
    ],
    grantedFeatureIds: ["o_coracao_heroico", "general.fate.sortudo", "general.fate.surto_heroico", "general.fate.torcida"],
  },

  {
    label: "Marujo",
    value: "marujo",
    proficiencies: [],
    trainedSkills: ["atletismo", "jogatina", "pilotagem"],
    startingEquipment: [
      { id: "tibares_2d6", name: "T$ 2d6 (seu último salário)" },
      { id: "corda", name: "Corda" },
    ],
    grantedFeatureIds: ["general.fate.acrobatico", "o_passagem_de_navio"],
  },

  {
    label: "Mateiro",
    value: "mateiro",
    proficiencies: [],
    trainedSkills: ["atletismo", "furtividade", "sobrevivencia"],
    startingEquipment: [
      { id: "arco_curto", name: "Arco curto" },
      { id: "barraca", name: "Barraca" },
      { id: "equipamento_viagem", name: "Equipamento de viagem" },
      { id: "flechas_20", name: "20 flechas" },
    ],
    grantedFeatureIds: ["general.fate.lobo_solitario", "general.fate.sentidos_agucados", "o_vendedor_de_carcacas"],
  },

  {
    label: "Membro de Guilda",
    value: "membro_de_guilda",
    proficiencies: [],
    trainedSkills: ["diplomacia", "enganacao", "misticismo", "oficio"],
    startingEquipment: [{ id: "gazua_ou_instrumentos", name: "Gazua ou instrumentos de ofício" }],
    grantedFeatureIds: ["general.fate.foco_em_pericia", "o_rede_de_contatos"],
  },

  {
    label: "Mercador",
    value: "mercador",
    proficiencies: [],
    trainedSkills: ["diplomacia", "intuicao", "oficio"],
    startingEquipment: [
      { id: "carroca", name: "Carroça" },
      { id: "trobo", name: "Trobo" },
      { id: "mercadorias_100", name: "Mercadorias para vender (T$ 100)" },
    ],
    grantedFeatureIds: ["o_negociacao", "general.combat.proficiencia", "general.fate.sortudo"],
  },

  {
    label: "Minerador",
    value: "minerador",
    proficiencies: [],
    trainedSkills: ["atletismo", "fortitude", "oficio_minerador"],
    startingEquipment: [
      { id: "gemas_100", name: "Gemas preciosas (T$ 100)" },
      { id: "picareta", name: "Picareta" },
    ],
    grantedFeatureIds: ["general.combat.ataque_poderoso", "o_escavador", "general.fate.sentidos_agucados"],
  },

  {
    label: "Nômade",
    value: "nomade",
    proficiencies: [],
    trainedSkills: ["cavalgar", "pilotagem", "sobrevivencia"],
    startingEquipment: [
      { id: "bordao", name: "Bordão" },
      { id: "equipamento_viagem", name: "Equipamento de viagem" },
    ],
    grantedFeatureIds: ["general.fate.lobo_solitario", "o_mochileiro", "general.fate.sentidos_agucados"],
  },

  {
    label: "Pivete",
    value: "pivete",
    proficiencies: [],
    trainedSkills: ["furtividade", "iniciativa", "ladinagem"],
    startingEquipment: [
      { id: "gazua", name: "Gazua" },
      { id: "traje_plebeu", name: "Traje de plebeu" },
      { id: "animal_urbano", name: "Animal urbano (ex.: cão, gato, rato ou pombo)" },
    ],
    grantedFeatureIds: ["general.fate.acrobatico", "general.fate.aparencia_inofensiva", "o_quebra_galho"],
  },

  {
    label: "Refugiado",
    value: "refugiado",
    proficiencies: [],
    trainedSkills: ["fortitude", "reflexos", "vontade"],
    startingEquipment: [{ id: "item_estrangeiro_100", name: "Um item estrangeiro de até T$ 100" }],
    grantedFeatureIds: ["o_estoico", "general.fate.vontade_de_ferro"],
  },

  {
    label: "Seguidor",
    value: "seguidor",
    proficiencies: [],
    trainedSkills: ["adestramento", "oficio"],
    startingEquipment: [{ id: "item_mestre_100", name: "Um item recebido de seu mestre de até T$ 100" }],
    grantedFeatureIds: ["o_antigo_mestre", "general.combat.proficiencia", "general.fate.surto_heroico"],
  },

  {
    label: "Selvagem",
    value: "selvagem",
    proficiencies: [],
    trainedSkills: ["percepcao", "reflexos", "sobrevivencia"],
    startingEquipment: [
      { id: "arma_simples", name: "Uma arma simples" },
      { id: "animal_estimacao_pequeno", name: "Pequeno animal de estimação (ex.: pássaro ou esquilo)" },
    ],
    grantedFeatureIds: ["general.fate.lobo_solitario", "o_vida_rustica", "general.combat.vitalidade"],
  },

  {
    label: "Soldado",
    value: "soldado",
    proficiencies: [],
    trainedSkills: ["fortitude", "guerra", "luta", "pontaria"],
    startingEquipment: [
      { id: "arma_marcial", name: "Uma arma marcial" },
      { id: "uniforme_militar", name: "Uniforme militar" },
      { id: "insignia_exercito", name: "Insígnia de seu exército" },
    ],
    grantedFeatureIds: ["o_influencia_militar", "o_poder_combate_escolha"],
  },

  {
    label: "Taverneiro",
    value: "taverneiro",
    proficiencies: [],
    trainedSkills: ["diplomacia", "jogatina", "oficio_cozinheiro"],
    startingEquipment: [
      { id: "arma_improvisada_clava", name: "Rolo de macarrão ou martelo de carne (como clava)" },
      { id: "panela", name: "Panela" },
      { id: "avental", name: "Avental" },
      { id: "caneca", name: "Caneca" },
      { id: "pano_sujo", name: "Pano sujo" },
    ],
    grantedFeatureIds: ["o_gororoba", "general.combat.proficiencia", "general.combat.vitalidade"],
  },

  {
    label: "Trabalhador",
    value: "trabalhador",
    proficiencies: [],
    trainedSkills: ["atletismo", "fortitude"],
    startingEquipment: [{ id: "ferramenta_pesada_escolha", name: "Uma ferramenta pesada (como maça ou lança — escolha)" }],
    grantedFeatureIds: ["general.fate.atletico", "o_esforcado"],
  },
];
