<script setup>
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

const model = defineModel({
  type: Object,
  required: true
})

defineProps({
  raceOptions: {
    type: Array,
    default: () => []
  },
  originOptions: {
    type: Array,
    default: () => []
  },
  classOptions: {
    type: Array,
    default: () => []
  },
})
</script>

<template>
  <div class="sheet-header grid grid-cols-7 gap-x-6 gap-y-2 items-start">
    <!-- PERSONAGEM -->
    <div class="col-span-2">
      <div class="field-label-row">
        <span class="field-label">PERSONAGEM</span>
      </div>

      <InputText
        v-model="model.name"
        unstyled
        readonly
        :pt="{
          root: { class: 'cf-input-root-no-border cf-input-name-root' }
        }"
      />
    </div>

    <div class="col-span-4 grid grid-cols-4 gap-x-6 gap-y-2 items-start">
      <!-- RAÇA -->
      <div>  
        <Select
          v-model="model.raceId"
          :options="raceOptions"
          optionLabel="label"
          optionValue="value"
          unstyled
          :pt="{
            root: { class: 'cf-select-root' },
            label: { class: 'cf-select-label' },
            dropdown: { class: 'cf-select-trigger' },
            overlay: { class: 'cf-select-overlay' },
            list: { class: 'cf-select-list' },
            option: { class: 'cf-select-option' }
          }"
        />
        <label class="field-label">RAÇA</label>
      </div>
  
      <!-- ORIGEM -->
      <div class="col-span-2"> 
        <Select
          v-model="model.originId"
          :options="originOptions"
          optionLabel="label"
          optionValue="value"
          unstyled
          :pt="{
            root: { class: 'cf-select-root' },
            label: { class: 'cf-select-label' },
            dropdown: { class: 'cf-select-trigger' },
            overlay: { class: 'cf-select-overlay' },
            list: { class: 'cf-select-list' },
            option: { class: 'cf-select-option' }
          }"
        />
        <label class="field-label">ORIGEM</label>
      </div>
  
      <!-- JOGADOR -->
      <div>  
        <InputText
          v-model="model.playerName"
          unstyled
          readonly
          :pt="{
            root: { class: 'cf-input-root' }
          }"
        />
        <label class="field-label">JOGADOR</label>
      </div>

      <!-- CLASSE -->
      <div class="col-span-2">  
        <Select
          v-model="model.classId"
          :options="classOptions"
          optionLabel="label"
          optionValue="value"
          unstyled
          :pt="{
            root: { class: 'cf-select-root' },
            label: { class: 'cf-select-label' },
            dropdown: { class: 'cf-select-trigger' },
            overlay: { class: 'cf-select-overlay' },
            list: { class: 'cf-select-list' },
            option: { class: 'cf-select-option' }
          }"
        />
        <label class="field-label">CLASSE</label>
      </div>

      <!--  -->
      <div>
      </div>

      <!-- EXP -->
      <div>  
        <InputText
          v-model="model.exp"
          unstyled
          :pt="{
            root: { class: 'cf-input-root' }
          }"
        />
        <label class="field-label">EXP</label>
      </div>
    </div>

    <!-- NÍVEL -->
    <div class="flex justify-end">
      <div class="level-box">
        <div class="level-label">NÍVEL</div>
        <div class="level-number">
          {{ model.level ?? 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sheet-header {
  background: #efefef;
  border: 1px solid #c8c8c8;
  padding: 12px 12px 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.field-label-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.field-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #b10000;
  text-transform: uppercase;
  line-height: 1;
  margin-top: 2px;
  margin-bottom: 4px;
}

.dash {
  font-size: 12px;
  color: #333;
}

/* INPUTTEXT */
:deep(.cf-input-root) {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #222;
  outline: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0 2px 2px 2px;
  font-size: 13px;
  line-height: 1.2;
  color: #111;
}

:deep(.cf-input-root-no-border) {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  box-shadow: none;
  padding: 0 2px 2px 2px;
  font-size: 13px;
  line-height: 1.2;
  color: #111;
}

:deep(.cf-input-root:focus),
:deep(.cf-input-root:focus-visible) {
  outline: none;
  box-shadow: none;
}

:deep(.cf-input-name-root) {
  height: 44px;
  padding: 4px 8px;
  font-size: 18px;
  font-family: Georgia, 'Times New Roman', serif;
  line-height: 1.2;
}

/* SELECT */
:deep(.cf-select-root) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #222;
  min-height: 24px;
  padding: 0 2px 2px 2px;
  cursor: pointer;
  box-shadow: none;
  outline: none;
  border-radius: 0;
}

:deep(.cf-select-root:focus),
:deep(.cf-select-root:focus-visible) {
  outline: none;
  box-shadow: none;
}

:deep(.cf-select-inline-root) {
  width: 150px;
}

:deep(.cf-select-label) {
  flex: 1;
  min-width: 0;
  font-size: 13px;
  line-height: 1.2;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.cf-select-trigger) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  color: #555;
  flex-shrink: 0;
}

/* OVERLAY DO SELECT */
:deep(.cf-select-overlay) {
  background: #ffffff;
  border: 1px solid #888;
  box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
}

:deep(.cf-select-list) {
  padding: 4px 0;
  margin: 0;
}

:deep(.cf-select-option) {
  padding: 6px 10px;
  font-size: 13px;
  color: #111;
  cursor: pointer;
}

:deep(.cf-select-option:hover) {
  background: #f3f3f3;
}

/* NÍVEL */
.level-box {
  width: 72px;
  text-align: center;
}

.level-label {
  font-size: 12px;
  font-weight: 700;
  color: #111;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.level-number {
  background: #b00000;
  color: #fff;
  border: 1px solid #7f0000;
  font-weight: 700;
  font-size: 34px;
  line-height: 1;
  padding: 8px 0;
}
</style>