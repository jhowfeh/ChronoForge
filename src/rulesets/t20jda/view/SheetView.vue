<script setup>
defineProps({
  character: { type: Object, required: true },
  schema: { type: Object, required: true }
})
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 card p-4">
      <h1>{{ character.basics?.name || 'Sem nome' }}</h1>
      <p>{{ character.basics?.playerName }}</p>
    </div>

    <div class="col-span-12 md:col-span-6 card p-4">
      <h2>Atributos</h2>
      <p>Força: {{ character.attributes?.str }}</p>
      <p>Destreza: {{ character.attributes?.dex }}</p>
    </div>
  </div>
</template>