export const t20Schema = {
  id: 't20',
  label: 'Tormenta 20 (Jogo do Ano)',

  headerFields: [    
    { key: 'race',      label: 'RAÇA',            type: 'select',   span: 3,  source: 'races' },
    { key: 'origin',    label: 'ORIGEM',          type: 'select',   span: 3,  source: 'origins' },
    { key: 'class',     label: 'CLASSE',          type: 'select',   span: 3,  source: 'classes' },
    { key: 'deity',     label: 'DIVINDADE',       type: 'select',   span: 3,  source: 'deities' },
    { key: 'age',       label: 'IDADE',           type: 'number',   span: 2,},
    { key: 'size',      label: 'TAMANHO',         type: 'text',     span: 2,},
    { key: 'speed',     label: 'DESLOCAMENTO',    type: 'text',     span: 2,}
  ],


  // =========================
  // ATRIBUTOS (JdA: valor já é o bônus)
  // =========================
  attributes: [
    { key: 'str', acronym: 'FOR', label: 'Força',  },
    { key: 'dex', acronym: 'DES', label: 'Destreza',   },
    { key: 'con', acronym: 'CON', label: 'Constituição',   },
    { key: 'int', acronym: 'INT', label: 'Inteligência',   },
    { key: 'wis', acronym: 'SAB', label: 'Sabedoria',  },
    { key: 'cha', acronym: 'CAR', label: 'Carisma',  }
  ],

  // =========================
  // STATS DERIVADOS (labels)
  // =========================
  stats: [
    { key: 'hp_max', label: 'PV Máx' },
    { key: 'mp_max', label: 'PM Máx' },
    { key: 'defense', label: 'Defesa' },
    { key: 'speed', label: 'Deslocamento' },
    { key: 'carry_capacity', label: 'Limite de Carga' },
    { key: 'armor_penalty', label: 'Penalidade de Armadura' }
  ],

  // =========================
  // GRUPOS / ALIASES (para engine aplicar bônus genéricos)
  // =========================
  skillGroups: {
    // “testes de resistência” = Fortitude/Reflexos/Vontade (perícias)
    saves: ['fortitude', 'reflexes', 'will']
  },

  // =========================
  // PERÍCIAS
  // - trainedOnly conforme sua lista
  // - armorPenalty conforme sua lista
  // =========================
  skills: [
    { key: 'acrobatics',      label: 'Acrobacia',       baseAttr: 'dex', armorPenalty: true },
    { key: 'animal_handling', label: 'Adestramento',    baseAttr: 'cha', trainedOnly: true },
    { key: 'athletics',       label: 'Atletismo',       baseAttr: 'str' },
    { key: 'performance',     label: 'Atuação',         baseAttr: 'cha', trainedOnly: true },
    { key: 'riding',          label: 'Cavalgar',        baseAttr: 'dex' },
    { key: 'knowledge',       label: 'Conhecimento',    baseAttr: 'int', trainedOnly: true },
    { key: 'healing',         label: 'Cura',            baseAttr: 'wis' },
    { key: 'diplomacy',       label: 'Diplomacia',      baseAttr: 'cha' },
    { key: 'deception',       label: 'Enganação',       baseAttr: 'cha' },

    // Resistências (perícias)
    { key: 'fortitude',       label: 'Fortitude',       baseAttr: 'con', tags: ['save'] },

    { key: 'stealth',         label: 'Furtividade',     baseAttr: 'dex', armorPenalty: true },
    { key: 'warfare',         label: 'Guerra',          baseAttr: 'int', trainedOnly: true },
    { key: 'initiative',      label: 'Iniciativa',      baseAttr: 'dex' },
    { key: 'intimidation',    label: 'Intimidação',     baseAttr: 'cha' },
    { key: 'insight',         label: 'Intuição',        baseAttr: 'wis' },
    { key: 'investigation',   label: 'Investigação',    baseAttr: 'int' },
    { key: 'gambling',        label: 'Jogatina',        baseAttr: 'cha', trainedOnly: true },

    { key: 'sleight_of_hand', label: 'Ladinagem',       baseAttr: 'dex', trainedOnly: true, armorPenalty: true },

    { key: 'melee',           label: 'Luta',            baseAttr: 'str' },
    { key: 'mysticism',       label: 'Misticismo',      baseAttr: 'int', trainedOnly: true },
    { key: 'nobility',        label: 'Nobreza',         baseAttr: 'int', trainedOnly: true },

    // “Ofício” é especialização
    { key: 'craft',           label: 'Ofício',          baseAttr: 'int', trainedOnly: true, isSpecialization: true },

    { key: 'perception',      label: 'Percepção',       baseAttr: 'wis' },
    { key: 'piloting',        label: 'Pilotagem',       baseAttr: 'dex', trainedOnly: true },
    { key: 'ranged',          label: 'Pontaria',        baseAttr: 'dex' },

    { key: 'reflexes',        label: 'Reflexos',        baseAttr: 'dex', tags: ['save'] },

    { key: 'religion',        label: 'Religião',        baseAttr: 'wis', trainedOnly: true },
    { key: 'survival',        label: 'Sobrevivência',   baseAttr: 'wis' },

    { key: 'will',            label: 'Vontade',         baseAttr: 'wis', tags: ['save'] }
  ],

  // =========================
  // MODELO MÍNIMO DE EQUIPAMENTO
  // =========================
  equipmentModel: {
    slots: {
      armor: { type: 'armor', label: 'Armadura' },
      shield: { type: 'shield', label: 'Escudo' },
      weapon_main: { type: 'weapon', label: 'Arma (Principal)' },
      weapon_off: { type: 'weapon', label: 'Arma (Secundária)' }
    },

    // contrato esperado (documentação do formato)
    types: {
      armor: {
        // type: 'light' | 'medium' | 'heavy'
        // defenseBonus: number
        // skillPenalty: number  (ex.: 2 representa -2 em perícias com armorPenalty:true)
        // dexCap: number|null   (cap opcional do bônus de DEX na Defesa)
        // weight: number
      },
      shield: {
        // defenseBonus: number
        // weight: number
      },
      weapon: {
        // hands: 1|2
        // weight: number
        // category, damage, range etc. você adiciona depois
      }
    }
  },

  // =========================
  // REGRAS E FÓRMULAS (JdA)
  // =========================
  rules: {
    baseDefense: 10,

    // JdA: o atributo já é o bônus. (14 significa +14, não +2)
    attributeBonus: (value) => Number(value) || 0,

    halfLevel: (level) => Math.floor((Number(level) || 1) / 2),

    // Bônus de treino por nível (JdA)
    trainingBonusByLevel: (level) => {
      const lv = Number(level) || 1;
      if (lv >= 15) return 6;
      if (lv >= 7) return 4;
      return 2;
    },

    // Mantive sua fórmula anterior (pode ajustar depois se quiser)
    carryCapacity: (strBonus) => 10 + 2 * Math.max(0, Number(strBonus) || 0),

    // Penalidade de armadura “ativa” (para UI exibir)
    armorPenalty: (ctx) => {
      return ctx?.equipment?.armor?.skillPenalty ?? 0;
    },

    // Defesa total (JdA)
    defenseTotal: (ctx) => {
      const base = 10;

      const armor = ctx?.equipment?.armor ?? null;
      const shield = ctx?.equipment?.shield ?? null;

      const armorBonus = armor?.defenseBonus ?? 0;
      const shieldBonus = shield?.defenseBonus ?? 0;

      // JdA: DEX é bônus direto
      const dexRaw = (ctx?.schema?.rules?.attributeBonus ?? ((v) => Number(v) || 0))(
        ctx?.attributes?.dex ?? 0
      );

      // cap opcional (se você quiser modelar isso nos itens)
      const dexCap = armor?.dexCap ?? null;
      const dex = (dexCap === null || dexCap === undefined)
        ? dexRaw
        : Math.min(dexRaw, dexCap);

      const misc = ctx?.bonuses?.defense?.misc ?? 0;

      return base + armorBonus + shieldBonus + dex + misc;
    },

    // Decomposição da Defesa (pra UI)
    defenseBreakdown: (ctx) => {
      const armor = ctx?.equipment?.armor ?? null;
      const shield = ctx?.equipment?.shield ?? null;

      const armorBonus = armor?.defenseBonus ?? 0;
      const shieldBonus = shield?.defenseBonus ?? 0;

      const dexRaw = (ctx?.schema?.rules?.attributeBonus ?? ((v) => Number(v) || 0))(
        ctx?.attributes?.dex ?? 0
      );

      const dexCap = armor?.dexCap ?? null;
      const dex = (dexCap === null || dexCap === undefined)
        ? dexRaw
        : Math.min(dexRaw, dexCap);

      const misc = ctx?.bonuses?.defense?.misc ?? 0;

      return {
        base: 10,
        armor: armorBonus,
        shield: shieldBonus,
        dex,
        misc,
        total: 10 + armorBonus + shieldBonus + dex + misc
      };
    },

    // Perícia total (JdA)
    // fórmula: meia-nível + atributo (direto) + treino (+2/+4/+6) + misc - penalidade
    // retorna null se trainedOnly e não treinada (pra UI bloquear)
    skillTotal: (ctx, skillKey) => {
      const schema = ctx?.schema;
      const skill = schema?.skills?.find(s => s.key === skillKey);
      if (!skill) return 0;

      const level = Number(ctx?.level) || 1;
      const trainedSkills = ctx?.trainedSkills ?? [];
      const isTrained = trainedSkills.includes(skillKey);

      if (skill.trainedOnly && !isTrained) return null;

      const halfLevel = schema.rules.halfLevel(level);

      const attrBonus = schema.rules.attributeBonus(
        ctx?.attributes?.[skill.baseAttr] ?? 0
      );

      const training = isTrained ? schema.rules.trainingBonusByLevel(level) : 0;

      const armorPenaltyValue = ctx?.equipment?.armor?.skillPenalty ?? 0;
      const armorPenalty = skill.armorPenalty ? armorPenaltyValue : 0;

      // bônus diversos vindos de traits/itens/condições
      const misc = (ctx?.bonuses?.skills?.[skillKey] ?? 0);

      return halfLevel + attrBonus + training + misc - armorPenalty;
    },

    skillBreakdown: (ctx, skillKey) => {
      const schema = ctx?.schema;
      const skill = schema?.skills?.find(s => s.key === skillKey);
      if (!skill) {
        return { ok: true, parts: [], total: 0 };
      }

      const level = Number(ctx?.level) || 1;

      // Treinamento armazenado no personagem
      const entry =
        ctx?.training?.skills?.[skillKey] ||
        ctx?.sheet?.training?.skills?.[skillKey] ||
        { trained: false, misc: 0, attr: null };

      const isTrained = !!entry.trained;

      // trainedOnly
      if (skill.trainedOnly && !isTrained) {
        return {
          ok: false,
          parts: [],
          total: null
        };
      }

      const halfLevel = schema.rules.halfLevel(level);

      // atributo (permite override)
      const attrKey = entry.attr || skill.baseAttr;

      const rawAttr =
        ctx?.attributes?.base?.[attrKey] ??
        ctx?.attributes?.[attrKey] ??
        0;

      const attrMod = schema.rules.attributeBonus(rawAttr);

      const trainingBonus = isTrained
        ? schema.rules.trainingBonusByLevel(level)
        : 0;

      const armorPenaltyValue =
        ctx?.equipment?.armor?.skillPenalty ?? 0;

      const armorPenalty = skill.armorPenalty
        ? armorPenaltyValue
        : 0;

      const misc = Number(entry.misc || 0);

      const parts = [
        { key: 'half', label: 'Grad.', value: halfLevel },
        { key: 'attr', label: attrKey.toUpperCase(), value: attrMod },
        { key: 'training', label: 'Treino', value: trainingBonus },
        { key: 'misc', label: 'Outros', value: misc },
      ];

      if (armorPenalty) {
        parts.push({ key: 'armor', label: 'Armadura', value: -armorPenalty });
      }

      const total =
        halfLevel +
        attrMod +
        trainingBonus +
        misc -
        armorPenalty;

      return {
        ok: true,
        attrKey,
        parts,
        total
      };
    },

  }
};
