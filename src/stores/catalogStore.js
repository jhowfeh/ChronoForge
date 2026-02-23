import { defineStore } from 'pinia'
import { computed, ref, shallowRef, watch } from 'vue'
import { getRuleset } from '@/rulesets/registry'

// ✅ catálogo mínimo e genérico (contrato da UI)
const emptyCatalog = {
  id: 'empty',
  label: 'Empty Catalog',

  // para Selects (HeaderSection, etc.)
  // source: string -> [{label,value}] (ou [])
  getOptions: () => [],

  // lookup genérico (opcional)
  // kind pode ser 'feature', 'race', 'deity', etc. (depende do ruleset)
  getById: () => null,

  // índices genéricos opcionais (engine pode ignorar)
  indices: {},

  // coleções opcionais (UI pode ignorar)
  collections: {}
}

export const useCatalogStore = defineStore('catalog', () => {
  const systemId = ref('t20')

  const ruleset = computed(() => getRuleset(systemId.value))
  const rulesetLabel = computed(() => ruleset.value.label)

  // cache por systemId
  const catalogCache = new Map()

  // ✅ nunca nulo
  const catalogRef = shallowRef(emptyCatalog)

  function safeBuildCatalog(id) {
    try {
      const rs = getRuleset(id)
      const cat = rs?.buildCatalog?.()
      // garante o contrato mínimo
      return {
        ...emptyCatalog,
        ...(cat || {})
      }
    } catch (e) {
      console.error('[catalogStore] Failed to build catalog for:', id, e)
      return emptyCatalog
    }
  }

  function buildCatalogFor(id) {
    if (catalogCache.has(id)) return catalogCache.get(id)
    const cat = safeBuildCatalog(id)
    catalogCache.set(id, cat)
    return cat
  }

  watch(
    () => systemId.value,
    (id) => {
      catalogRef.value = buildCatalogFor(id)
    },
    { immediate: true }
  )

  const catalog = computed(() => catalogRef.value || emptyCatalog)

  function setSystem(id) {
    systemId.value = id
  }

  function clearCache() {
    catalogCache.clear()
    catalogRef.value = buildCatalogFor(systemId.value)
  }

  return {
    systemId,
    setSystem,
    ruleset,
    rulesetLabel,
    catalog,
    clearCache
  }
})
