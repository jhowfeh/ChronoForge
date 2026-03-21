<script setup>
import { ref } from "vue";

const newSheetVisible = ref(false);

const newSheet = {
    name: '',
    player: "",
    ruleset_id: null,
    sheet: null
}

const addNewSheet = () => {
    console.log('***Add new sheet***');
    newSheetVisible.value = true;
}
</script>

<template>
    <div class="full-layout card">
        <h1 class="flex justify-between items-center">
            Dashboard
            <Button 
                icon="pi pi-home" 
                aria-label="Save"
                @click="addNewSheet"
            />
        </h1>
        <p>Bem-vindo(a) ao ChronoForge! Selecione uma ficha de personagem na barra lateral ou crie uma nova para começar...</p>
        <div class="grid grid-cols-5 gap-4">
            <div>

            </div>
        </div>
    </div>

    <div class="card flex justify-center">
        <Drawer 
            v-model:visible="newSheetVisible" 
            header="Drawer" 
            class="!w-full md:!w-80 lg:!w-[30rem]"
        >

        </Drawer>
    </div>
</template>

<script>

</script>
