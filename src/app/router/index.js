import AppLayout from '@/app/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import Sheet from '../views/pages/Sheet.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children:  [
                {
                    path: '', 
                    name: 'dashboard', 
                    component: Dashboard
                },
                {
                    path: '/sheet/:sheetId', 
                    name: 'sheet', 
                    component: Sheet,
                    props: true
                },
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
