<script setup>
import { useLayout } from '@/app/layout/composables/layout';
import { onMounted } from 'vue';

const { layoutConfig } = useLayout();

onMounted(() => {
    // applyTheme({
    //     preset: layoutConfig.preset || 'Aura',
    //     primary: layoutConfig.primary || 'emerald',
    //     surfacePalette: getPresetExt(layoutConfig.primary || 'emerald')
    // });
});
</script>

<template>
    <router-view />
</template>

<style scoped></style>
