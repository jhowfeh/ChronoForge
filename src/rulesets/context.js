// src/rulesets/context.js
export function buildRulesContext(schema, character) {
  const sheet = character?.sheet || {};

  // TENTE todos os caminhos possíveis
  const level =
    Number(character?.level) ||
    Number(sheet?.level) ||
    Number(sheet?.basics?.level) ||
    1;

  // atributos: aceita base ou direto
  const attributes =
    character?.attributes?.base
      ? { ...character.attributes.base }
      : (character?.attributes || sheet?.attributes?.base || sheet?.attributes || {});

  const training =
    character?.training ||
    sheet?.training ||
    { skills: {}, saves: {} };

  const equipment =
    character?.equipment ||
    sheet?.equipment ||
    {};

  const bonuses =
    character?.bonuses ||
    sheet?.bonuses ||
    {};

  return {
    schema,
    level,
    attributes,   // aqui eu recomendo: sempre “achatado” (str,dex...)
    training,
    equipment,
    bonuses,
    sheet
  };
}
