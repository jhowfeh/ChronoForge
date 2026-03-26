<script setup>
import { ref, reactive  } from "vue";

import { useRulesetSchemaStore } from '@/app/stores/rulesetSchemaStore'
const rulesetSchemaStore = useRulesetSchemaStore();

import NewCharForm from './components/NewCharForm.vue';

const newSheetVisible = ref(false);

const character = ref({})

const onAddNewSheetClick = () => {
    console.log('***Add new sheet***');
    character.value = {
        systemId: '',
        basics: {
            playerName: '',
            name: '',
            description: ''
        }
    };
    newSheetVisible.value = true;
}

function onSaveCharClick(char) {
  console.log(char)
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
        <div class="grid grid-cols-5 gap-4">
            <div>

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