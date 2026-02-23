<script setup>
import Card from 'primevue/card'
import Divider from 'primevue/divider'

import { useCatalogStore } from '@/stores/catalogStore'
import { useCharacterStore } from '@/stores/characterStore'

import AttributesSection from './sections/AttributesSection.vue'
import HeaderSection from './sections/HeaderSection.vue'
import SkillsSection from './sections/SkillsSection.vue'

const cs = useCharacterStore()
const catalogStore = useCatalogStore()
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <Card>
        <template #title>Ficha</template>
        <template #content>
          <HeaderSection
            :schema="cs.schema"
            :character="cs.character"
            :catalog="catalogStore.catalog"
          />

          <Divider />

          <div class="grid">
            <div class="col-12 md:col-6">
              <AttributesSection :schema="cs.schema" :character="cs.character" :derived="cs.derived" />
            </div>
            <div class="col-12 md:col-6">
              <SkillsSection :schema="cs.schema" :character="cs.character" :derived="cs.derived" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
