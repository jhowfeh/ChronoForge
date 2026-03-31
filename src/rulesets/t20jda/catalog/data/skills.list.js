// src/rulesets/t20/data/skills.list.js
export const skills = [
  { key: 'acrobatics',      label: 'Acrobacia',     baseAttr: 'dex', armorPenalty: true },
  { key: 'animal_handling', label: 'Adestramento',  baseAttr: 'cha', trainedOnly: true },
  { key: 'athletics',       label: 'Atletismo',     baseAttr: 'str' },
  { key: 'performance',     label: 'Atuação',       baseAttr: 'cha', trainedOnly: true },
  { key: 'riding',          label: 'Cavalgar',      baseAttr: 'dex' },
  { key: 'knowledge',       label: 'Conhecimento',  baseAttr: 'int', trainedOnly: true },
  { key: 'healing',         label: 'Cura',          baseAttr: 'wis' },
  { key: 'diplomacy',       label: 'Diplomacia',    baseAttr: 'cha' },
  { key: 'deception',       label: 'Enganação',     baseAttr: 'cha' },

  { key: 'fortitude',       label: 'Fortitude',     baseAttr: 'con', tags: ['save'] },

  { key: 'stealth',         label: 'Furtividade',   baseAttr: 'dex', armorPenalty: true },
  { key: 'warfare',         label: 'Guerra',        baseAttr: 'int', trainedOnly: true },
  { key: 'initiative',      label: 'Iniciativa',    baseAttr: 'dex' },
  { key: 'intimidation',    label: 'Intimidação',   baseAttr: 'cha' },
  { key: 'insight',         label: 'Intuição',      baseAttr: 'wis' },
  { key: 'investigation',   label: 'Investigação',  baseAttr: 'int' },
  { key: 'gambling',        label: 'Jogatina',      baseAttr: 'cha', trainedOnly: true },

  { key: 'sleight_of_hand', label: 'Ladinagem',     baseAttr: 'dex', trainedOnly: true, armorPenalty: true },

  { key: 'melee',           label: 'Luta',          baseAttr: 'str' },
  { key: 'mysticism',       label: 'Misticismo',    baseAttr: 'int', trainedOnly: true },
  { key: 'nobility',        label: 'Nobreza',       baseAttr: 'int', trainedOnly: true },

  { key: 'craft',           label: 'Ofício',        baseAttr: 'int', trainedOnly: true, isSpecialization: true },

  { key: 'perception',      label: 'Percepção',     baseAttr: 'wis' },
  { key: 'piloting',        label: 'Pilotagem',     baseAttr: 'dex', trainedOnly: true },
  { key: 'ranged',          label: 'Pontaria',      baseAttr: 'dex' },

  { key: 'reflexes',        label: 'Reflexos',      baseAttr: 'dex', tags: ['save'] },

  { key: 'religion',        label: 'Religião',      baseAttr: 'wis', trainedOnly: true },
  { key: 'survival',        label: 'Sobrevivência', baseAttr: 'wis' },

  { key: 'will',            label: 'Vontade',       baseAttr: 'wis', tags: ['save'] }
]