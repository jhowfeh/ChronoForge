<script setup>
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { computed } from 'vue'

const props = defineProps({
  schema: { type: Object, required: true },
  character: { type: Object, required: true },
  catalog: { type: Object, required: true }
})

/** ===============================
 *  Canon / compat storage
 *  =============================== */
function ensureBasics() {
  if (!props.character.basics) props.character.basics = {}
  if (!props.character.basics.meta) props.character.basics.meta = {}
  return props.character.basics
}
function ensureProgression() {
  if (!props.character.progression) props.character.progression = {}
  return props.character.progression
}

/** Nome e Jogador (universais) */
const nameValue = computed({
  get: () => props.character.basics?.name ?? props.character.name ?? '',
  set: (v) => {
    ensureBasics().name = v ?? ''
    props.character.name = ensureBasics().name
  }
})
const playerValue = computed({
  get: () => props.character.basics?.player ?? props.character.player ?? '',
  set: (v) => {
    ensureBasics().player = v ?? ''
    props.character.player = ensureBasics().player
  }
})

/** Level (universal, canônico pro engine) */
const levelValue = computed({
  get() {
    return (
      Number(props.character.progression?.level) ||
      Number(props.character.basics?.level) ||
      Number(props.character.level) ||
      1
    )
  },
  set(v) {
    const num = Number(v || 1)
    ensureProgression().level = num
    ensureBasics().level = num
    props.character.level = num
  }
})

/** Meta genérico (para campos do schema) */
function getMetaValue(key, fallback = null) {
  const b = ensureBasics()
  if (b.meta?.[key] !== undefined) return b.meta[key]
  return fallback
}
function setMetaValue(key, v) {
  ensureBasics().meta[key] = v
}

/** Header fields vindo do schema */
const headerFields = computed(() => props.schema.headerFields || [])

/** Agrupar por linha */
const rows = computed(() => {
  const byRow = new Map()
  for (const f of headerFields.value) {
    const row = Number(f.row || 2)
    if (!byRow.has(row)) byRow.set(row, [])
    byRow.get(row).push(f)
  }
  // ordena linhas e mantém ordem de fields (por "order" ou span)
  const keys = Array.from(byRow.keys()).sort((a, b) => a - b)
  return keys.map(k =>
    byRow.get(k).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  )
})

/** Options (sempre array, sempre label/value) */
function normalizeOptions(list) {
  if (!Array.isArray(list)) return []
  return list
    .filter(Boolean)
    .map(o => {
      if (typeof o === 'string' || typeof o === 'number') {
        return { label: String(o), value: o }
      }
      const value = o.value ?? o.id ?? o.key ?? o.code ?? o.slug ?? o.label
      const label = o.label ?? o.name ?? o.text ?? o.title ?? value
      return { ...o, value, label: String(label ?? '') }
    })
    .filter(o => o.label.length > 0)
}

function getOptionsForField(f) {
  const source = f?.source
  if (!source) return []
  const fn = props.catalog?.getOptions
  const out = typeof fn === 'function' ? fn.call(props.catalog, source) : []
  return normalizeOptions(out)
}

/** CSS grid span */
function spanStyle(f) {
  const span = Number(f.span || 2)
  return { gridColumn: `span ${Math.min(Math.max(span, 1), 12)}` }
}
</script>

<template>
  <div class="header-wrapper">
    <!-- Linha 1 fixa (universal) -->
    <div class="grid grid-cols-12 gap-4">
      <div class="field col-span-4">
        <div class="line">
          <InputText 
            v-model="playerValue" 
            class="line-input w-full" 
          />
        </div>
        <div class="label">JOGADOR</div>
      </div>

      <div class="field col-span-6">
        <div class="line">
          <InputText 
            v-model="nameValue" 
            class="line-input w-full" 
          />
        </div>
        <div class="label">NOME DO PERSONAGEM</div>
      </div>

      <div class="field col-span-2">
        <div class="line">
          <InputNumber
            v-model="levelValue"
            class="line-input w-full"
            inputClass="num"
          />
        </div>
        <div class="label">NÍVEL</div>
      </div>

    </div>

    <div class="grid grid-cols-12 gap-4">
      <!-- Linhas dinâmicas (schema) -->
       
      <div  
        v-for="(f, idx) in headerFields" 
        :key="idx"
        class="field"
        :style="{ gridColumn: `span ${f.span ?? 12} / span ${f.span ?? 12}` }"
      >
        <div class="line">
          <Select
            v-if="f.type === 'select'"
            :modelValue="getMetaValue(f.key, null)"
            @update:modelValue="v => setMetaValue(f.key, v)"
            :options="getOptionsForField(f)"
            optionLabel="label"
            optionValue="value"
            class="line-input w-full select"
            :placeholder="f.placeholder ?? ''"
          />

          <!-- NUMBER -->
          <InputNumber
            v-else-if="f.type === 'number'"
            :modelValue="getMetaValue(f.key, null)"
            @update:modelValue="v => setMetaValue(f.key, v)"
            :useGrouping="false"
            class="line-input w-full"
            inputClass="num"
          />

          <!-- TEXT default -->
          <InputText
            v-else
            :modelValue="getMetaValue(f.key, '')"
            @update:modelValue="v => setMetaValue(f.key, v)"
            class="line-input w-full"
          />
        </div>
        <div class="label">{{ f.label }}</div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Wrapper geral */
.header-wrapper{
  display:flex;
  flex-direction:column;
  gap:18px;
}

/* Linha 1 (nome/jogador) */
.row-1{
  display:grid;
  grid-template-columns: repeat(12, 1fr);
  gap:18px;
}

.span-7{ grid-column: span 7; }
.span-5{ grid-column: span 5; }

/* Linhas dinâmicas */
.row-dyn{
  display:grid;
  grid-template-columns: repeat(12, 1fr);
  gap:18px;
}

/* Campo */
.field{ min-width:0; }

/* Linha preta contínua */
.line{
  border-bottom:2px solid #111;
  padding-bottom:2px;
}

/* Label em CAPS pequeno */
.label{
  margin-top:4px;
  font-size:.62rem;
  font-weight:900;
  letter-spacing:.05em;
  text-transform:uppercase;
  color:#222;
}

/* Inputs “na linha” (InputText é no mesmo elemento: .line-input.p-inputtext) */
:deep(.line-input.p-inputtext),
:deep(.line-input .p-inputnumber-input){
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  border-radius: 0 !important;
  padding: 0 2px !important;
  font-weight: 700;
  background: transparent !important;
}

/* Remove contorno SOMENTE quando focado (PrimeVue aplica isso via .p-focus / :focus-visible) */
:deep(.line-input.p-inputtext:focus),
:deep(.line-input.p-inputtext:focus-visible),
:deep(.line-input .p-inputnumber-input:focus),
:deep(.line-input .p-inputnumber-input:focus-visible){
  box-shadow: none !important;
  outline: none !important;
}

/* some o “retângulo” quando o InputNumber está selecionado/focado */
:deep(.line-input .p-inputnumber-input:focus),
:deep(.line-input .p-inputnumber-input:focus-visible){
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

/* (extra) se o Prime aplicar foco no wrapper em vez do input */
:deep(.line-input.p-inputnumber.p-focus),
:deep(.line-input.p-inputnumber:focus-within){
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

/* (opcional) força aparência “flat” do input em alguns browsers */
:deep(.line-input .p-inputnumber-input){
  -webkit-appearance: none;
  appearance: none;
}

/* Select “na linha” */
:deep(.select.p-select){
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  background: transparent !important;
}
:deep(.select.p-select.p-focus),
:deep(.select.p-select:focus-within){
  box-shadow: none !important;
  outline: none !important;
  border: none !important;
}
:deep(.select .p-select-label){
  padding: 0 2px !important;
  font-weight: 700;
}
:deep(input:-webkit-autofill),
:deep(input:-webkit-autofill:hover),
:deep(input:-webkit-autofill:focus){
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  transition: background-color 9999s ease-out 0s;
}
</style>
