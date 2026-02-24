// src/core/engine/buildCtx.js

/**
 * Contexto de cálculo padronizado para o engine/regras.
 *
 * Objetivo:
 * - Garantir que schema.rules.getAttr(ctx, key) funcione sempre.
 * - Evitar “ctx.attributes.dex” vs “ctx.attributes.base.dex” vs “sheet.attributes.*” espalhado.
 * - Centralizar compat com legado.
 *
 * O schema (ex: t20Schema) espera que ctx contenha pelo menos:
 * - ctx.schema
 * - ctx.level
 * - ctx.sheet (para ler sheet.attributes.* e sheet.training.*)
 * - ctx.equipment
 * - ctx.bonuses
 *
 * Além disso, se seu engine calcula modifiers (traits/features), você pode injetar:
 * - ctx.mods (ex.: { attributes: { str:+1 }, skills: { initiative:+2 }, ... })
 *
 * @param {object} params
 * @param {object} params.schema
 * @param {object} params.character
 * @param {object} [params.mods] - modificadores calculados pelo resolver de features/itens (opcional)
 * @returns {object} ctx
 */
export function buildCtx({ schema, character, mods = null } = {}) {
  if (!schema) throw new Error('buildCtx: schema é obrigatório.')
  if (!character) throw new Error('buildCtx: character é obrigatório.')

  const progression = character.progression ?? {}
  const sheet = character.sheet ?? {}

  // Equipamento: preferimos sheet.equipment, mas permitimos ctx.equipment legado.
  const equipment = sheet.equipment ?? character.equipment ?? {}

  // Bônus misc: preferimos sheet.bonuses (do seu modelo)
  const bonuses = sheet.bonuses ?? character.bonuses ?? { defense: { misc: 0 }, skills: {} }

  // Treino: preferimos sheet.training, mas aceitamos character.training legado
  const training = sheet.training ?? character.training ?? { skills: {} }

  // Nivel: preferimos progression.level, mas aceitamos character.level legado
  const level = Number(progression.level ?? character.level ?? 1) || 1

  /**
   * Convenção:
   * - ctx.sheet sempre existe (mesmo que vazio)
   * - ctx.training sempre existe (para facilitar regras)
   */
  const ctx = {
    schema,

    // Identidade / progressão
    level,
    progression,

    // Dados canônicos
    sheet,
    training,
    equipment,
    bonuses,

    // Modificadores vindos do engine (features/itens/condições)
    mods: mods ?? null,

    /**
     * ===========================
     * Compat "legado" opcional
     * ===========================
     *
     * Alguns trechos antigos podem acessar:
     * - ctx.attributes.dex
     * - ctx.attributes.base.dex
     *
     * Como o novo modelo está em sheet.attributes.*,
     * este alias fornece um fallback seguro.
     *
     * Atenção: aqui não somamos mods (isso fica para as regras
     * decidirem, se quiser). O t20Schema.rules.getAttr(ctx, key)
     * já faz a leitura do novo modelo.
     */
    attributes: {
      base: sheet.attributes?.creation?.base ?? sheet.attributes?.base ?? {},
      // opcional: expõe “dex” no topo (muita regra antiga faz ctx.attributes.dex)
      ...((sheet.attributes?.creation?.base ?? sheet.attributes?.base) || {})
    }
  }

  return ctx
}