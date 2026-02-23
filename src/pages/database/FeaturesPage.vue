<script setup>
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'

import { useCatalogStore } from '@/stores/catalogStore'

const catalog = useCatalogStore()
const q = ref('')

const rows = computed(() => {
  const s = q.value.trim().toLowerCase()
  const all = catalog.catalog.features || []
  if (!s) return all
  return all.filter(f => `${f.id} ${f.name} ${f.group}`.toLowerCase().includes(s))
})
</script>

<template>
  <Card>
    <template #title>Features</template>
    <template #content>
      <div class="mb-3">
        <span class="p-input-icon-left w-full">
          <i class="pi pi-search" />
          <InputText v-model="q" placeholder="Buscar por id/nome..." class="w-full" />
        </span>
      </div>
      <DataTable :value="rows" stripedRows paginator :rows="15">
        <Column field="name" header="Nome" />
        <Column field="id" header="ID" />
        <Column field="group" header="Grupo" />
        <Column field="kind" header="Tipo" />
      </DataTable>
    </template>
  </Card>
</template>
