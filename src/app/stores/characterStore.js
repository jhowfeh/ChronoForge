import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCharacterStore = defineStore('Characters', () => {
  const CharacterList = ref([])

  /**
   * Adiciona um personagem na lista e injeta um ID caso ele não exista.
   *
   * O store não precisa conhecer a estrutura interna do personagem.
   * Ele apenas exige que exista um systemId.
   *
   * @param {Object} characterData - Objeto completo da ficha
   * @returns {Object} Personagem adicionado
   */
  function addCharacter(characterData) {
    if (!characterData?.systemId) {
      throw new Error('Não é possível adicionar um personagem sem systemId.')
    }

    const character = {
      ...characterData,
      id: characterData.id?.length ? characterData.id : crypto.randomUUID()
    }

    CharacterList.value.push(character)
    return character
  }

  /**
   * Retorna um personagem pelo ID.
   *
   * @param {string} characterId
   * @returns {Object|null}
   */
  function getCharacterById(characterId) {
    return CharacterList.value.find(character => character.id === characterId) ?? null
  }

  /**
   * Retorna a lista completa de personagens.
   *
   * @returns {Array}
   */
  function getCharacterList() {
    return CharacterList.value
  }

  /**
   * Remove um personagem pelo ID.
   *
   * @param {string} characterId
   */
  function removeCharacter(characterId) {
    CharacterList.value = CharacterList.value.filter(character => character.id !== characterId)
  }

  return {
    CharacterList,
    addCharacter,
    getCharacterById,
    getCharacterList,
    removeCharacter
  }
})