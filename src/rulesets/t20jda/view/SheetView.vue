<script setup>
import CharacterHeader from './components/CharacterHeader.vue'

const character = defineModel('character', {
  type: Object,
  required: true
})

defineProps({
  schema: {
    type: Object,
    required: true
  }
})

const creatureTypeOptions = [
  { label: 'Humanoide', value: 'humanoid' },
  { label: 'Monstro', value: 'monster' }
]

const raceOptions = [
  { label: 'Elfo', value: 'elf' },
  { label: 'Humano', value: 'human' }
]

const originOptions = [
  { label: 'Herdeiro', value: 'heir' },
  { label: 'Acólito', value: 'acolyte' }
]

const classOptions = [
  { label: 'Caçador', value: 'hunter' },
  { label: 'Guerreiro', value: 'fighter' }
]
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12">
      <CharacterHeader
        v-model="character"
        :race-options="raceOptions"
        :origin-options="originOptions"
        :class-options="classOptions"
        :creature-type-options="creatureTypeOptions"
      />
    </div>

    <div class="col-span-12">
      Conteúdo da ficha aqui
    </div>
  </div>
</template>