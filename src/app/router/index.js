import AppLayout from '@/app/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

import CharacterSheet from '@/pages/sheets/CharacterSheet.vue'
import OriginsPage from '@/pages/database/OriginsPage.vue'
import FeaturesPage from '@/pages/database/FeaturesPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children:  [
                {
                    path: '', 
                    redirect: '/sheet/active' },
                {
                    path: 'sheet/:id', 
                    name: 'sheet', 
                    component: CharacterSheet 
                },
                {
                    path: 'database/origins', 
                    name: 'db-origins', 
                    component: OriginsPage 
                },
                {
                    path: 'database/features', 
                    name: 'db-features', 
                    component: FeaturesPage 
                }
            ]
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/app/views/pages/NotFound.vue')
        },

        {
            path: '/:pathMatch(.*)*',
            redirect: to => ({
                path: '/pages/notfound',
                query: { from: to.fullPath }
            })
        }
    ]
});

export default router;
