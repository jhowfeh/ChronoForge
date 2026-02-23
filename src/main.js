import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './app/router';

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/app/assets/FontAwesome/css/all.css';
import '@/app/assets/styles.scss';
import '@/app/assets/tailwind.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

import { useLayout } from '@/app/layout/composables/layout';
const { loadLayoutConfig } = useLayout();
loadLayoutConfig();

app.mount('#app');