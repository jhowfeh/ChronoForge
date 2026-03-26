import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listRulesets } from '@/rulesets/registry'

export const useRulesetSchemaStore = defineStore('RulesetSchema', () => {
    const SchemaList = ref([])

    /**
     * Inicializa a store carregando todos os schemas disponíveis no registry.
     *
     * Deve ser chamada no boot da aplicação antes de qualquer acesso aos schemas.
     *
     * @function init
     * @returns {void}
     *
     * @example
     * const store = useRulesetSchemaStore()
     * store.init()
     */
    function init() {
        SchemaList.value = listRulesets() || []
    }

    /**
     * Retorna um schema específico com base no ID do ruleset.
     *
     * @function getSchemaById
     * @param {string} rulesetId - Identificador do ruleset (ex: "t20", "coc", "3det")
     * @returns {Object|null} Schema encontrado ou null caso não exista
     *
     * @example
     * const schema = store.getSchemaById('t20')
     */
    function getSchemaById(rulesetId) {
        if (!rulesetId) return null

        return SchemaList.value.find(s => s.id === rulesetId) ?? null
    }

    /**
     * Retorna a lista completa de schemas disponíveis.
     *
     * Usado principalmente para popular dropdowns e seletores de sistema.
     *
     * @function getSchemaList
     * @returns {Array<Object>} Lista de schemas carregados
     *
     * @example
     * const schemas = store.getSchemaList()
     */
    function getSchemaList() {
        return SchemaList.value
    }

    return {
        SchemaList,
        init,
        getSchemaById,
        getSchemaList
    }
})