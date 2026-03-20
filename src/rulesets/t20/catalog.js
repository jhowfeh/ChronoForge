import { generalCombatFeatures } from './data/feats/general.combat'
import { generalFateFeatures } from './data/feats/general.fate'
import { generalMagicFeatures } from './data/feats/general.magic'

import { skills } from './data/skills.list'
import { spells } from './data/spells.list'

import { originFeatures } from './data/feats/origins.features'
import { origins } from './data/origins.list'

import { divineFeatures } from './data/feats/deities.features'
import { deities } from './data/deities.list'

import { racialFeatures } from './data/feats/races.features'
import { races } from './data/races.list'

import { classesFeatures } from './data/feats/classes.features'
import { classes } from './data/classes.list'

// src/rulesets/t20/catalog.js
export function buildT20Catalog() {
  const features = [
    ...generalCombatFeatures,
    ...generalFateFeatures,
    ...generalMagicFeatures,
    ...originFeatures,
    ...divineFeatures,
    ...racialFeatures,
    ...classesFeatures
  ]

  const featureIndex = new Map(features.map(f => [f.id, f]))
  const originIndex  = new Map((origins || []).map(o => [o.id, o]))
  const deityIndex   = new Map((deities || []).map(d => [d.id, d]))
  const raceIndex    = new Map((races || []).map(r => [r.id, r]))
  const classIndex   = new Map((classes || []).map(c => [c.id, c]))
  const skillIndex  = new Map((skills || []).map(s => [s.key, s]))
  const spellIndex  = new Map((spells || []).map(s => [s.id, s]))

  const catalog = {
    id: 't20',
    label: 'Tormenta 20',

    // coleções (UI pode usar como options diretamente)
    features,
    origins: origins || [],
    deities: deities || [],
    races: races || [],
    classes: classes || [],
    skills: skills || [],
    spells: spells || [],

    // índices
    featureIndex,
    originIndex,
    deityIndex,
    raceIndex,
    classIndex,
    skillIndex,
    spellIndex,

    // ✅ interface genérica pro UI (HeaderSection, etc.)
    // sempre retorna Array
    getOptions(source) {
      if (source === 'origins') return Array.isArray(this.origins) ? this.origins : []
      if (source === 'deities') return Array.isArray(this.deities) ? this.deities : []
      if (source === 'races')   return Array.isArray(this.races) ? this.races : []
      if (source === 'classes') return Array.isArray(this.classes) ? this.classes : []
      if (source === 'skills')  return Array.isArray(this.skills) ? this.skills : []
      if (source === 'spells')  return Array.isArray(this.spells) ? this.spells : []
      return []
    },

    // ✅ lookup genérico (pra UI/engine multisistema)
    // kind: 'feature' | 'origin' | 'deity' | 'race' (e outros no futuro)
    getById(kind, id) {
      if (!id) return null
      if (kind === 'feature') return this.featureIndex?.get(id) || null
      if (kind === 'origin')  return this.originIndex?.get(id) || null
      if (kind === 'deity')   return this.deityIndex?.get(id) || null
      if (kind === 'race')    return this.raceIndex?.get(id) || null
      if (kind === 'class')   return this.classIndex?.get(id) || null
      if (kind === 'skill')   return this.skillIndex?.get(id) || null
      if (kind === 'spell')   return this.spellIndex?.get(id) || null
      return null
    },

    // getters específicos (continua compatível com seu código atual)
    getFeature: (id) => featureIndex.get(id) || null,
    getOrigin:  (id) => originIndex.get(id) || null,
    getDeity:   (id) => deityIndex.get(id) || null,
    getRace:    (id) => raceIndex.get(id) || null,
    getClass:   (id) => classIndex.get(id) || null,
    getSkill: (key) => skillIndex.get(key) || null,
    getSpell: (id)  => spellIndex.get(id) || null,
  }

  return catalog
}
