import { generalCombatFeatures } from './data/feats/general.combat'
import { generalFateFeatures } from './data/feats/general.fate'
import { generalMagicFeatures } from './data/feats/general.magic'

import { originFeatures } from './data/origins.features'
import { origins } from './data/origins.list'

import { divineFeatures } from './data/deities.features'
import { deities } from './data/deities.list'

import { racialFeatures } from './data/races.features'
import { races } from './data/races.list'

// src/rulesets/t20/catalog.js
export function buildT20Catalog() {
  const features = [
    ...generalCombatFeatures,
    ...generalFateFeatures,
    ...generalMagicFeatures,
    ...originFeatures,
    ...divineFeatures,
    ...racialFeatures
  ]

  const featureIndex = new Map(features.map(f => [f.id, f]))
  const originIndex  = new Map((origins || []).map(o => [o.value, o]))
  const deityIndex   = new Map((deities || []).map(d => [d.value, d]))
  const raceIndex    = new Map((races || []).map(r => [r.value, r]))

  const catalog = {
    id: 't20',
    label: 'Tormenta 20',

    // coleções (UI pode usar como options diretamente)
    features,
    origins: origins || [],
    deities: deities || [],
    races: races || [],

    // índices
    featureIndex,
    originIndex,
    deityIndex,
    raceIndex,

    // ✅ interface genérica pro UI (HeaderSection, etc.)
    // sempre retorna Array
    getOptions(source) {
      if (source === 'origins') return Array.isArray(this.origins) ? this.origins : []
      if (source === 'deities') return Array.isArray(this.deities) ? this.deities : []
      if (source === 'races')   return Array.isArray(this.races) ? this.races : []
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
      return null
    },

    // getters específicos (continua compatível com seu código atual)
    getFeature: (id) => featureIndex.get(id) || null,
    getOrigin:  (id) => originIndex.get(id) || null,
    getDeity:   (id) => deityIndex.get(id) || null,
    getRace:    (id) => raceIndex.get(id) || null
  }

  return catalog
}
