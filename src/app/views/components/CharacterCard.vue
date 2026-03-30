<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'

const props = defineProps({
  character: { type: Object, required: true }
})

const emit = defineEmits(['open', 'delete'])

function handleOpen() {
  emit('open', props.character.id)
}

function handleDelete() {
  emit('delete', props.character.id)
}
</script>

<template>
  <Card class="w-full shadow-3 border-round-xl hover:shadow-5 transition-all">
    
    <!-- HEADER -->
    <template #title>
      <div class="flex justify-between align-items-center">
        <span class="text-lg font-bold">
          {{ character.name || 'Sem nome' }}
        </span>

        <Tag 
          :value="character.systemId.toUpperCase()" 
          severity="info" 
        />
      </div>
    </template>

    <!-- SUBTITLE -->
    <template #subtitle>
      <span class="text-sm text-500">
        Jogador: {{ character.playerName || '—' }}
      </span>
    </template>

    <!-- CONTENT -->
    <template #content>
        <img 
            :src="`/img/systems/${character.systemId}.png`" 
            class="w-full h-8rem object-cover border-round mb-2"
        />
      <p class="m-0 text-sm line-clamp-3">
        {{ character.description || 'Sem descrição...' }}
      </p>
    </template>

    <!-- FOOTER -->
    <template #footer>
      <div class="flex justify-between">
        <Button 
          label="Abrir" 
          icon="pi pi-eye" 
          size="small"
          @click="handleOpen"
        />

        <Button 
          icon="pi pi-trash" 
          severity="danger" 
          text
          @click="handleDelete"
        />
      </div>
    </template>

  </Card>
</template>