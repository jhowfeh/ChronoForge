import { createEmptyCharacter } from '@/core/character/createEmptyCharacter'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useCatalogStore } from './catalogStore'

export const useCharacterStore = defineStore('character', () => {
  const catalogStore = useCatalogStore()

  const character = ref(createEmptyCharacter({ systemId: catalogStore.systemId.value }))

  const schema = computed(() => catalogStore.ruleset.schema)
  const featureIndex = computed(() => catalogStore.catalog?.featureIndex)

  const derived = computed(() =>
    catalogStore.ruleset.engine.computeDerived({
      schema: schema.value,
      character: character.value,
      featureIndex: featureIndex.value
    })
  )

  watch(
    () => character.value.progression.originId,
    (originId) => {
      const origin = catalogStore.catalog?.getOrigin?.(originId)
      character.value.build.grantedFeatureIds.origin =
        origin?.grantedFeatureIds ? [...origin.grantedFeatureIds] : []

      if (origin?.trainedSkills) {
        for (const sk of origin.trainedSkills) {
          const prev = character.value.training.skills[sk] || {}
          character.value.training.skills[sk] = {
            trained: true,
            misc: prev.misc || 0,
            attr: prev.attr ?? null,
            spec: prev.spec ?? ''
          }
        }
      }

      if (origin?.proficiencies) {
        character.value.proficiencies.misc = [
          ...new Set([...(character.value.proficiencies.misc || []), ...origin.proficiencies])
        ]
      }
    },
    { immediate: true }
  )

  function reset() {
    character.value = createEmptyCharacter({ systemId: catalogStore.systemId.value })
  }

  // ✅ se trocar o sistema, recria a ficha
  watch(
    () => catalogStore.systemId.value,
    () => reset()
  )

  return { character, schema, derived, reset }
})
