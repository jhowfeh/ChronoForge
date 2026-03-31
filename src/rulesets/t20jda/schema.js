import { defineAsyncComponent, markRaw } from 'vue'
import T20SheetView from './view/SheetView.vue'
import {buildCatalog} from './catalog'

export default {
  id: 't20',
  label: 'Tormenta 20 (Jogo do Ano)',

  catalog: buildCatalog(),

  getSheetChar(char){
    return {
      // =========================
      // Campos padrão de identificação e descrição
      // =========================
      id            : char.id,
      systemId      : char.systemId,

      name          : char.name,
      playerName    : char.playerName,
      description   : char.description || '',
      image         : char.image || '',
      
      // =========================
      // Header Info
      // =========================
      level         : char.level || 1,
      experience    : char.experience || '',
      
      race          : char.race || '',
      origin        : char.origin || '',
      class         : char.class || '',

      background    : char.background || '',
      alignment     : char.alignment || '',
      deity         : char.deity || '',
      age           : char.age || '',
      size          : char.size || '',
      speed         : char.speed || '',

      senses        : char.vision || '',

      // =========================
      // Attrubutes
      // =========================
      str           : char.str || 0,
      dex           : char.dex || 0,
      con           : char.con || 0,
      int           : char.int || 0,
      wis           : char.wis || 0,
      cha           : char.cha || 0,

      // =========================
      // Skills
      // =========================
      acrobatics      : char.acrobatics || false,
      animal_handling : char.animal_handling || false,
      athletics       : char.athletics || false,
      performance     : char.performance || false,
      riding          : char.riding || false,
      knowledge       : char.knowledge || false,
      healing         : char.healing || false,
      diplomacy       : char.diplomacy || false,
      deception       : char.deception || false,
      fortitude       : char.fortitude || false,
      stealth         : char.stealth || false,
      warfare         : char.warfare || false,
      initiative      : char.initiative || false,
      intimidation    : char.intimidation || false,
      insight         : char.insight || false,
      investigation   : char.investigation || false,
      gambling        : char.gambling || false,
      sleight_of_hand : char.sleight_of_hand || false,
      melee           : char.melee || false,
      mysticism       : char.mysticism || false,
      nobility        : char.nobility || false,
      craft           : char.craft || false,
      perception      : char.perception || false,
      piloting        : char.piloting || false,
      ranged          : char.ranged || false,
      reflexes        : char.reflexes || false,
      religion        : char.religion || false,
      survival        : char.survival || false,
      will            : char.will || false,

      // =========================
      // Advancements
      // =========================
      /**
       * Registro das escolhas de progressão por nível.
       *
       * Cada nível contém uma lista de entradas com:
       * - slotId: qual slot de advancement gerou a escolha
       * - choiceId: qual opção foi escolhida
       * - kind/tag: metadados para identificar a origem e o tipo da escolha
       *
       * Os slots válidos e suas regras ficam em schema.advancements.
       * Esta estrutura guarda apenas o resultado das escolhas do personagem.
       */
      advancements: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        12: [],
        13: [],
        14: [],
        15: [],
        16: [],
        17: [],
        18: [],
        19: [],
        20: [],
      },
    }
  },

  senseOptions: [
    // { value: 'normal', label: 'Normal' },
    { value: 'darkvision' , label: 'Visão no Escuro' },
    { value: 'lowlight'   , label: 'Visão em Baixa Luz' },
    // { value: 'tremorsense', label: 'Tremorsense' },
    // { value: 'truesight', label: 'Visão Verdadeira' },
  ],

  advancements: {
    powers: [
      {
        id: 't20:slot:power',
        label: 'Poder do Nível',
        levels: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        pick: 1,
        sources: [
          { kind: 'feature', tag: 'classPower' },
          { kind: 'feature', tag: 'generalPower' },
          { kind: 'feature', tag: 'racePower' },
          // { kind: 'feature', tag: 'distinctionPower' },
        ]
      }
    ]
  },

  // =========================
  // REGRAS E FÓRMULAS (JdA)
  // =========================
  rules: {
    baseDefense: 10,

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
     * Defesa
     */
    defense: (ctx) => {
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


  // =========================
  // UI E COMPONENTES
  // =========================
  sheetComponent: markRaw(T20SheetView)
}