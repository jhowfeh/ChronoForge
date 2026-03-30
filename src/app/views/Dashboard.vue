<script setup>
import { ref, reactive  } from "vue";
import CharacterCard from "./components/CharacterCard.vue";

import { useRouter } from 'vue-router'
const router = useRouter()

import { useRulesetSchemaStore } from '@/app/stores/rulesetSchemaStore'
const rulesetSchemaStore = useRulesetSchemaStore();

import {useCharacterStore} from '@/app/stores/characterStore'
const characterStore = useCharacterStore();

import NewCharForm from './components/NewCharForm.vue';

const newSheetVisible = ref(false);

const character = ref({})

const onAddNewSheetClick = () => {
    console.log('***Add new sheet***');
    character.value = {
        systemId: 't20jda',
        playerName: 'Jonatas',
        name: 'Nahalen',
        description: 'Jovem com cabelos loiros-claros e olhos azul-acinzentados cheios de inquietude. Usa roupas práticas de caçador adornadas com detalhes nobres, e nunca se separa de seu arco élfico Lúmen Telwe.'
    };
    newSheetVisible.value = true;
}

function onSaveCharClick(char) {
    if (!char?.systemId) {
        console.error('System ID is required')
        return
    }

    rulesetSchemaStore.loadSchemaById(char.systemId)
        .then(schema => {
            if (!schema) {
                console.error('Schema not found for id:', char.systemId)
                return
            }

            if (typeof schema.getSheetChar !== 'function') {
                console.error('Schema does not implement getSheetChar:', char.systemId)
                return
            }

            const sheet = schema.getSheetChar(char)

            characterStore.addCharacter(sheet)
            newSheetVisible.value = false
        })
        .catch(err => {
            console.error('Error loading schema for id:', char.systemId, err)
        })
}

const onOpenCharClick = (charId) => {
    console.log('***Open char with id:', charId);
    router.push({ name: 'sheet', params: { sheetId: charId } });
}

const onDeleteCharClick = (charId) => {
    console.log('***Delete char with id:', charId);
    characterStore.removeCharacter(charId);
}
</script>

<template>
    <div class="full-layout-height full-layout-width card">
        <h1 class="flex justify-between items-center">
            Dashboard
            <Button 
                icon="fa-sharp fa-light fa-file-circle-plus"
                aria-label="Save"
                @click="onAddNewSheetClick"
            />
        </h1>
        <p>Bem-vindo(a) ao ChronoForge! Selecione uma ficha de personagem na barra lateral ou crie uma nova para começar...</p>
        <div class="grid grid-cols-12 gap-4">
            
            <div 
                v-for="char in characterStore.CharacterList" 
                :key="char.id"
                class="col-span-12 md:col-span-6 lg:col-span-4"
            >
                *-*
                <CharacterCard 
                    :character="char"
                    @open="onOpenCharClick"
                    @delete="onDeleteCharClick"
                />
            </div>

        </div>
    </div>

    <Drawer 
        v-model:visible="newSheetVisible" 
        header="Criar nova ficha" 
        class="!w-full lg:!w-3/4"
    >
        <NewCharForm
            v-model="character"
            :systems="rulesetSchemaStore.getSchemaList()"
            @save="onSaveCharClick"
        />
    </Drawer>
</template>