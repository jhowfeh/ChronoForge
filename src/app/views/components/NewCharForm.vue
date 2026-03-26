<script setup>
import { computed } from 'vue'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Card from 'primevue/card'

const props = defineProps({
  systems: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['save'])

const character = defineModel({ required: true })

const selectedSystem = computed(() =>
  props.systems.find(s => s.id === character.value.systemId) ?? null
)

const selectedSystemImage = computed(() => {
  if (!selectedSystem.value?.image) return ''
  return `/img/systems/${selectedSystem.value.image}`
})

const hasSelectedSystem = computed(() => !!character.value.systemId)

const canSave = computed(() => {
  return (
    !!character.value.systemId &&
    !!character.value.basics?.playerName?.trim() &&
    !!character.value.basics?.name?.trim()
  )
})

function handleSave() {
  if (!canSave.value) return
  emit('save', character.value)
}
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <!-- COLUNA ESQUERDA -->
    <div class="col-span-12 lg:col-span-4">
      <Card class="rounded-2xl shadow-sm h-full">
        <template #content>
          <div class="flex flex-col gap-5">
            <div>
              <label class="block mb-2 font-medium">Sistema</label>
              <Select
                v-model="character.systemId"
                :options="systems"
                optionLabel="label"
                optionValue="id"
                placeholder="Selecione um sistema"
                fluid
              />
            </div>

            <div
              class="rounded-2xl border border-surface-200 bg-surface-50 p-4 min-h-[320px] flex items-center justify-center"
            >
              <div v-if="selectedSystem" class="w-full flex justify-center">
                <img
                  :key="selectedSystem.id"
                  :src="selectedSystemImage"
                  :alt="selectedSystem.label"
                  class="max-h-64 max-w-full object-contain"
                />
              </div>

              <div
                v-else
                class="text-center text-surface-500 text-sm"
              >
                Escolha um sistema para ver a capa.
              </div>
            </div>

            <div v-if="selectedSystem">
              <div class="text-sm text-surface-500 mb-1">
                Sistema selecionado
              </div>
              <div class="text-2xl font-semibold leading-tight">
                {{ selectedSystem.label }}
              </div>
              <div class="text-sm text-surface-500 mt-2">
                A ficha será criada com base neste ruleset.
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- COLUNA DIREITA -->
    <div
        v-if="character.systemId != ''"
        class="col-span-12 lg:col-span-8"
    >
      <Card class="rounded-2xl shadow-sm h-full">
        <template #content>
          <div class="flex flex-col h-full">
            <div class="mb-6">
              <h2 class="text-4xl font-bold m-0">Personagem</h2>
              <p class="text-surface-500 mt-3 mb-0">
                Escolha o sistema e preencha as informações iniciais do personagem.
              </p>
            </div>

            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 md:col-span-6">
                <label class="block mb-2 font-medium">Nome do Jogador</label>
                <InputText
                  v-model="character.basics.playerName"
                  placeholder="Digite o nome do jogador"
                  :disabled="!hasSelectedSystem"
                  fluid
                />
              </div>

              <div class="col-span-12 md:col-span-6">
                <label class="block mb-2 font-medium">Nome do Personagem</label>
                <InputText
                  v-model="character.basics.name"
                  placeholder="Digite o nome do personagem"
                  :disabled="!hasSelectedSystem"
                  fluid
                />
              </div>

              <div class="col-span-12">
                <label class="block mb-2 font-medium">Descrição</label>
                <Textarea
                  v-model="character.basics.description"
                  rows="8"
                  placeholder="Descreva aparência, personalidade, história ou observações importantes"
                  :disabled="!hasSelectedSystem"
                  fluid
                />
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <Button
                label="Salvar"
                icon="pi pi-save"
                :disabled="!canSave"
                @click="handleSave"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>