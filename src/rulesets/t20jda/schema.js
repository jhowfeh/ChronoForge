
export const t20Schema = {
  id: 't20',
  label: 'Tormenta 20 (Jogo do Ano)',

  /**
   * =========================
   * DEFAULTS DO SISTEMA
   * =========================
   * Usado por createEmptyCharacter:
   * - attributeBase: valor inicial de cada atributo na criação
   * - attributeMethod: como os atributos foram gerados (info para UI)
   */
  defaults: {
    attributeBase: 0,          // T20 JdA: atributo é bônus direto (começa em 0)
    attributeMethod: 'manual'  // 'manual' | 'pointBuy' | 'array' | 'roll'
  },

  /**
   * Campos do cabeçalho (sua UI dinâmica)
   */
  headerFields: [
    { key: 'race',   label: 'RAÇA',         type: 'select', source: 'races' },
    { key: 'origin', label: 'ORIGEM',       type: 'select', source: 'origins' },
    { key: 'class',  label: 'CLASSE',       type: 'select', source: 'classes' },
    { key: 'deity',  label: 'DIVINDADE',    type: 'select', source: 'deities' },
    { key: 'age',    label: 'IDADE',        type: 'number'},
    { key: 'size',   label: 'TAMANHO',      type: 'text'},
    { key: 'speed',  label: 'DESLOCAMENTO', type: 'text'}
  ],

  // =========================
  // ATRIBUTOS (JdA: valor já é o bônus)
  // =========================
  attributes: [
    { key: 'str', acronym: 'FOR', label: 'Força' },
    { key: 'dex', acronym: 'DES', label: 'Destreza' },
    { key: 'con', acronym: 'CON', label: 'Constituição' },
    { key: 'int', acronym: 'INT', label: 'Inteligência' },
    { key: 'wis', acronym: 'SAB', label: 'Sabedoria' },
    { key: 'cha', acronym: 'CAR', label: 'Carisma' }
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
  // GRUPOS / ALIASES
  // =========================
  flags: {
    savesAsSkills: true
  },
  skillGroups: {
    saves: ['fortitude', 'reflexes', 'will']
  },

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

    /**
     * JdA: o atributo já é o bônus direto.
     */
    attributeBonus: (value) => Number(value) || 0,

    halfLevel: (level) => Math.floor((Number(level) || 1) / 2),

    /**
     * Bônus de treino por nível (JdA)
     */
    trainingBonusByLevel: (level) => {
      const lv = Number(level) || 1
      if (lv >= 15) return 6
      if (lv >= 7) return 4
      return 2
    },

    /**
     * Mantive sua fórmula (pode ajustar depois).
     */
    carryCapacity: (strBonus) => 10 + 2 * Math.max(0, Number(strBonus) || 0),

    /**
     * ==========================================================
     * 🔥 NOVO: Resolver de atributo "atual" (base + avanços)
     * ==========================================================
     *
     * Este helper permite que regras usem SEMPRE a mesma origem:
     *
     * sheet.attributes.creation.base       -> escolhido na criação
     * sheet.attributes.advancement.increases -> aumentos permanentes (ex.: poder de classe +1)
     * sheet.attributes.misc               -> bônus “soltos” (opcional)
     * sheet.attributes.temp               -> bônus temporários (opcional)
     *
     * Além disso, mantém compat com formatos legados:
     * - ctx.attributes.dex
     * - ctx.attributes.base.dex
     */
    getAttr: (ctx, attrKey) => {
      const n = (v) => Number(v) || 0

      // ✅ novo modelo (canônico)
      const creation = ctx?.sheet?.attributes?.creation?.base?.[attrKey]
      const adv = ctx?.sheet?.attributes?.advancement?.increases?.[attrKey]
      const misc = ctx?.sheet?.attributes?.misc?.[attrKey]
      const temp = ctx?.sheet?.attributes?.temp?.[attrKey]

      const hasNew =
        creation !== undefined || adv !== undefined || misc !== undefined || temp !== undefined

      if (hasNew) {
        return n(creation) + n(adv) + n(misc) + n(temp)
      }

      // ♻️ compat legado
      const legacy1 = ctx?.attributes?.[attrKey]
      const legacy2 = ctx?.attributes?.base?.[attrKey]
      return n(legacy1 ?? legacy2 ?? 0)
    },

    /**
     * Penalidade de armadura “ativa” (para UI exibir)
     */
    armorPenalty: (ctx) => {
      return ctx?.equipment?.armor?.skillPenalty ?? 0
    },

    /**
     * Defesa total (JdA)
     *
     * Agora usa getAttr(ctx,'dex') para suportar:
     * - criação + avanços (+1 por poderes de classe)
     */
    defenseTotal: (ctx) => {
      const base = 10

      const armor = ctx?.equipment?.armor ?? null
      const shield = ctx?.equipment?.shield ?? null

      const armorBonus = armor?.defenseBonus ?? 0
      const shieldBonus = shield?.defenseBonus ?? 0

      const dexRaw = (ctx?.schema?.rules?.attributeBonus ?? ((v) => Number(v) || 0))(
        ctx?.schema?.rules?.getAttr?.(ctx, 'dex') ?? 0
      )

      const dexCap = armor?.dexCap ?? null
      const dex = (dexCap === null || dexCap === undefined)
        ? dexRaw
        : Math.min(dexRaw, dexCap)

      const misc = ctx?.bonuses?.defense?.misc ?? 0

      return base + armorBonus + shieldBonus + dex + misc
    },

    /**
     * Decomposição da Defesa (pra UI)
     */
    defenseBreakdown: (ctx) => {
      const armor = ctx?.equipment?.armor ?? null
      const shield = ctx?.equipment?.shield ?? null

      const armorBonus = armor?.defenseBonus ?? 0
      const shieldBonus = shield?.defenseBonus ?? 0

      const dexRaw = (ctx?.schema?.rules?.attributeBonus ?? ((v) => Number(v) || 0))(
        ctx?.schema?.rules?.getAttr?.(ctx, 'dex') ?? 0
      )

      const dexCap = armor?.dexCap ?? null
      const dex = (dexCap === null || dexCap === undefined)
        ? dexRaw
        : Math.min(dexRaw, dexCap)

      const misc = ctx?.bonuses?.defense?.misc ?? 0

      return {
        base: 10,
        armor: armorBonus,
        shield: shieldBonus,
        dex,
        misc,
        total: 10 + armorBonus + shieldBonus + dex + misc
      }
    },

    /**
     * Perícia total (JdA)
     *
     * fórmula: meia-nível + atributo (direto) + treino (+2/+4/+6) + misc - penalidade
     * retorna null se trainedOnly e não treinada
     */
    skillTotal: (ctx, skillKey) => {
      const schema = ctx?.schema
      const skill = schema?.skills?.find(s => s.key === skillKey)
      if (!skill) return 0

      const level = Number(ctx?.level) || 1
      const trainedSkills = ctx?.trainedSkills ?? []
      const isTrained = trainedSkills.includes(skillKey)

      if (skill.trainedOnly && !isTrained) return null

      const halfLevel = schema.rules.halfLevel(level)

      // ✅ usa o atributo atual via getAttr
      const rawAttr = schema.rules.getAttr(ctx, skill.baseAttr)
      const attrBonus = schema.rules.attributeBonus(rawAttr)

      const training = isTrained ? schema.rules.trainingBonusByLevel(level) : 0

      const armorPenaltyValue = ctx?.equipment?.armor?.skillPenalty ?? 0
      const armorPenalty = skill.armorPenalty ? armorPenaltyValue : 0

      const misc = (ctx?.bonuses?.skills?.[skillKey] ?? 0)

      return halfLevel + attrBonus + training + misc - armorPenalty
    },

    /**
     * Breakdown detalhado (UI)
     *
     * Mantém compat com formatos de training:
     * - boolean legacy: sheet.training.skills[skillKey] = true/false
     * - objeto: { trained, misc, attr }
     */
    skillBreakdown: (ctx, skillKey) => {
      const schema = ctx?.schema
      const skill = schema?.skills?.find(s => s.key === skillKey)
      if (!skill) {
        return { ok: true, parts: [], total: 0 }
      }

      const level = Number(ctx?.level) || 1

      // Treinamento armazenado no personagem (novo/legacy)
      const rawEntry =
        ctx?.training?.skills?.[skillKey] ??
        ctx?.sheet?.training?.skills?.[skillKey] ??
        false

      const entry = (typeof rawEntry === 'object' && rawEntry !== null)
        ? rawEntry
        : { trained: !!rawEntry, misc: 0, attr: null }

      const isTrained = !!entry.trained

      if (skill.trainedOnly && !isTrained) {
        return { ok: false, parts: [], total: null }
      }

      const halfLevel = schema.rules.halfLevel(level)

      // atributo (permite override por entry.attr)
      const attrKey = entry.attr || skill.baseAttr

      const rawAttr = schema.rules.getAttr(ctx, attrKey)
      const attrMod = schema.rules.attributeBonus(rawAttr)

      const trainingBonus = isTrained
        ? schema.rules.trainingBonusByLevel(level)
        : 0

      const armorPenaltyValue = ctx?.equipment?.armor?.skillPenalty ?? 0
      const armorPenalty = skill.armorPenalty ? armorPenaltyValue : 0

      const misc = Number(entry.misc || 0)

      const parts = [
        { key: 'half', label: 'Grad.', value: halfLevel },
        { key: 'attr', label: attrKey.toUpperCase(), value: attrMod },
        { key: 'training', label: 'Treino', value: trainingBonus },
        { key: 'misc', label: 'Outros', value: misc }
      ]

      if (armorPenalty) {
        parts.push({ key: 'armor', label: 'Armadura', value: -armorPenalty })
      }

      const total = halfLevel + attrMod + trainingBonus + misc - armorPenalty

      return {
        ok: true,
        attrKey,
        parts,
        total
      }
    }
  },

  advancement: {
    slots: [
      {
        id: 't20:slot:power',
        label: 'Poder do Nível',
        levels: [2,4,6,8,10,12,14,16,18,20],
        pick: 1,
        sources: [
          { kind: 'feature', tag: 'classPower' },
          { kind: 'feature', tag: 'generalPower' },
          // futuro:
          // { kind: 'feature', tag: 'racePower' },
          // { kind: 'feature', tag: 'distinctionPower' },
        ]
      }
    ]
  }
}