import { fileURLToPath, URL } from 'node:url';

import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        noDiscovery: true,
        include: [
            'quill-delta', 
            'eventemitter3', 
            'sql-formatter', 
            'lodash', 
            'prismjs'
        ]
    },
    plugins: [
        vue(),
        tailwindcss(),
        Components({
            resolvers: [PrimeVueResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },
    define: {
        // __BASE_URL_API_V1__ : JSON.stringify('http://172.16.220.81:8080/api/v1'),
        // __BASE_URL_API_V2__ : JSON.stringify('http://172.16.220.81:8080/api/v2'),
        // __BASE_URL_API_V3__ : JSON.stringify('http://172.16.220.81:8080/api/v3'),
        // __BASE_URL_RAW__    : JSON.stringify('http://172.16.220.81:8079/'),

        // __BASE_URL_API_V1__ : JSON.stringify('http://172.16.8.68:8080/api/v1'),
        // __BASE_URL_API_V2__ : JSON.stringify('http://172.16.8.68:8080/api/v2'),
        // __BASE_URL_API_V3__ : JSON.stringify('http://172.16.8.68:8080/api/v3'),
        // __BASE_URL_RAW__    : JSON.stringify('http://172.16.8.68:8079/'),


        __BASE_URL_API_V1__: JSON.stringify('http://172.16.18.224:8080/api/v1'),
        __BASE_URL_API_V2__: JSON.stringify('http://172.16.18.224:8080/api/v2'),
        __BASE_URL_API_V3__: JSON.stringify('http://172.16.18.224:8080/api/v3'),
        __BASE_URL_RAW__   : JSON.stringify('http://172.16.18.224:8079/'),
    },
});
