import { uid } from '@/app/utils/uid'; // ajuste o path
import { getRuleset } from '@/rulesets/registry'; // ajuste o path (ou getRuleset)

function arrayToMap(keys, initValue) {
  return keys.reduce((acc, k) => {
    acc[k] = typeof initValue === 'function' ? initValue(k) : initValue;
    return acc;
  }, {});
}

export function createEmptyCharacter({ systemId = 't20' } = {}) {
  const schema = getRuleset(systemId); // ou getRuleset(systemId)
  if (!schema) throw new Error(`Ruleset "${systemId}" não encontrado no registry.`);

  // atributos base: em T20 JdA você pode querer 0 (bônus direto) em vez de 10
  // vou usar um default do schema se existir, senão 0.
  const defaultAttr = schema.defaults?.attributeBase ?? 0;

  const attributeKeys = (schema.attributes ?? []).map(a => a.key);
  const skillKeys = (schema.skills ?? []).map(s => s.key);

  const equipmentSlots = schema.equipmentModel?.slots
    ? Object.keys(schema.equipmentModel.slots)
    : [];

  // stats “derivados” você não precisa armazenar (é computed), mas pode ter cache opcional
  const derivedStatKeys = (schema.stats ?? []).map(s => s.key);

  return {
    id: uid(),
    systemId,

    meta: {
      name: '',
      player: '',
      notes: '',
      description: ''
    },

    progression: {
      level: 1,
      experience: 0,
      classes: [],
      deityId: null,
      raceId: null,
      originId: null,
      size: 'medium'
    },

    // Dados “do sistema”
    sheet: {
      attributes: {
        base: arrayToMap(attributeKeys, defaultAttr)
      },

      // treinamento é por perícia (inclui Fort/Ref/Will)
      training: {
        skills: arrayToMap(skillKeys, false)
        // se preferir, pode ser array: trainedSkills: []
      },

      // equipamento estruturado por slots do schema
      equipment: arrayToMap(equipmentSlots, null),

      // recursos genéricos (pode vir do schema.defaults depois)
      resources: {
        hp: { current: 0, temp: 0 },
        mp: { current: 0, temp: 0 }
      },

      // ataques/spells podem existir, mas ideal é vir do schema (ou ficar como módulos)
      attacks: [],
      spellcasting: {
        keyAttribute: null,
        spells: []
      },

      // bônus misc (traits engine) — um lugar padronizado pra somatórios
      bonuses: {
        defense: { misc: 0 },
        skills: {}
      },

      // opcional: cache se você quiser persistir valores calculados (senão remova)
      derived: arrayToMap(derivedStatKeys, null)
    },

    proficiencies: {
      weapons: [],
      armors: [],
      shields: [],
      tools: [],
      misc: []
    },

    inventory: {
      money: { ts: 0 },
      items: []
    },

    build: {
      grantedFeatureIds: {
        race: [],
        origin: [],
        classes: [],
        general: [],
        items: [],
        misc: []
      },
      choices: {}
    }
  };
}
