import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCharacterStore = defineStore('Characters', () => {
  const CharacterList = ref([
    {"id":"d10cea2d-a801-46b7-8412-fb5e9e744218","systemId":"t20jda","name":"Nahalen","playerName":"Jonatas","description":"Jovem com cabelos loiros-claros e olhos azul-acinzentados cheios de inquietude. Usa roupas práticas de caçador adornadas com detalhes nobres, e nunca se separa de seu arco élfico Lúmen Telwe.","image":"","level":1,"experience":"","race":"","origin":"","class":"","background":"","alignment":"","deity":"","age":"","size":"","speed":"","senses":"","str":"","dex":"","con":"","int":"","wis":"","cha":"","acrobatics":"","animal_handling":"","athletics":"","performance":"","riding":"","knowledge":"","healing":"","diplomacy":"","deception":"","fortitude":"","stealth":"","warfare":"","initiative":"","intimidation":"","insight":"","investigation":"","gambling":"","sleight_of_hand":"","melee":"","mysticism":"","nobility":"","craft":"","perception":"","piloting":"","ranged":"","reflexes":"","religion":"","survival":"","will":"","advancements":{"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[],"8":[],"9":[],"10":[],"11":[],"12":[],"13":[],"14":[],"15":[],"16":[],"17":[],"18":[],"19":[],"20":[]}}
  ])

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

  function updateCharacter(characterId, newCharacter) {
    const index = CharacterList.value.findIndex(char => char.id === characterId)

    if (index === -1) {
      throw new Error(`Personagem com id "${characterId}" não encontrado.`)
    }

    CharacterList.value[index] = newCharacter
    return CharacterList.value[index]
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