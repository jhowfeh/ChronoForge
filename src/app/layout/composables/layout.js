import { computed, reactive, watch } from 'vue';

import { getPresetExt } from '@/app/layout/theme/presetExt';
import { $t, updateSurfacePalette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { surfaces } from '../theme/constants';

const STORAGE_KEY = 'layout-config';

const presets = {
    Aura,
    Lara,
    Nora
};

const layoutConfig = reactive({
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: false,
    menuMode: 'static'
});

const layoutState = reactive({
    staticMenuInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    sidebarExpanded: false,
    menuHoverActive: false,
    activeMenuItem: null,
    activePath: null
});

function getSurfacePalette(name) {
    return surfaces.find(
        (s) => s.name === name
    )?.palette;
}

const saveLayoutConfig = () => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            darkTheme: layoutConfig.darkTheme,
            primary: layoutConfig.primary,
            surface: layoutConfig.surface,
            preset: layoutConfig.preset,
            menuMode: layoutConfig.menuMode
        })
    );
};

function applyThemeFromConfig() {
    // 🌗 Dark mode (sempre determinístico)
    document.documentElement.classList[
        layoutConfig.darkTheme ? 'add' : 'remove'
    ]('app-dark');

    // 🎨 Preset base
    const preset =
        presets[layoutConfig.preset] ?? presets.Aura;

    $t()
        .preset(preset)
        .preset(getPresetExt(layoutConfig.primary))
        .use({ useDefaultOptions: true });

    // 🎨 Surface
    if (layoutConfig.surface) {
        const surfacePalette = getSurfacePalette(layoutConfig.surface);
        surfacePalette && updateSurfacePalette(surfacePalette);
    }
}

export function useLayout() {
    const toggleDarkMode = () => {
        if (!document.startViewTransition) {
            executeDarkModeToggle();

            return;
        }

        document.startViewTransition(() => executeDarkModeToggle(event));
    };

    const executeDarkModeToggle = () => {
        layoutConfig.darkTheme = !layoutConfig.darkTheme;
    };

    const toggleMenu = () => {
        if (isDesktop()) {
            if (layoutConfig.menuMode === 'static') {
                layoutState.staticMenuInactive = !layoutState.staticMenuInactive;
            }

            if (layoutConfig.menuMode === 'overlay') {
                layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
            }
        } else {
            layoutState.mobileMenuActive = !layoutState.mobileMenuActive;
        }
    };

    const toggleConfigSidebar = () => {
        layoutState.configSidebarVisible = !layoutState.configSidebarVisible;
    };

    const hideMobileMenu = () => {
        layoutState.mobileMenuActive = false;
    };

    const changeMenuMode = (event) => {
        layoutConfig.menuMode = event.value;
        layoutState.staticMenuInactive = false;
        layoutState.mobileMenuActive = false;
        layoutState.sidebarExpanded = false;
        layoutState.menuHoverActive = false;
        layoutState.anchored = false;
    };

    const loadLayoutConfig = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        const config = JSON.parse(saved);

        layoutConfig.darkTheme = config.darkTheme ?? false;
        layoutConfig.primary = config.primary ?? layoutConfig.primary;
        layoutConfig.surface = config.surface ?? layoutConfig.surface;
        layoutConfig.preset = config.preset ?? layoutConfig.preset;
        layoutConfig.menuMode = config.menuMode ?? layoutConfig.menuMode;

        applyThemeFromConfig();
    };

    const isDarkTheme = computed(() => layoutConfig.darkTheme);
    const isDesktop = () => window.innerWidth > 991;

    const hasOpenOverlay = computed(() => layoutState.overlayMenuActive);

    return {
        layoutConfig,
        layoutState,
        isDarkTheme,
        toggleDarkMode,
        toggleConfigSidebar,
        toggleMenu,
        hideMobileMenu,
        changeMenuMode,
        isDesktop,
        hasOpenOverlay,
        loadLayoutConfig
    };
}

watch(
    () => [
        layoutConfig.darkTheme,
        layoutConfig.primary,
        layoutConfig.surface,
        layoutConfig.preset
    ],
    () => {
        applyThemeFromConfig();
        saveLayoutConfig();
    }
);