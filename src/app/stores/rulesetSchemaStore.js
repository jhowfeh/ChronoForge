import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listRulesets } from '@/rulesets/registry'

export const useRulesetSchemaStore = defineStore('RulesetSchema', () => {
  /**
   * Lista de rulesets disponíveis (metadata).
   *
   * Cada item representa um sistema (T20, CoC, etc) e contém:
   * - id
   * - label
   * - image (opcional)
   * - loadSchema (função lazy que carrega o schema)
   *
   * ⚠️ NÃO contém o schema carregado.
   */
  const RulesetList = ref([])

  /**
   * Cache de schemas já carregados.
   *
   * Estrutura:
   * {
   *   [rulesetId]: schema
   * }
   *
   * Evita múltiplos imports do mesmo schema e melhora performance.
   */
  const SchemaCache = ref({})

  /**
   * Inicializa a store carregando a lista de rulesets disponíveis.
   *
   * Deve ser chamada no boot da aplicação.
   * Apenas carrega metadata (não carrega schemas).
   *
   * @function init
   * @returns {void}
   *
   * @example
   * const store = useRulesetSchemaStore()
   * store.init()
   */
  function init() {
    RulesetList.value = listRulesets() || []
  }

  /**
   * Retorna os dados de um ruleset pelo ID.
   *
   * Retorna apenas metadata (não carrega schema).
   *
   * @function getRulesetById
   * @param {string} rulesetId - ID do sistema (ex: "t20jda")
   * @returns {Object|null} Ruleset encontrado ou null
   *
   * @example
   * const ruleset = store.getRulesetById('t20jda')
   */
  function getRulesetById(rulesetId) {
    if (!rulesetId) return null
    return RulesetList.value.find(r => r.id === rulesetId) ?? null
  }

  /**
   * Carrega (lazy) o schema de um ruleset.
   *
   * - Se já estiver no cache, retorna imediatamente
   * - Caso contrário, executa o import dinâmico
   * - Armazena no cache para reutilização futura
   *
   * @function loadSchemaById
   * @param {string} rulesetId - ID do sistema
   * @returns {Promise<Object|null>} Schema carregado
   *
   * @example
   * const schema = await store.loadSchemaById('t20jda')
   */
  async function loadSchemaById(rulesetId) {
    if (!rulesetId) return null

    // 🔹 Retorna do cache se já carregado
    if (SchemaCache.value[rulesetId]) {
      return SchemaCache.value[rulesetId]
    }

    const ruleset = getRulesetById(rulesetId)

    if (!ruleset?.loadSchema) {
      console.error('Ruleset has no loadSchema function:', rulesetId)
      return null
    }

    try {
      // 🔹 Import dinâmico do schema
      const schemaModule = await ruleset.loadSchema()

      // 🔹 Compatível com default export ou named export
      const schema = schemaModule.default ?? schemaModule

      // 🔹 Salva no cache
      SchemaCache.value[rulesetId] = schema

      return schema
    } catch (error) {
      console.error('Failed to load schema:', rulesetId, error)
      return null
    }
  }

  /**
   * Retorna um schema já carregado (cache).
   *
   * NÃO realiza import.
   *
   * @function getSchemaById
   * @param {string} rulesetId
   * @returns {Object|null} Schema do cache ou null
   *
   * @example
   * const schema = store.getSchemaById('t20jda')
   */
  function getSchemaById(rulesetId) {
    if (!rulesetId) return null
    return SchemaCache.value[rulesetId] ?? null
  }

  /**
   * Retorna a lista de rulesets disponíveis.
   *
   * Usado para:
   * - dropdown de seleção de sistema
   * - listagem de sistemas
   *
   * @function getSchemaList
   * @returns {Array<Object>}
   *
   * @example
   * const list = store.getSchemaList()
   */
  function getSchemaList() {
    return RulesetList.value
  }

  return {
    RulesetList,
    SchemaCache,
    init,
    getRulesetById,
    loadSchemaById,
    getSchemaById,
    getSchemaList
  }
})