import {
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw
} from 'vue-router'

import Index from '@/pages/index.vue'
import About from '@/pages/about.vue'
import Login from '@/pages/login.vue'
import NotFound from '@/pages/404.vue'

const routes: RouteRecordRaw[] = [{
    path: '/',
    component: Index
},
{
    path: '/about',
    component: About
},
{
    path: '/:pathMatch(.*)*',
    component: NotFound
},
{
    path: '/login',
    component: Login
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router


