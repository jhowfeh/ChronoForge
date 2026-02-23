// src/modules/CharSheetT20/services/features/racial.js
import { makeFeature, FeatureKind } from './feats/_schema'

export const racialFeatures = [
  makeFeature({
  "id": "r_humano_attr",
  "name": "+1 em Três Atributos Diferentes",
  "choiceRules": [
    {
      "key": "humano_attr_3",
      "type": "PICK_ATTRS",
      "count": 3,
      "distinct": true,
      "amountEach": 1
    }
  ],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "$choice": "humano_attr_3"
      },
      "meta": {
        "points": 3,
        "distinct": true,
        "amountEach": 1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "humano"
  },
  "text": "Escolha três atributos diferentes para receber +1 em cada.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_humano_versatil",
  "name": "Versátil",
  "choiceRules": [
    {
      "key": "humano_skills",
      "type": "PICK",
      "from": "skills",
      "count": 2,
      "unique": true
    },
    {
      "key": "humano_trade_power",
      "type": "BOOLEAN",
      "default": false
    },
    {
      "key": "humano_general_power",
      "type": "PICK",
      "from": "generalPowers",
      "count": 1,
      "enabledWhen": {
        "key": "humano_trade_power",
        "op": "==",
        "value": true
      }
    }
  ],
  "effects": [
    {
      "type": "SKILL_TRAINING",
      "skills": {
        "$choice": "humano_skills"
      }
    },
    {
      "type": "POWER_GRANT",
      "power": {
        "$choice": "humano_general_power"
      },
      "when": {
        "key": "humano_trade_power",
        "op": "==",
        "value": true
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "humano"
  },
  "text": "Você se torna treinado em duas perícias à sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral à sua escolha.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_humano_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "humano"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_humano_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "humano"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_humano_vision",
  "name": "Visão",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "NORMAL"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "humano"
  },
  "text": "Sua visão é Normal.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_anao_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "con": 2,
        "sab": 1,
        "des": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "anao"
  },
  "text": "Constituição +2, Sabedoria +1, Destreza -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_anao_vision",
  "name": "Visão no Escuro",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "DARKVISION"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "anao"
  },
  "text": "Você enxerga no escuro.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_anao_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 6
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "anao"
  },
  "text": "Seu deslocamento é 6m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_anao_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "anao"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_anao_rochas",
  "name": "Conhecimento das Rochas",
  "choiceRules": [],
  "effects": [
    {
      "type": "SKILL_BONUS",
      "skill": "percepcao",
      "bonus": 2,
      "condition": {
        "environment": "subterraneo"
      }
    },
    {
      "type": "SKILL_BONUS",
      "skill": "sobrevivencia",
      "bonus": 2,
      "condition": {
        "environment": "subterraneo"
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "anao"
  },
  "text": "+2 em testes de Percepção e Sobrevivência realizados no subterrâneo.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_anao_devagar",
  "name": "Devagar e Sempre",
  "choiceRules": [],
  "effects": [
    {
      "type": "IGNORE_PENALTY",
      "penalty": "speed_from_armor"
    },
    {
      "type": "IGNORE_PENALTY",
      "penalty": "speed_from_encumbrance"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "anao"
  },
  "text": "Seu deslocamento não é reduzido por uso de armadura ou excesso de carga.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_anao_hp",
  "name": "Duro como Pedra",
  "choiceRules": [],
  "effects": [
    {
      "type": "HP_PER_LEVEL",
      "baseAtLevel1": 3,
      "perLevelAfter": 1
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "anao"
  },
  "text": "+3 PV no 1º nível e +1 PV por nível seguinte.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_anao_heredrimm",
  "name": "Tradição de Heredrimm",
  "choiceRules": [],
  "effects": [
    {
      "type": "WEAPON_GROUP_TREAT_AS_SIMPLE",
      "groups": [
        "machado",
        "martelo",
        "marreta",
        "picareta"
      ]
    },
    {
      "type": "ATTACK_BONUS",
      "weaponGroups": [
        "machado",
        "martelo",
        "marreta",
        "picareta"
      ],
      "bonus": 2
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "anao"
  },
  "text": "Machados, martelos, marretas e picaretas são armas simples para você. +2 em ataques com essas armas.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_dahllan_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "sab": 2,
        "des": 1,
        "int": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "dahllan"
  },
  "text": "Sabedoria +2, Destreza +1, Inteligência -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_dahllan_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "dahllan"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_dahllan_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "dahllan"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_dahllan_vision",
  "name": "Visão",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "NORMAL"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "dahllan"
  },
  "text": "Sua visão é Normal.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_dahllan_amiga_plantas",
  "name": "Amiga das Plantas",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPELL_GRANT",
      "spell": {
        "id": "controlar_plantas"
      },
      "keyAttribute": "sab",
      "costMod": -1,
      "costModCondition": {
        "ifLearnAgain": true
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "dahllan"
  },
  "text": "Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria). Se aprender novamente, custo –1 PM.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_dahllan_armadura_allihanna",
  "name": "Armadura de Allihanna",
  "choiceRules": [],
  "effects": [
    {
      "type": "ACTION_ABILITY",
      "action": "move",
      "cost": {
        "pm": 1
      },
      "apply": [
        {
          "type": "DEFENSE_BONUS",
          "bonus": 2,
          "duration": "scene_end"
        }
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "dahllan"
  },
  "text": "Gaste ação de movimento e 1 PM para receber +2 na Defesa até o fim da cena.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_dahllan_empatia",
  "name": "Empatia Selvagem",
  "choiceRules": [],
  "effects": [
    {
      "type": "FEATURE_FLAG",
      "flag": "animal_empathy"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "dahllan"
  },
  "text": "Você pode se comunicar com animais por linguagem corporal e vocalizações. Pode usar Adestramento para mudar atitude e persuasão.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_elfo_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "int": 2,
        "des": 1,
        "con": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "elfo"
  },
  "text": "Inteligência +2, Destreza +1, Constituição -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_elfo_speed",
  "name": "Graça de Glórienn",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 12
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "elfo"
  },
  "text": "Seu deslocamento é 12m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_elfo_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "elfo"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_elfo_vision",
  "name": "Visão na Penumbra",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "LOW_LIGHT"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "elfo"
  },
  "text": "Você enxerga melhor na penumbra.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_elfo_mp",
  "name": "Sangue Mágico",
  "choiceRules": [],
  "effects": [
    {
      "type": "MP_PER_LEVEL",
      "perLevel": 1
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "elfo"
  },
  "text": "+1 PM por nível.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_elfo_sentidos",
  "name": "Sentidos Élficos",
  "choiceRules": [],
  "effects": [
    {
      "type": "SKILL_BONUS",
      "skill": "misticismo",
      "bonus": 2
    },
    {
      "type": "SKILL_BONUS",
      "skill": "percepcao",
      "bonus": 2
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "elfo"
  },
  "text": "+2 em Misticismo e Percepção.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_goblin_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "des": 2,
        "int": 1,
        "car": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "goblin"
  },
  "text": "Destreza +2, Inteligência +1, Carisma -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_goblin_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "S"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "goblin"
  },
  "text": "Seu tamanho é Pequeno.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_goblin_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "goblin"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_goblin_vision",
  "name": "Visão no Escuro",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "DARKVISION"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "goblin"
  },
  "text": "Você enxerga no escuro.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_goblin_engenhoso",
  "name": "Engenhoso",
  "choiceRules": [],
  "effects": [
    {
      "type": "FEATURE_FLAG",
      "flag": "tool_bonus_logic"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "goblin"
  },
  "text": "Você não sofre penalidades em testes de perícia por não usar ferramentas. Se usar a ferramenta necessária, recebe +2.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_goblin_espelunqueiro",
  "name": "Espelunqueiro",
  "choiceRules": [],
  "effects": [
    {
      "type": "CLIMB_SPEED_EQUALS_WALK"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "goblin"
  },
  "text": "Deslocamento de escalada igual ao deslocamento terrestre.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_goblin_rato_ruas",
  "name": "Rato das Ruas",
  "choiceRules": [],
  "effects": [
    {
      "type": "SKILL_BONUS",
      "skill": "fortitude",
      "bonus": 2
    },
    {
      "type": "RECOVERY_MINIMUM_EQUALS_LEVEL",
      "resources": [
        "pv",
        "pm"
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "goblin"
  },
  "text": "+2 em Fortitude. Recuperação mínima de PV/PM igual ao nível.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_lefou_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [
    {
      "key": "lefou_attr_3_no_car",
      "type": "PICK_ATTRS",
      "count": 3,
      "distinct": true,
      "amountEach": 1,
      "exclude": [
        "car"
      ]
    }
  ],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "$choice": "lefou_attr_3_no_car"
      },
      "meta": {
        "points": 3,
        "distinct": true,
        "amountEach": 1,
        "exclude": [
          "car"
        ]
      }
    },
    {
      "type": "ATTR_MOD",
      "values": {
        "car": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "lefou"
  },
  "text": "+1 em três atributos diferentes (exceto Carisma) e Carisma -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_lefou_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "lefou"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_lefou_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "lefou"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_lefou_vision",
  "name": "Visão",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "NORMAL"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "lefou"
  },
  "text": "Sua visão é Normal.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_lefou_cria_tormenta",
  "name": "Cria da Tormenta",
  "choiceRules": [],
  "effects": [
    {
      "type": "SAVE_BONUS",
      "vs": "tormenta_effects",
      "bonus": 5
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "lefou"
  },
  "text": "+5 em testes de resistência contra efeitos da Tormenta.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_lefou_deformidade",
  "name": "Deformidade",
  "choiceRules": [
    {
      "key": "lefou_skills_2",
      "type": "PICK",
      "from": "skills",
      "count": 2,
      "unique": true
    }
  ],
  "effects": [
    {
      "type": "SKILL_BONUS",
      "skills": {
        "$choice": "lefou_skills_2"
      },
      "bonus": 2
    },
    {
      "type": "TAG_GRANT",
      "tags": [
        {
          "type": "counts_as",
          "value": "poder_tormenta"
        }
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "lefou"
  },
  "text": "Recebe +2 em duas perícias à escolha. Cada bônus conta como um poder da Tormenta.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_minotauro_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "for": 2,
        "con": 1,
        "sab": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "minotauro"
  },
  "text": "Força +2, Constituição +1, Sabedoria -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_minotauro_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "minotauro"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_minotauro_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "L"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "minotauro"
  },
  "text": "Seu tamanho é Grande.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_minotauro_vision",
  "name": "Visão",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "NORMAL"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "minotauro"
  },
  "text": "Sua visão é Normal.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_minotauro_chifres",
  "name": "Chifres",
  "choiceRules": [],
  "effects": [
    {
      "type": "NATURAL_WEAPON_GRANT",
      "weapon": {
        "name": "Chifres",
        "damage": "1d6",
        "crit": "x2",
        "damageType": "perfuracao"
      }
    },
    {
      "type": "SPECIAL_ATTACK",
      "name": "Investida com Chifres",
      "cost": {
        "pm": 1
      },
      "limit": {
        "per": "round",
        "count": 1
      },
      "description": "Ao usar ação agredir com outra arma, pode gastar 1 PM para um ataque corpo a corpo extra com chifres."
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "minotauro"
  },
  "text": "Você possui uma arma natural (chifres) e pode fazer uma investida especial.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_minotauro_couro",
  "name": "Couro Rígido",
  "choiceRules": [],
  "effects": [
    {
      "type": "DEFENSE_BONUS",
      "bonus": 1
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "minotauro"
  },
  "text": "+1 na Defesa.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_minotauro_faro",
  "name": "Faro",
  "choiceRules": [],
  "effects": [
    {
      "type": "FEATURE_FLAG",
      "flag": "no_flatfooted_adjacent_unseen"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "minotauro"
  },
  "text": "Você não fica desprevenido contra criaturas adjacentes que não consegue ver.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_minotauro_medo_altura",
  "name": "Medo de Altura",
  "choiceRules": [],
  "effects": [
    {
      "type": "CONDITION_TRIGGER",
      "trigger": "adjacent_drop_3m",
      "applyCondition": "abalado"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "minotauro"
  },
  "text": "Quando estiver adjacente a uma queda de 3m ou mais, fica abalado.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_qareen_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "car": 2,
        "int": 1,
        "sab": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "qareen"
  },
  "text": "Carisma +2, Inteligência +1, Sabedoria -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_qareen_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "qareen"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_qareen_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "qareen"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_qareen_vision",
  "name": "Visão",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "NORMAL"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "qareen"
  },
  "text": "Sua visão é Normal.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_qareen_desejos",
  "name": "Desejos",
  "choiceRules": [],
  "effects": [
    {
      "type": "FEATURE_FLAG",
      "flag": "spell_cost_reduction_when_requested"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "qareen"
  },
  "text": "Você lança magias com redução de custo em circunstâncias específicas (regra do Desejos).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_qareen_resistencia_elemental",
  "name": "Resistência Elemental",
  "choiceRules": [
    {
      "key": "qareen_element",
      "type": "PICK",
      "from": "damageTypesElemental",
      "count": 1
    }
  ],
  "effects": [
    {
      "type": "RESISTANCE_GRANT",
      "amount": 10,
      "damageType": {
        "$choice": "qareen_element"
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "qareen"
  },
  "text": "Redução 10 a um tipo de dano elemental à escolha.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_qareen_tatuagem_mistica",
  "name": "Tatuagem Mística",
  "choiceRules": [
    {
      "key": "qareen_spell_1",
      "type": "PICK",
      "from": "spells_circle_1",
      "count": 1
    }
  ],
  "effects": [
    {
      "type": "SPELL_GRANT",
      "spell": {
        "$choice": "qareen_spell_1"
      },
      "circle": 1,
      "keyAttribute": "car"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "qareen"
  },
  "text": "Pode lançar uma magia de 1º círculo à escolha (atributo-chave Carisma).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_golem_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "for": 2,
        "con": 1,
        "car": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "golem"
  },
  "text": "Força +2, Constituição +1, Carisma -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_golem_chassi",
  "name": "Chassi",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 6
    },
    {
      "type": "IGNORE_PENALTY",
      "penalty": "speed_from_armor"
    },
    {
      "type": "IGNORE_PENALTY",
      "penalty": "speed_from_encumbrance"
    },
    {
      "type": "DEFENSE_BONUS",
      "bonus": 2
    },
    {
      "type": "ARMOR_PENALTY_SET",
      "penalty": -2
    },
    {
      "type": "ARMOR_DONDOFF_TIME",
      "days": 1
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "armor_does_not_count_item_limit"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "golem"
  },
  "text": "Deslocamento 6m, não reduzido por armadura/carga. +2 Defesa, penalidade de armadura -2. Leva 1 dia para vestir/remover armadura (acoplada, não conta no limite de itens).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_golem_criatura_artificial",
  "name": "Criatura Artificial",
  "choiceRules": [],
  "effects": [
    {
      "type": "CREATURE_TYPE_SET",
      "creatureType": "construto"
    },
    {
      "type": "VISION_SET",
      "vision": "DARKVISION"
    },
    {
      "type": "IMMUNITY_GRANT",
      "tags": [
        "cansaco",
        "metabolico",
        "veneno"
      ]
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "no_breathe"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "no_eat"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "no_sleep"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "no_mundane_healing"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "no_food_items_benefit"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "cura_skill_does_not_work"
    },
    {
      "type": "SKILL_SUBSTITUTE",
      "from": "cura",
      "to": "oficio_artesao"
    },
    {
      "type": "REST_RULE_OVERRIDE",
      "rest": {
        "requiresInertHours": 8,
        "ignoresRestQuality": true,
        "recoversNormallyIfRequirementMet": true
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "golem"
  },
  "text": "Tipo construto. Visão no escuro. Imune a cansaço, metabólicos e veneno. Não precisa respirar/comer/dormir. Não se beneficia de cura mundana e itens de alimentação. Cura não funciona; Ofício (artesão) pode substituir.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_golem_fonte_elemental",
  "name": "Fonte Elemental",
  "choiceRules": [
    {
      "key": "golem_element",
      "type": "PICK",
      "from": "golemElements",
      "count": 1
    }
  ],
  "effects": [
    {
      "type": "IMMUNITY_GRANT",
      "damageType": {
        "$choice": "golem_element"
      }
    },
    {
      "type": "MAGIC_DAMAGE_OF_TYPE_HEALS_HALF",
      "damageType": {
        "$choice": "golem_element"
      },
      "healsResource": "pv"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "golem"
  },
  "text": "Escolha água (frio), ar (eletricidade), fogo (fogo) ou terra (ácido). Imune ao tipo. Dano mágico desse tipo cura PV igual à metade do dano.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_golem_proposito",
  "name": "Propósito de Criação",
  "choiceRules": [
    {
      "key": "golem_general_power",
      "type": "PICK",
      "from": "generalPowers",
      "count": 1
    }
  ],
  "effects": [
    {
      "type": "POWER_GRANT",
      "power": {
        "$choice": "golem_general_power"
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "golem"
  },
  "text": "Você não escolhe origem. Recebe um poder geral à sua escolha.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_hynne_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "des": 2,
        "car": 1,
        "for": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "hynne"
  },
  "text": "Destreza +2, Carisma +1, Força -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_hynne_arremessador",
  "name": "Arremessador",
  "choiceRules": [],
  "effects": [
    {
      "type": "DAMAGE_STEP_UP",
      "weapons": {
        "tags": [
          "funda",
          "arremesso"
        ]
      },
      "steps": 1
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "hynne"
  },
  "text": "Quando faz ataque à distância com funda ou arma de arremesso, o dano aumenta em um passo.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_hynne_pequeno_rechonchudo",
  "name": "Pequeno e Rechonchudo",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "S"
    },
    {
      "type": "SPEED_SET",
      "speed": 6
    },
    {
      "type": "SKILL_BONUS",
      "skill": "enganacao",
      "bonus": 2
    },
    {
      "type": "SKILL_KEY_ATTRIBUTE_OVERRIDE",
      "skill": "atletismo",
      "keyAttribute": "des"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "hynne"
  },
  "text": "Tamanho Pequeno, deslocamento 6m. +2 Enganação. Pode usar Destreza como atributo-chave de Atletismo.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_hynne_sorte_salvadora",
  "name": "Sorte Salvadora",
  "choiceRules": [],
  "effects": [
    {
      "type": "SAVE_REROLL",
      "cost": {
        "pm": 1
      },
      "limit": {
        "per": "save",
        "count": 1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "hynne"
  },
  "text": "Ao fazer um teste de resistência, pode gastar 1 PM para rolar novamente.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_kliren_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "int": 2,
        "car": 1,
        "for": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "kliren"
  },
  "text": "Inteligência +2, Carisma +1, Força -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_kliren_hibrido",
  "name": "Híbrido",
  "choiceRules": [
    {
      "key": "kliren_skill_1",
      "type": "PICK",
      "from": "skills",
      "count": 1
    }
  ],
  "effects": [
    {
      "type": "SKILL_TRAINING",
      "skills": {
        "$choice": "kliren_skill_1"
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "kliren"
  },
  "text": "Você se torna treinado em uma perícia à sua escolha (não precisa ser da sua classe).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_kliren_engenhosidade",
  "name": "Engenhosidade",
  "choiceRules": [],
  "effects": [
    {
      "type": "SKILL_CHECK_ADD_ATTRIBUTE",
      "attribute": "int",
      "cost": {
        "pm": 2
      },
      "restrictions": {
        "notFor": [
          "attack_roll"
        ]
      },
      "meta": {
        "learnAgainCostMod": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "kliren"
  },
  "text": "Ao fazer um teste de perícia, pode gastar 2 PM para somar sua Inteligência no teste (não em ataques). Se receber novamente, custo -1 PM.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_kliren_ossos_frageis",
  "name": "Ossos Frágeis",
  "choiceRules": [],
  "effects": [
    {
      "type": "DAMAGE_TAKEN_MOD_PER_DIE",
      "damageType": "impacto",
      "addPerDie": 1
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "kliren"
  },
  "text": "Sofre 1 ponto de dano adicional por dado de dano de impacto.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_kliren_vanguardista",
  "name": "Vanguardista",
  "choiceRules": [
    {
      "key": "kliren_oficio",
      "type": "PICK",
      "from": "skillsOficio",
      "count": 1
    }
  ],
  "effects": [
    {
      "type": "WEAPON_PROFICIENCY_GRANT",
      "group": "armas_de_fogo"
    },
    {
      "type": "SKILL_BONUS",
      "skills": {
        "$choice": "kliren_oficio"
      },
      "bonus": 2
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "kliren"
  },
  "text": "Proficiência em armas de fogo e +2 em Ofício (um qualquer, à sua escolha).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_medusa_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "des": 2,
        "car": 1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "medusa"
  },
  "text": "Destreza +2, Carisma +1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_medusa_cria_megalokk",
  "name": "Cria de Megalokk",
  "choiceRules": [],
  "effects": [
    {
      "type": "CREATURE_TYPE_SET",
      "creatureType": "monstro"
    },
    {
      "type": "VISION_SET",
      "vision": "DARKVISION"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "medusa"
  },
  "text": "Tipo monstro e visão no escuro.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_medusa_natureza_venenosa",
  "name": "Natureza Venenosa",
  "choiceRules": [],
  "effects": [
    {
      "type": "RESISTANCE_GRANT",
      "amount": 5,
      "damageType": "veneno"
    },
    {
      "type": "ACTION_ABILITY",
      "action": "move",
      "cost": {
        "pm": 1
      },
      "apply": [
        {
          "type": "WEAPON_POISON_APPLY",
          "poison": {
            "id": "medusa_venom",
            "damage": "1d12",
            "damageType": "veneno"
          },
          "duration": "hit_or_scene_end"
        }
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "medusa"
  },
  "text": "Resistência a veneno +5. Ação de movimento e 1 PM para envenenar a arma: perda de 1d12 PV (até acertar ou fim da cena).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_medusa_olhar_atordoante",
  "name": "Olhar Atordoante",
  "choiceRules": [],
  "effects": [
    {
      "type": "ACTION_ABILITY",
      "action": "move",
      "cost": {
        "pm": 1
      },
      "limit": {
        "per": "scene",
        "count": 1
      },
      "apply": [
        {
          "type": "FORCE_SAVE",
          "range": "short",
          "save": "fortitude",
          "dc": {
            "keyAttribute": "car"
          },
          "onFail": [
            {
              "type": "CONDITION_APPLY",
              "condition": "atordoado",
              "duration": "1_round"
            }
          ]
        }
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "medusa"
  },
  "text": "Ação de movimento e 1 PM: criatura em alcance curto faz Fortitude (CD Car). Falha: atordoada por 1 rodada (1 vez por cena).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_osteon_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [
    {
      "key": "osteon_attr_3_no_con",
      "type": "PICK_ATTRS",
      "count": 3,
      "distinct": true,
      "amountEach": 1,
      "exclude": [
        "con"
      ]
    }
  ],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "$choice": "osteon_attr_3_no_con"
      },
      "meta": {
        "points": 3,
        "distinct": true,
        "amountEach": 1,
        "exclude": [
          "con"
        ]
      }
    },
    {
      "type": "ATTR_MOD",
      "values": {
        "con": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "osteon"
  },
  "text": "+1 em três atributos diferentes (exceto Constituição) e Constituição -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_osteon_armadura_ossea",
  "name": "Armadura Óssea",
  "choiceRules": [],
  "effects": [
    {
      "type": "DAMAGE_REDUCTION",
      "amount": 5,
      "damageTypes": [
        "corte",
        "frio",
        "perfuracao"
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "osteon"
  },
  "text": "Redução 5 a corte, frio e perfuração.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_osteon_natureza_esqueletica",
  "name": "Natureza Esquelética",
  "choiceRules": [],
  "effects": [
    {
      "type": "CREATURE_TYPE_SET",
      "creatureType": "morto_vivo"
    },
    {
      "type": "VISION_SET",
      "vision": "DARKVISION"
    },
    {
      "type": "IMMUNITY_GRANT",
      "tags": [
        "cansaco",
        "metabolico",
        "trevas",
        "veneno"
      ]
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "no_breathe"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "no_eat"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "no_sleep"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "no_food_items_benefit"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "light_healing_damages_instead"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "dark_damage_heals_pv"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "osteon"
  },
  "text": "Tipo morto-vivo. Visão no escuro. Imune a cansaço, metabólicos, trevas e veneno. Não respira/alimenta/dorme. Cura de luz causa dano; trevas cura PV. Itens de alimentação não funcionam.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_osteon_memoria_postuma",
  "name": "Memória Póstuma",
  "choiceRules": [
    {
      "key": "osteon_memory_mode",
      "type": "PICK",
      "from": "osteonMemoryModes",
      "count": 1
    },
    {
      "key": "osteon_skill_1",
      "type": "PICK",
      "from": "skills",
      "count": 1,
      "enabledWhen": {
        "key": "osteon_memory_mode",
        "op": "==",
        "value": "skill"
      }
    },
    {
      "key": "osteon_general_power",
      "type": "PICK",
      "from": "generalPowers",
      "count": 1,
      "enabledWhen": {
        "key": "osteon_memory_mode",
        "op": "==",
        "value": "power"
      }
    },
    {
      "key": "osteon_inherit_trait",
      "type": "PICK",
      "from": "humanoidNonHumanRaceTraits",
      "count": 1,
      "enabledWhen": {
        "key": "osteon_memory_mode",
        "op": "==",
        "value": "inherit"
      }
    }
  ],
  "effects": [
    {
      "type": "SKILL_TRAINING",
      "skills": {
        "$choice": "osteon_skill_1"
      },
      "when": {
        "key": "osteon_memory_mode",
        "op": "==",
        "value": "skill"
      }
    },
    {
      "type": "POWER_GRANT",
      "power": {
        "$choice": "osteon_general_power"
      },
      "when": {
        "key": "osteon_memory_mode",
        "op": "==",
        "value": "power"
      }
    },
    {
      "type": "TRAIT_GRANT",
      "trait": {
        "$choice": "osteon_inherit_trait"
      },
      "when": {
        "key": "osteon_memory_mode",
        "op": "==",
        "value": "inherit"
      }
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "osteon_inherit_size_if_non_medium"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "osteon"
  },
  "text": "Escolha: (1) Treinado em 1 perícia; (2) 1 poder geral; (3) ganhar 1 habilidade de outra raça humanoide não-humana (e tamanho se diferente de Médio).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_osteon_preco_nao_vida",
  "name": "Preço da Não Vida",
  "choiceRules": [],
  "effects": [
    {
      "type": "REST_RULE_OVERRIDE",
      "rest": {
        "requiresHours": 8,
        "requiresEnvironmentAny": [
          "starlight",
          "underground"
        ],
        "ignoresRestQuality": true,
        "recoversNormallyIfRequirementMet": true,
        "ifNotMetApply": {
          "condition": "fome"
        }
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "osteon"
  },
  "text": "Precisa passar 8 horas sob luz de estrelas ou no subterrâneo para descansar normalmente; caso contrário, sofre fome.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_merfolk_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [
    {
      "key": "merfolk_attr_3",
      "type": "PICK_ATTRS",
      "count": 3,
      "distinct": true,
      "amountEach": 1
    }
  ],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "$choice": "merfolk_attr_3"
      },
      "meta": {
        "points": 3,
        "distinct": true,
        "amountEach": 1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "sereia_tritao"
  },
  "text": "+1 em três atributos diferentes.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_merfolk_cancao_mares",
  "name": "Canção dos Mares",
  "choiceRules": [
    {
      "key": "merfolk_spells_2",
      "type": "PICK",
      "from": "merfolkSongSpells",
      "count": 2,
      "unique": true
    }
  ],
  "effects": [
    {
      "type": "SPELL_GRANT",
      "spells": {
        "$choice": "merfolk_spells_2"
      },
      "keyAttribute": "car",
      "costModCondition": {
        "ifLearnAgain": true,
        "costMod": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "sereia_tritao"
  },
  "text": "Escolha duas magias: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono (Carisma). Se aprender novamente, custo -1 PM.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_merfolk_mestre_tridente",
  "name": "Mestre do Tridente",
  "choiceRules": [],
  "effects": [
    {
      "type": "WEAPON_TREAT_AS_SIMPLE",
      "weapons": [
        "tridente"
      ]
    },
    {
      "type": "DAMAGE_BONUS",
      "weapons": [
        "azagaia",
        "lanca",
        "tridente"
      ],
      "bonus": 2
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "sereia_tritao"
  },
  "text": "Para você, tridente é arma simples. +2 em dano com azagaias, lanças e tridentes.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_merfolk_transformacao_anfibia",
  "name": "Transformação Anfíbia",
  "choiceRules": [],
  "effects": [
    {
      "type": "FEATURE_FLAG",
      "flag": "breathe_underwater"
    },
    {
      "type": "SWIM_SPEED_SET",
      "speed": 12
    },
    {
      "type": "SPEED_SET",
      "speed": 9
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "amphibious_form_shift"
    },
    {
      "type": "REST_PM_DEPENDS_ON_WATER_CONTACT",
      "maxDaysWithoutWater": 1
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "sereia_tritao"
  },
  "text": "Respira na água. Na água: natação 12m. Fora: pernas e deslocamento 9m. Se ficar >1 dia sem água, não recupera PM no descanso até voltar a ter contato com água.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_merfolk_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "sereia_tritao"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_merfolk_vision",
  "name": "Visão",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "NORMAL"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "sereia_tritao"
  },
  "text": "Sua visão é Normal.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_silfide_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "car": 2,
        "des": 1,
        "for": -2
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "silfide"
  },
  "text": "Carisma +2, Destreza +1, Força -2.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_silfide_asas_borboleta",
  "name": "Asas de Borboleta",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "T"
    },
    {
      "type": "SPEED_SET",
      "speed": 9
    },
    {
      "type": "HOVER",
      "heightMeters": 1.5
    },
    {
      "type": "IGNORE_PENALTY",
      "penalty": "difficult_terrain"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "immune_fall_damage_unless_unconscious"
    },
    {
      "type": "ACTION_ABILITY",
      "action": "sustain",
      "cost": {
        "pm": 1
      },
      "apply": [
        {
          "type": "FLY_SPEED_SET",
          "speed": 12,
          "duration": "round_end"
        }
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "silfide"
  },
  "text": "Tamanho Minúsculo. Pode pairar a 1,5m do chão com deslocamento 9m (ignora terreno difícil e é imune a queda, exceto inconsciente). Pode gastar 1 PM/rodada para voar com deslocamento 12m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_silfide_espirito_natureza",
  "name": "Espírito da Natureza",
  "choiceRules": [],
  "effects": [
    {
      "type": "CREATURE_TYPE_SET",
      "creatureType": "espirito"
    },
    {
      "type": "VISION_SET",
      "vision": "LOW_LIGHT"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "speak_with_animals"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "silfide"
  },
  "text": "Tipo espírito, visão na penumbra e pode falar com animais livremente.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_silfide_magia_fadas",
  "name": "Magia das Fadas",
  "choiceRules": [
    {
      "key": "silfide_spells_2",
      "type": "PICK",
      "from": "silfideSpells",
      "count": 2,
      "unique": true
    }
  ],
  "effects": [
    {
      "type": "SPELL_GRANT",
      "spells": {
        "$choice": "silfide_spells_2"
      },
      "keyAttribute": "car",
      "meta": {
        "spellTradition": "arcana_or_as_listed",
        "learnAgainCostMod": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "silfide"
  },
  "text": "Escolha duas magias: Criar Ilusão, Enfeitiçar, Luz (arcana) e Sono (Carisma). Se aprender novamente, custo -1 PM.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_suraggel_choice",
  "name": "Ascendência",
  "choiceRules": [
    {
      "key": "suraggel_lineage",
      "type": "PICK",
      "from": "suraggelLineage",
      "count": 1
    }
  ],
  "effects": [],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "suraggel"
  },
  "text": "Escolha Aggelus (celestial) ou Sulfure (abissal).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_suraggel_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "sab": 2,
        "car": 1
      },
      "when": {
        "key": "suraggel_lineage",
        "op": "==",
        "value": "aggelus"
      }
    },
    {
      "type": "ATTR_MOD",
      "values": {
        "des": 2,
        "int": 1
      },
      "when": {
        "key": "suraggel_lineage",
        "op": "==",
        "value": "sulfure"
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "suraggel"
  },
  "text": "Aggelus: Sabedoria +2, Carisma +1. Sulfure: Destreza +2, Inteligência +1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_suraggel_heranca_divina",
  "name": "Herança Divina",
  "choiceRules": [],
  "effects": [
    {
      "type": "CREATURE_TYPE_SET",
      "creatureType": "espirito"
    },
    {
      "type": "VISION_SET",
      "vision": "DARKVISION"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "suraggel"
  },
  "text": "Tipo espírito e visão no escuro.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_suraggel_luz_sagrada",
  "name": "Luz Sagrada (Aggelus)",
  "choiceRules": [],
  "effects": [
    {
      "type": "SKILL_BONUS",
      "skill": "diplomacia",
      "bonus": 2,
      "when": {
        "key": "suraggel_lineage",
        "op": "==",
        "value": "aggelus"
      }
    },
    {
      "type": "SKILL_BONUS",
      "skill": "intuicao",
      "bonus": 2,
      "when": {
        "key": "suraggel_lineage",
        "op": "==",
        "value": "aggelus"
      }
    },
    {
      "type": "SPELL_GRANT",
      "spell": {
        "id": "luz"
      },
      "keyAttribute": "car",
      "meta": {
        "tradition": "divina",
        "learnAgainCostMod": -1
      },
      "when": {
        "key": "suraggel_lineage",
        "op": "==",
        "value": "aggelus"
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "suraggel"
  },
  "text": "+2 em Diplomacia e Intuição. Pode lançar Luz (magia divina, Carisma). Se aprender novamente, custo -1 PM.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_suraggel_sombras_profanas",
  "name": "Sombras Profanas (Sulfure)",
  "choiceRules": [],
  "effects": [
    {
      "type": "SKILL_BONUS",
      "skill": "enganacao",
      "bonus": 2,
      "when": {
        "key": "suraggel_lineage",
        "op": "==",
        "value": "sulfure"
      }
    },
    {
      "type": "SKILL_BONUS",
      "skill": "furtividade",
      "bonus": 2,
      "when": {
        "key": "suraggel_lineage",
        "op": "==",
        "value": "sulfure"
      }
    },
    {
      "type": "SPELL_GRANT",
      "spell": {
        "id": "escuridao"
      },
      "keyAttribute": "int",
      "meta": {
        "tradition": "divina",
        "learnAgainCostMod": -1
      },
      "when": {
        "key": "suraggel_lineage",
        "op": "==",
        "value": "sulfure"
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "suraggel"
  },
  "text": "+2 em Enganação e Furtividade. Pode lançar Escuridão (magia divina, Inteligência). Se aprender novamente, custo -1 PM.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_suraggel_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "suraggel"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_suraggel_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "suraggel"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_trog_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "con": 2,
        "for": 1,
        "int": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "trog"
  },
  "text": "Constituição +2, Força +1, Inteligência -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_trog_mau_cheiro",
  "name": "Mau Cheiro",
  "choiceRules": [],
  "effects": [
    {
      "type": "ACTION_ABILITY",
      "action": "standard",
      "cost": {
        "pm": 2
      },
      "apply": [
        {
          "type": "FORCE_SAVE_AOE",
          "range": "short",
          "targets": {
            "excludeSelfRace": "trog"
          },
          "save": "fortitude",
          "dc": {
            "keyAttribute": "con"
          },
          "tags": [
            "veneno"
          ],
          "onFail": [
            {
              "type": "CONDITION_APPLY",
              "condition": "enjoadо",
              "duration": "1d6_rounds"
            }
          ],
          "onSuccess": [
            {
              "type": "TARGET_IMMUNITY",
              "source": "r_trog_mau_cheiro",
              "duration": "1_day"
            }
          ]
        }
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "trog"
  },
  "text": "Ação padrão e 2 PM: gás fétido. Criaturas (exceto trogs) em alcance curto fazem Fortitude vs veneno (CD Con) ou ficam enjoadas por 1d6 rodadas. Sucesso: imune por 1 dia.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_trog_mordida",
  "name": "Mordida",
  "choiceRules": [],
  "effects": [
    {
      "type": "NATURAL_WEAPON_GRANT",
      "weapon": {
        "name": "Mordida",
        "damage": "1d6",
        "crit": "x2",
        "damageType": "perfuracao"
      }
    },
    {
      "type": "SPECIAL_ATTACK",
      "name": "Ataque Extra: Mordida",
      "cost": {
        "pm": 1
      },
      "limit": {
        "per": "round",
        "count": 1
      },
      "description": "Ao usar ação agredir com outra arma, pode gastar 1 PM para um ataque corpo a corpo extra com mordida."
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "trog"
  },
  "text": "Arma natural de mordida (1d6, x2, perfuração). 1/rodada: ao agredir com outra arma, pode gastar 1 PM para um ataque extra com mordida.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_trog_reptiliano",
  "name": "Reptiliano",
  "choiceRules": [],
  "effects": [
    {
      "type": "CREATURE_TYPE_SET",
      "creatureType": "monstro"
    },
    {
      "type": "VISION_SET",
      "vision": "DARKVISION"
    },
    {
      "type": "DEFENSE_BONUS",
      "bonus": 1
    },
    {
      "type": "SKILL_BONUS",
      "skill": "furtividade",
      "bonus": 5,
      "condition": {
        "armor": "none_or_light_clothes"
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "trog"
  },
  "text": "Tipo monstro. Visão no escuro. +1 Defesa. Se estiver sem armadura ou roupas pesadas, +5 Furtividade.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_trog_sangue_frio",
  "name": "Sangue Frio",
  "choiceRules": [],
  "effects": [
    {
      "type": "DAMAGE_TAKEN_MOD_PER_DIE",
      "damageType": "frio",
      "addPerDie": 1
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "trog"
  },
  "text": "Sofre 1 ponto de dano adicional por dado de dano de frio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_trog_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "trog"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_trog_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "trog"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_eiradaan_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "sab": 2,
        "car": 1,
        "for": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "eiradaan"
  },
  "text": "Sabedoria +2, Carisma +1, Força -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_eiradaan_essencia_feerica",
  "name": "Essência Feérica",
  "choiceRules": [],
  "effects": [
    {
      "type": "CREATURE_TYPE_SET",
      "creatureType": "espirito"
    },
    {
      "type": "VISION_SET",
      "vision": "LOW_LIGHT"
    },
    {
      "type": "FEATURE_FLAG",
      "flag": "speak_with_animals"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "eiradaan"
  },
  "text": "Tipo espírito, visão na penumbra e pode falar com animais livremente.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_eiradaan_magia_instintiva",
  "name": "Magia Instintiva",
  "choiceRules": [],
  "effects": [
    {
      "type": "ARCANE_KEY_ATTRIBUTE_OVERRIDE",
      "keyAttribute": "sab"
    },
    {
      "type": "SKILL_KEY_ATTRIBUTE_OVERRIDE",
      "skill": "misticismo",
      "keyAttribute": "sab"
    },
    {
      "type": "SPELL_UPGRADE_PM_BONUS",
      "bonusPm": 1,
      "stacking": "no_stack"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "eiradaan"
  },
  "text": "Pode usar Sabedoria como atributo-chave de magias arcanas e Misticismo. Ao lançar magia, recebe +1 PM para aprimoramentos (não cumulativo com outros efeitos similares).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_eiradaan_sentidos_misticos",
  "name": "Sentidos Místicos",
  "choiceRules": [],
  "effects": [
    {
      "type": "ALWAYS_ON_SPELL_EFFECT",
      "spell": {
        "id": "visao_mistica"
      },
      "mode": "basic"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "eiradaan"
  },
  "text": "Você está sempre sob o efeito básico de Visão Mística.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_eiradaan_cancao_melancolia",
  "name": "Canção da Melancolia",
  "choiceRules": [],
  "effects": [
    {
      "type": "SAVE_ROLL_TWICE_TAKE_WORST",
      "save": "vontade",
      "condition": {
        "tags": [
          "mental"
        ]
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "eiradaan"
  },
  "text": "Quando faz um teste de Vontade contra efeitos mentais, rola dois dados e usa o pior resultado.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_eiradaan_longevidade",
  "name": "Longevidade",
  "choiceRules": [],
  "effects": [
    {
      "type": "LONGEVITY_MULTIPLIER",
      "multiplier": 5
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "eiradaan"
  },
  "text": "Multiplicador x5.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_eiradaan_devocao",
  "name": "Devoção",
  "choiceRules": [],
  "effects": [
    {
      "type": "DEVOTION_OPTIONS",
      "deities": [
        "allihanna",
        "lena",
        "thyatis",
        "wynna"
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "eiradaan"
  },
  "text": "Allihanna, Lena, Thyatis, Wynna.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_eiradaan_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "eiradaan"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_eiradaan_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "eiradaan"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_eiradaan_vision",
  "name": "Visão",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "LOW_LIGHT"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "eiradaan"
  },
  "text": "Visão na Penumbra.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_galokk_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [
    {
      "key": "galokk_attr_1",
      "type": "PICK_ATTRS",
      "count": 1,
      "distinct": true,
      "amountEach": 1
    }
  ],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "for": 1,
        "con": 1,
        "car": -1
      }
    },
    {
      "type": "ATTR_MOD",
      "values": {
        "$choice": "galokk_attr_1"
      },
      "meta": {
        "points": 1,
        "distinct": true,
        "amountEach": 1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "galokk"
  },
  "text": "Força +1, Constituição +1, +1 em um atributo, Carisma -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_galokk_forca_titas",
  "name": "Força dos Titãs",
  "choiceRules": [],
  "effects": [
    {
      "type": "ON_HIT_TOGGLE",
      "cost": {
        "pm": 1
      },
      "apply": [
        {
          "type": "DAMAGE_EXPLODE_ON_MAX",
          "weapons": {
            "tags": [
              "melee",
              "thrown"
            ]
          },
          "maxExtraDiceCapByAttribute": "for"
        }
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "galokk"
  },
  "text": "Ao acertar um ataque corpo a corpo ou de arremesso, pode gastar 1 PM. Se fizer isso, sempre que rolar o máximo em um dado de dano, role um dado extra, até um limite de dados extras igual à sua Força.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_galokk_meio_gigante",
  "name": "Meio-Gigante",
  "choiceRules": [],
  "effects": [
    {
      "type": "CREATURE_SUBTYPE_SET",
      "creatureType": "humanoide",
      "subType": "gigante"
    },
    {
      "type": "SIZE_SET",
      "size": "L"
    },
    {
      "type": "SKILL_KEY_ATTRIBUTE_OVERRIDE",
      "skill": "intimidacao",
      "keyAttribute": "for"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "galokk"
  },
  "text": "Tipo humanoide (gigante). Tamanho Grande. Pode usar Força como atributo-chave de Intimidação.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_galokk_infancia_pequenos",
  "name": "Infância entre os Pequenos",
  "choiceRules": [
    {
      "key": "galokk_skill_1",
      "type": "PICK",
      "from": "skills",
      "count": 1
    }
  ],
  "effects": [
    {
      "type": "SKILL_TRAINING",
      "skills": {
        "$choice": "galokk_skill_1"
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "galokk"
  },
  "text": "Você se torna treinado em uma perícia à sua escolha.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_galokk_longevidade",
  "name": "Longevidade",
  "choiceRules": [],
  "effects": [
    {
      "type": "LONGEVITY_PROFILE",
      "profile": "normal"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "galokk"
  },
  "text": "Normal.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_galokk_devocao",
  "name": "Devoção",
  "choiceRules": [],
  "effects": [
    {
      "type": "DEVOTION_OPTIONS",
      "deities": [
        "allihanna",
        "arsenal",
        "megalokk"
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "galokk"
  },
  "text": "Allihanna, Arsenal, Megalokk.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_galokk_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "galokk"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_galokk_vision",
  "name": "Visão",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "NORMAL"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "galokk"
  },
  "text": "Sua visão é Normal.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_meio_elfo_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [
    {
      "key": "meio_elfo_attr_2_no_con",
      "type": "PICK_ATTRS",
      "count": 2,
      "distinct": true,
      "amountEach": 1,
      "exclude": [
        "con"
      ]
    }
  ],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "int": 1
      }
    },
    {
      "type": "ATTR_MOD",
      "values": {
        "$choice": "meio_elfo_attr_2_no_con"
      },
      "meta": {
        "points": 2,
        "distinct": true,
        "amountEach": 1,
        "exclude": [
          "con"
        ]
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "meio_elfo"
  },
  "text": "Inteligência +1, +1 em dois atributos (exceto Constituição).",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_meio_elfo_ambicao_herdada",
  "name": "Ambição Herdada",
  "choiceRules": [
    {
      "key": "meio_elfo_power_kind",
      "type": "PICK",
      "from": "meioElfoPowerKind",
      "count": 1
    },
    {
      "key": "meio_elfo_general_power",
      "type": "PICK",
      "from": "generalPowers",
      "count": 1,
      "enabledWhen": {
        "key": "meio_elfo_power_kind",
        "op": "==",
        "value": "general"
      }
    },
    {
      "key": "meio_elfo_origin_unique_power",
      "type": "PICK",
      "from": "originUniquePowers",
      "count": 1,
      "enabledWhen": {
        "key": "meio_elfo_power_kind",
        "op": "==",
        "value": "origin_unique"
      }
    }
  ],
  "effects": [
    {
      "type": "POWER_GRANT",
      "power": {
        "$choice": "meio_elfo_general_power"
      },
      "when": {
        "key": "meio_elfo_power_kind",
        "op": "==",
        "value": "general"
      }
    },
    {
      "type": "POWER_GRANT",
      "power": {
        "$choice": "meio_elfo_origin_unique_power"
      },
      "when": {
        "key": "meio_elfo_power_kind",
        "op": "==",
        "value": "origin_unique"
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "meio_elfo"
  },
  "text": "Você recebe um poder geral ou poder único de origem (T20 p. 85) à sua escolha.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_meio_elfo_entre_dois_mundos",
  "name": "Entre Dois Mundos",
  "choiceRules": [],
  "effects": [
    {
      "type": "SKILL_BONUS_BY_ATTRIBUTE_BASED",
      "attribute": "car",
      "bonus": 1
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "meio_elfo"
  },
  "text": "+1 em perícias baseadas em Carisma.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_meio_elfo_sangue_elfico",
  "name": "Sangue Élfico",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "LOW_LIGHT"
    },
    {
      "type": "MANA_PER_ODD_LEVEL",
      "amount": 1
    },
    {
      "type": "COUNTS_AS_RACE",
      "race": "elfo"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "meio_elfo"
  },
  "text": "Visão na penumbra e +1 PM a cada nível ímpar (incluindo 1º). É considerado um elfo para efeitos relacionados a raça.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_meio_elfo_longevidade",
  "name": "Longevidade",
  "choiceRules": [],
  "effects": [
    {
      "type": "LONGEVITY_MULTIPLIER",
      "multiplier": 2
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "meio_elfo"
  },
  "text": "Multiplicador x2.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_meio_elfo_devocao",
  "name": "Devoção",
  "choiceRules": [],
  "effects": [
    {
      "type": "DEVOTION_OPTIONS",
      "deities": [
        "*"
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "meio_elfo"
  },
  "text": "Qualquer.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_meio_elfo_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "meio_elfo"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_meio_elfo_speed",
  "name": "Deslocamento",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 9
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "meio_elfo"
  },
  "text": "Seu deslocamento é 9m.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_satiro_attr",
  "name": "Ajustes de Atributo",
  "choiceRules": [],
  "effects": [
    {
      "type": "ATTR_MOD",
      "values": {
        "car": 2,
        "des": 1,
        "sab": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "satiro"
  },
  "text": "Carisma +2, Destreza +1, Sabedoria -1.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_satiro_festeiro_feerico",
  "name": "Festeiro Feérico",
  "choiceRules": [],
  "effects": [
    {
      "type": "CREATURE_TYPE_SET",
      "creatureType": "espirito"
    },
    {
      "type": "VISION_SET",
      "vision": "LOW_LIGHT"
    },
    {
      "type": "SKILL_BONUS",
      "skill": "atuacao",
      "bonus": 2
    },
    {
      "type": "SKILL_BONUS",
      "skill": "fortitude",
      "bonus": 2
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "satiro"
  },
  "text": "Tipo espírito, visão na penumbra e +2 em Atuação e Fortitude.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_satiro_instrumentista_magico",
  "name": "Instrumentista Mágico",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPELL_GRANT_WHEN",
      "when": {
        "requires": {
          "itemTagEquipped": "instrumento_musical"
        }
      },
      "spells": [
        "amedrontar",
        "enfeiticar",
        "hipnotismo",
        "sono"
      ],
      "keyAttribute": "car",
      "meta": {
        "learnAgainCostMod": -1
      }
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "satiro"
  },
  "text": "Empunhando um instrumento musical, pode lançar: Amedrontar, Enfeitiçar, Hipnotismo e Sono (Carisma). Se aprender novamente, custo -1 PM.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_satiro_marrada",
  "name": "Marrada",
  "choiceRules": [],
  "effects": [
    {
      "type": "NATURAL_WEAPON_GRANT",
      "weapon": {
        "name": "Marrada",
        "damage": "1d6",
        "crit": "x2",
        "damageType": "impacto"
      }
    },
    {
      "type": "SPECIAL_ATTACK",
      "name": "Ataque Extra: Marrada",
      "cost": {
        "pm": 1
      },
      "limit": {
        "per": "round",
        "count": 1
      },
      "description": "Ao usar ação agredir com outra arma, pode gastar 1 PM para um ataque corpo a corpo extra com marrada."
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "satiro"
  },
  "text": "Arma natural (1d6, x2, impacto). 1/rodada: ao agredir com outra arma, pode gastar 1 PM para ataque extra com a marrada.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_satiro_pernas_caprinas",
  "name": "Pernas Caprinas",
  "choiceRules": [],
  "effects": [
    {
      "type": "SPEED_SET",
      "speed": 12
    },
    {
      "type": "SKILL_KEY_ATTRIBUTE_OVERRIDE",
      "skill": "atletismo",
      "keyAttribute": "des"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "satiro"
  },
  "text": "Deslocamento 12m e pode usar Destreza como atributo-chave de Atletismo.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_satiro_longevidade",
  "name": "Longevidade",
  "choiceRules": [],
  "effects": [
    {
      "type": "LONGEVITY_PROFILE",
      "profile": "normal"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "satiro"
  },
  "text": "Normal.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_satiro_devocao",
  "name": "Devoção",
  "choiceRules": [],
  "effects": [
    {
      "type": "DEVOTION_OPTIONS",
      "deities": [
        "allihanna",
        "hyninn",
        "marah",
        "nimb",
        "wynna"
      ]
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "satiro"
  },
  "text": "Allihanna, Hyninn, Marah, Nimb, Wynna.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_satiro_size",
  "name": "Tamanho",
  "choiceRules": [],
  "effects": [
    {
      "type": "SIZE_SET",
      "size": "M"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "satiro"
  },
  "text": "Seu tamanho é Médio.",
  "prerequisites": [],
  "group": "racial"
}),
  makeFeature({
  "id": "r_satiro_vision",
  "name": "Visão",
  "choiceRules": [],
  "effects": [
    {
      "type": "VISION_SET",
      "vision": "LOW_LIGHT"
    }
  ],
  "kind": FeatureKind.RACIAL_TRAIT,
  "source": {
    "type": "race",
    "sourceId": "satiro"
  },
  "text": "Visão na Penumbra.",
  "prerequisites": [],
  "group": "racial"
})
];
