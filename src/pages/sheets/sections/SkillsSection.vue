<script setup>
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import { computed } from 'vue'

const props = defineProps({
  schema: { type: Object, required: true },
  character: { type: Object, required: true },
  derived: { type: Object, required: true }
})

/** ========= storage compatível ========= */
function getTrainingRoot() {
  if (props.character.training) return props.character.training
  if (props.character.sheet?.training) return props.character.sheet.training
  props.character.training = { skills: {}, saves: {} }
  return props.character.training
}

function ensureSkillEntry(skillKey) {
  const tr = getTrainingRoot()
  if (!tr.skills) tr.skills = {}
  if (!tr.skills[skillKey] || typeof tr.skills[skillKey] !== 'object') {
    tr.skills[skillKey] = { trained: false, misc: 0, attr: null, spec: '' }
  }
  // normaliza
  tr.skills[skillKey].trained = !!tr.skills[skillKey].trained
  tr.skills[skillKey].misc = Number(tr.skills[skillKey].misc || 0)
  if (!('attr' in tr.skills[skillKey])) tr.skills[skillKey].attr = null
  if (!('spec' in tr.skills[skillKey])) tr.skills[skillKey].spec = ''
  return tr.skills[skillKey]
}

/** ========= ctx builder (multi-formato) ========= */
function buildRulesContext(schema, character) {
  const sheet = character?.sheet || {}
  const basics = character?.basics || sheet?.basics || {}

  const level =
    Number(character?.level) ||
    Number(basics?.level) ||
    Number(sheet?.level) ||
    1

  // atributos podem estar em:
  // - character.attributes.base  (novo)
  // - character.attributes       (antigo achatado)
  // - character.sheet.attributes.base
  const attrs =
    character?.attributes ??
    sheet?.attributes ??
    {}

  // mantém compatível com seu schema.skillBreakdown (ele tenta base e depois direto)
  const attributes = attrs

  const training =
    character?.training ||
    sheet?.training ||
    { skills: {}, saves: {} }

  const equipment =
    character?.equipment ||
    sheet?.equipment ||
    {}

  const bonuses =
    character?.bonuses ||
    sheet?.bonuses ||
    {}

  return { schema, level, attributes, training, equipment, bonuses, sheet }
}

const ctx = computed(() => buildRulesContext(props.schema, props.character))

/** ========= helpers ========= */
const attrOptions = computed(() =>
  (props.schema.attributes || []).map(a => ({
    label: `${a.acronym} — ${a.label}`,
    value: a.key
  }))
)

function attrAcronym(attrKey) {
  return props.schema.attributes?.find(a => a.key === attrKey)?.acronym ?? String(attrKey || '').toUpperCase()
}

function getSkill(skillKey) {
  return props.schema.skills?.find(s => s.key === skillKey) ?? null
}

function part(bd, key) {
  return bd?.parts?.find(p => p.key === key) ?? null
}

function partValue(bd, key) {
  return part(bd, key)?.value ?? 0
}

/** ========= rows ========= */
const rows = computed(() => {
  const list = props.schema.skills || []
  return list
    .filter(s => !(s.tags || []).includes('save')) // esconde resistências (opcional)
    .map(s => {
      const entry = ensureSkillEntry(s.key)
      const bdFn = props.schema?.rules?.skillBreakdown
      const bd = typeof bdFn === 'function'
        ? bdFn(ctx.value, s.key)
        : { ok: true, parts: [], total: 0 }

      return {
        key: s.key,
        label: s.label,
        baseAttr: s.baseAttr,
        trainedOnly: !!s.trainedOnly,
        armorPenalty: !!s.armorPenalty,
        isSpecialization: !!s.isSpecialization,
        entry,
        bd
      }
    })
})

const hasArmorPart = computed(() => rows.value.some(r => !!part(r.bd, 'armor')))

/** ========= setters ========= */
function setTrained(skillKey, v) {
  ensureSkillEntry(skillKey).trained = !!v
}
function setMisc(skillKey, v) {
  ensureSkillEntry(skillKey).misc = Number(v || 0)
}
function setAttr(skillKey, v) {
  ensureSkillEntry(skillKey).attr = v || null
}
function setSpec(skillKey, v) {
  ensureSkillEntry(skillKey).spec = String(v || '')
}
</script>

<template>
  <Card>
    <template #title>Perícias</template>

    <template #content>
      <div class="skills-sheet">
        <div class="skills-head">
          <div class="title">PERÍCIAS</div>
          <div class="col">TOTAL</div>
          <div class="col">GRAD.</div>
          <div class="col wide">MOD. HABILIDADE</div>
          <div class="col">TREINO</div>
          <div class="col">OUTROS</div>
          <div class="col" v-if="hasArmorPart">PEN.</div>
        </div>

        <div class="skills-body">
          <div v-for="r in rows" :key="r.key" class="skill-row">
            <!-- Nome -->
            <div class="name">
              <span class="label">{{ r.label.toUpperCase() }}</span>

              <span v-if="r.isSpecialization" class="spec">
                (
                <input
                  class="spec-input"
                  :value="r.entry.spec"
                  @input="e => setSpec(r.key, e.target.value)"
                  placeholder="__________"
                />
                )
              </span>

              <span v-if="r.trainedOnly" class="star">*</span>
              <span v-if="r.armorPenalty" class="star">**</span>
            </div>

            <!-- Total -->
            <div class="box">
              <span v-if="r.bd?.total === null">—</span>
              <span v-else>{{ r.bd?.total ?? 0 }}</span>
            </div>

            <!-- Grad (½ nível) -->
            <div class="eq">
              <span class="sign">=</span>
              <div class="mini">{{ partValue(r.bd, 'half') }}</div>
            </div>

            <!-- Mod Habilidade -->
            <div class="eq wide">
              <span class="sign">+</span>
              <div class="mini">{{ partValue(r.bd, 'attr') }}</div>

              <Select
                class="attr-select"
                :options="attrOptions"
                optionLabel="label"
                optionValue="value"
                :modelValue="r.bd?.attrKey || r.entry.attr || r.baseAttr"
                @update:modelValue="v => setAttr(r.key, v)"
                :disabled="r.bd?.total === null"
              >
                <template #value="{ value }">
                  <span class="attr-pill">{{ attrAcronym(value) }}</span>
                </template>
              </Select>
            </div>

            <!-- Treino -->
            <div class="eq">
              <span class="sign">+</span>
              <div class="mini">{{ partValue(r.bd, 'training') }}</div>
              <Checkbox
                :binary="true"
                :modelValue="r.entry.trained"
                @update:modelValue="v => setTrained(r.key, v)"
              />
            </div>

            <!-- Outros -->
            <div class="eq">
              <span class="sign">+</span>
              <div class="mini">
                <InputNumber
                  :modelValue="r.entry.misc"
                  :useGrouping="false"
                  inputClass="miniInput"
                  class="miniInputWrap"
                  @update:modelValue="v => setMisc(r.key, v)"
                  :disabled="r.bd?.total === null"
                />
              </div>
            </div>

            <!-- Penalidade (Armadura) se existir -->
            <div class="eq" v-if="part(r.bd, 'armor')">
              <span class="sign">−</span>
              <div class="mini">{{ Math.abs(partValue(r.bd, 'armor')) }}</div>
            </div>

            <!-- placeholder pra manter alinhamento quando algumas têm e outras não -->
            <div class="eq ghost" v-else-if="hasArmorPart">
              <span class="sign">&nbsp;</span>
              <div class="mini ghostbox"></div>
            </div>
          </div>
        </div>

        <!-- Debug útil (remove depois) -->
        <div class="skills-foot">
          <div>* Somente treinado.</div>
          <div>** Penalidade de armadura.</div>
          <div class="lvl">Nível (ctx): {{ ctx.level }} | Grad.: {{ Math.floor((Number(ctx.level)||1)/2) }}</div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.skills-sheet{
  --line:#111;
  --muted:#666;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
}

.skills-head{
  display:grid;
  grid-template-columns: 1fr 64px 72px 200px 110px 110px 72px;
  align-items:end;
  gap:10px;
  margin-bottom: 8px;
}
.title{
  font-weight:900;
  letter-spacing:.05em;
  padding:4px 10px;
  background:#111;
  color:#fff;
  width:fit-content;
}
.col{
  font-weight:900;
  font-size:.7rem;
  text-transform:uppercase;
  letter-spacing:.05em;
  text-align:center;
}

.skills-body{
  display:flex;
  flex-direction:column;
  gap:10px;
}
.skill-row{
  display:grid;
  grid-template-columns: 1fr 64px 72px 200px 110px 110px 72px;
  align-items:center;
  gap:10px;
}

.name{
  display:flex;
  align-items:baseline;
  gap:6px;
  border-bottom:1px solid var(--line);
  padding-bottom:2px;
}
.label{ font-weight:800; letter-spacing:.03em; font-size:.9rem; }
.star{ font-weight:900; font-size:.8rem; }
.spec{ font-size:.85rem; }
.spec-input{
  width: 120px;
  border:none;
  border-bottom:1px solid var(--line);
  outline:none;
  font:inherit;
  padding:0 2px;
}

.box{
  border:2px solid var(--line);
  height:30px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:900;
}
.eq{
  display:flex;
  align-items:center;
  gap:8px;
}
.eq.wide{ gap:8px; }
.sign{
  font-weight:900;
  width:14px;
  text-align:center;
}
.mini{
  width:44px;
  height:28px;
  border:2px solid var(--line);
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:900;
}

/* InputNumber compacto */
.miniInputWrap{ width:44px; }
:deep(.miniInput){
  width:100%;
  text-align:center;
  font-weight:900;
  border:none !important;
  outline:none !important;
  box-shadow:none !important;
  padding:0;
}

/* PrimeVue Select */
.attr-select{ width: 82px; }
:deep(.p-select){
  border:2px solid var(--line);
  border-radius:0;
  height:28px;
}
:deep(.p-select-label){
  padding:0 .4rem;
  font-weight:900;
  display:flex;
  align-items:center;
  justify-content:center;
}
.attr-pill{ font-weight:900; }

.eq.ghost{ opacity:0; }
.ghostbox{ border-color: transparent; }

.skills-foot{
  margin-top: 10px;
  font-size:.75rem;
  color:var(--muted);
  display:flex;
  gap:16px;
  align-items:center;
}
.lvl{ margin-left:auto; }

@media (max-width: 980px){
  .skills-head, .skill-row{
    grid-template-columns: 1fr 56px 64px 180px 100px 100px 64px;
  }
}
@media (max-width: 860px){
  .skills-head{ display:none; }
  .skill-row{
    grid-template-columns: 1fr 64px;
    gap:8px;
  }
  .eq{ display:none; }
  .box{ justify-self:end; }
  .skills-foot .lvl{ display:none; }
}
</style>
