// src/rulesets/t20/engine/progressionPersist.js

function ensureTraining(character) {
  if (!character.training) character.training = {}
  if (!character.training.skills) character.training.skills = {}
  return character.training.skills
}

/**
 * Aplica (persiste) uma lista de perícias treinadas no character.training.skills
 * (Opção A).
 */
export function persistTrainedSkills(character, skillKeys = []) {
  const skills = ensureTraining(character)
  for (const key of skillKeys || []) {
    if (!key) continue
    const curr = skills[key]
    if (curr == null) {
      skills[key] = { trained: true, misc: 0, attr: null }
    } else if (typeof curr === 'boolean') {
      skills[key] = { trained: !!curr || true, misc: 0, attr: null }
    } else if (typeof curr === 'object') {
      skills[key] = { trained: true, misc: Number(curr.misc || 0), attr: curr.attr || null }
    }
  }
}