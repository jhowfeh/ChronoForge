<script setup>
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'

import { useCatalogStore } from '@/stores/catalogStore'

const catalog = useCatalogStore()
</script>

<template>
  <Card>
    <template #title>Origens</template>
    <template #content>
      <DataTable :value="catalog.catalog.origins" stripedRows>
        <Column field="label" header="Origem" />
        <Column field="value" header="ID" />
        <Column header="Perícias treinadas">
          <template #body="{ data }">
            <Tag v-for="sk in data.trainedSkills" :key="sk" class="mr-2" :value="sk" />
          </template>
        </Column>
        <Column header="Features">
          <template #body="{ data }">
            <Tag v-for="fid in data.grantedFeatureIds" :key="fid" severity="info" class="mr-2" :value="fid" />
          </template>
        </Column>
      </DataTable>
      <p class="hint">Esta lista está mínima (exemplos). Substitua por seu arquivo completo de origens.</p>
    </template>
  </Card>
</template>

<style scoped>
.hint { opacity: .75; margin-top: .75rem; }
</style>
