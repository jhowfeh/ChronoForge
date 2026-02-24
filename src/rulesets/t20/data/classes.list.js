// src/rulesets/t20/data/classes.list.js

/**
 * Convenções usadas aqui:
 * - value: id canônico da classe (é o que você salva no character.progression.classId)
 * - progression: lista de níveis com:
 *    - grants: featureIds concedidas automaticamente ao atingir aquele nível
 *    - choices: slots de escolha que devem ser preenchidos naquele nível
 * - pools: listas de featureIds disponíveis para cada slot (por "pool")
 *
 * Observação:
 * - “Poder de Arcanista” é um slot repetido em vários níveis (2..20).
 *   A UI/engine diferencia pelo nível, mas o slotKey pode ser o mesmo.
 */
export const classes = [
  {
    value: 'arcanista',
    label: 'Arcanista',

    // PV: 8 (+Con) inicial; +2 (+Con) por nível
    hitPoints: { base: 8, perLevel: 2, addConEachLevel: true },

    // PM: 6 por nível; soma atributo-chave no total (depende do Caminho)
    manaPoints: { perLevel: 6, addKeyAttrToTotal: true },

    // Perícias de classe (início)
    trainedSkills: {
      fixed: ['mysticism', 'will'],
      choose: {
        count: 2,
        from: [
          'knowledge',
          'diplomacy',
          'deception',
          'warfare',
          'initiative',
          'intimidation',
          'insight',
          'investigation',
          'nobility',
          'craft',
          'perception'
        ]
      }
    },

    // Proficiências: nenhuma (você pode expandir o modelo depois)
    proficiencies: {
      weapons: [],
      armors: [],
      shields: []
    },

    /**
     * Progressão por nível.
     * - Nível 1:
     *   - Escolhe Caminho do Arcanista (bruxo/feiticeiro/mago)
     *   - Ganha spellcasting básico (feature)
     *   - Escolhe 2 perícias da lista
     * - Níveis 2..20:
     *   - Escolhe 1 Poder de Arcanista por nível
     * - Níveis 5/9/13/17:
     *   - “Acesso a novo círculo” (features de marcador)
     * - Nível 20:
     *   - Alta Arcana (feature)
     */
    progression: [
      {
        level: 1,
        grants: ['arcanista_spellcasting_1'],
        choices: [
          { key: 'arcanist_path', pool: 'arcanist_path', count: 1 },
          { key: 'class_skill_picks', pool: 'arcanist_class_skills', count: 2 }
        ]
      },

      // do 2 ao 4: só poder de arcanista
      { level: 2, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },
      { level: 3, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },
      { level: 4, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },

      // 5: 2º círculo + poder
      { level: 5, grants: ['arcanista_circle_2'], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },

      { level: 6, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },
      { level: 7, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },
      { level: 8, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },

      // 9: 3º círculo + poder
      { level: 9, grants: ['arcanista_circle_3'], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },

      { level: 10, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },
      { level: 11, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },
      { level: 12, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },

      // 13: 4º círculo + poder
      { level: 13, grants: ['arcanista_circle_4'], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },

      { level: 14, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },
      { level: 15, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },
      { level: 16, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },

      // 17: 5º círculo + poder
      { level: 17, grants: ['arcanista_circle_5'], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },

      { level: 18, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },
      { level: 19, grants: [], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] },

      // 20: alta arcana + poder
      { level: 20, grants: ['arcanista_alta_arcana'], choices: [{ key: 'arcanist_power', pool: 'arcanist_power', count: 1 }] }
    ],

    /**
     * Pools (listas de opções) para cada choice.
     * Aqui entram featureIds que DEVEM existir no featureIndex do catalog.
     *
     * Você pode começar com poucos ids e ir completando aos poucos.
     */
    pools: {
      // Caminho do Arcanista (nível 1)
      arcanist_path: ['path_bruxo', 'path_feiticeiro', 'path_mago'],

      // Perícias iniciais (nível 1) — aqui são SKILL KEYS (não featureIds)
      // O resolveClassProgression sabe que esse pool é "skill".
      arcanist_class_skills: [
        'knowledge',
        'diplomacy',
        'deception',
        'warfare',
        'initiative',
        'intimidation',
        'insight',
        'investigation',
        'nobility',
        'craft',
        'perception'
      ],

      // Poder de Arcanista (nível 2..20) — featureIds
      arcanist_power: [
        'arcano_de_batalha',
        'aumento_de_atributo',
        'caldeirao_do_bruxo',
        'conhecimento_magico',
        'contramagica_aprimorada',
        'envolto_em_misterio',
        'escriba_arcano',
        'especialista_em_escola',
        'familiar',
        'fluxo_de_mana',
        'foco_vital',
        'fortalecimento_arcano',
        'heranca_aprimorada',
        'heranca_superior',
        'magia_pungente',
        'mestre_em_escola',
        'poder_magico',
        'raio_arcano',
        'raio_elemental',
        'raio_poderoso',
        'tinta_do_mago'
      ]
    }
  }
]