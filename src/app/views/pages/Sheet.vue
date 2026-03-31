<script setup>
import { computed, ref, watch } from 'vue'

import { useRulesetSchemaStore } from '@/app/stores/rulesetSchemaStore'
const rulesetSchemaStore = useRulesetSchemaStore()

import { useCharacterStore } from '@/app/stores/characterStore'
const characterStore = useCharacterStore()

const props = defineProps({
  sheetId: {
    type: String,
    required: true
  }
})

const character = computed(() => {
  return characterStore.getCharacterById(props.sheetId)
})

const schema = ref(null)
const loading = ref(false)
const loadError = ref(null)

watch(
  () => character.value?.systemId,
  async (systemId) => {
    schema.value = null
    loadError.value = null

    if (!systemId) return

    try {
      loading.value = true
      schema.value = await rulesetSchemaStore.loadSchemaById(systemId)
    } catch (error) {
      console.error('Error loading schema for id:', systemId, error)
      loadError.value = error
    } finally {
      loading.value = false
    }
  },
  { immediate: true }
)

const sheetComponent = computed(() => {
  return schema.value?.sheetComponent ?? null
})

function handleCharacterUpdate(updatedCharacter) {
  characterStore.updateCharacter(updatedCharacter.id, updatedCharacter)
}
</script>

<template>
  <div v-if="loading">
    Carregando ficha...
  </div>

  <div v-else-if="loadError">
    Erro ao carregar schema da ficha.
  </div>

  <component
    :is="sheetComponent"
    v-else-if="character && schema && sheetComponent"
    :character="character"
    :schema="schema"
    @update:character="handleCharacterUpdate"
  />

  <div v-else>
    Ficha não encontrada.
  </div>
</template>