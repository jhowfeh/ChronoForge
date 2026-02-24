<script setup>
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import { computed } from 'vue'

const props = defineProps({
  schema: { type: Object, required: true },
  character: { type: Object, required: true },
  derived: { type: Object, required: true }
})

/**
 * Context builder (mesma ideia do SkillsSection)
 * Aqui eu uso só o que interessa: attributes
 */
function buildRulesContext(schema, character) {
  const sheet = character?.sheet || {}

  // Mantém compatibilidade: aceita attributes/base em qualquer lugar
  const attributes =
    character?.attributes ??
    sheet?.attributes ??
    {}

  return { schema, attributes, sheet }
}

const ctx = computed(() => buildRulesContext(props.schema, props.character))

/**
 * Ponte canônica para editar atributos de criação:
 * character.sheet.attributes.creation.base
 *
 * (Não use mais character.attributes.base; mantenha só como fallback de migração.)
 */
const attrBase = computed({
  get() {
    // garante estrutura mínima
    if (!props.character.sheet) props.character.sheet = {}
    if (!props.character.sheet.attributes) props.character.sheet.attributes = {}

    // se ainda não existir creation (personagem antigo), cria com base legado se houver
    if (!props.character.sheet.attributes.creation) {
      const legacy =
        props.character.attributes?.base ||
        props.character.sheet.attributes.base || // legado antigo dentro de sheet
        {}

      props.character.sheet.attributes.creation = {
        method: props.schema?.defaults?.attributeMethod ?? 'manual',
        base: { ...legacy },
        notes: ''
      }
    }

    if (!props.character.sheet.attributes.creation.base) {
      props.character.sheet.attributes.creation.base = {}
    }

    return props.character.sheet.attributes.creation.base
  },
  set(v) {
    if (!props.character.sheet) props.character.sheet = {}
    if (!props.character.sheet.attributes) props.character.sheet.attributes = {}
    if (!props.character.sheet.attributes.creation) {
      props.character.sheet.attributes.creation = {
        method: props.schema?.defaults?.attributeMethod ?? 'manual',
        base: {},
        notes: ''
      }
    }
    props.character.sheet.attributes.creation.base = v || {}
  }
})

function ensureAttrKey(key) {
  if (!attrBase.value || typeof attrBase.value !== 'object') attrBase.value = {}
  if (attrBase.value[key] === undefined || attrBase.value[key] === null) {
    attrBase.value[key] = props.schema?.defaults?.attributeBase ?? 0
  }
  return true
}
</script>

<template>
  <Card>
    <template #title>Atributos</template>

    <template #content>
      <div class="attr-wrapper">
        <div class="attr-header">
          <span>HABILIDADES</span>
          <span>VALOR</span>
        </div>

        <div v-for="a in props.schema.attributes" :key="a.key" class="attr-row">
          <!-- bloco preto -->
          <div class="skill-box">
            <div class="skill-abbr">{{ a.acronym }}</div>
            <div class="skill-name">{{ a.label }}</div>
          </div>

          <!-- quadrado valor -->
          <div class="value-box">
            <InputNumber
              v-if="ensureAttrKey(a.key)"
              v-model="attrBase[a.key]"
              :useGrouping="false"
              inputClass="value-input"
            />
          </div>
        </div>

        <!-- (opcional) debug rápido de onde está lendo -->
        <!--
        <pre style="opacity:.6;font-size:.75rem;margin-top:10px">
level? {{ props.character.level ?? props.character.sheet?.level ?? props.character.basics?.level ?? props.character.sheet?.basics?.level }}
attrs(base): {{ JSON.stringify(ctx.attributes?.base ?? ctx.attributes, null, 2) }}
        </pre>
        -->
      </div>
    </template>
  </Card>
</template>

<style scoped>
.attr-wrapper{
  --dark:#1f2937;
  --line:#111;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.attr-header{
  display:flex;
  justify-content:space-between;
  font-size:.65rem;
  font-weight:900;
  letter-spacing:.05em;
  text-transform:uppercase;
  padding:0 2px;
}

.attr-row{
  display:flex;
  align-items:center;
  gap:8px;
}

.skill-box{
  flex:1;
  background:var(--dark);
  color:#fff;
  padding:8px 10px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

.skill-abbr{
  font-weight:1000;
  font-size:1.05rem;
  letter-spacing:.05em;
  line-height:1;
}

.skill-name{
  font-size:.65rem;
  line-height:1.1;
  opacity:.95;
}

.value-box{
  width:48px;
  height:38px;
  border:2px solid var(--line);
  display:flex;
  align-items:center;
  justify-content:center;
  background:#fff;
}

:deep(.value-input){
  width:100%;
  text-align:center;
  font-weight:900;
  font-size:.95rem;
  border:none !important;
  outline:none !important;
  box-shadow:none !important;
  padding:0;
}
</style>
