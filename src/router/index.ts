import {
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw
} from 'vue-router'

import Index from '@/pages/index.vue'
import About from '@/pages/about.vue'
import Login from '@/pages/login.vue'
import NotFound from '@/pages/404.vue'
import EmqxDashboard from '@/pages/emqxDashboard.vue'
import register from '@/pages/register.vue'

const routes: RouteRecordRaw[] = [{
    path: '/',
    component: Index,
    meta: {
        title: '首页'
    }
},
{
    path: '/about',
    component: About,
    meta: {
        title: '关于'
    }
},
{
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
        title: '404'
    }
},
{
    path: '/login',
    component: Login,
    meta: {
        title: '登录'
    }
},
{
    path: '/register',
    component: register,
    meta: {
        title: '注册'
    }

},
{
    path: '/emqx/dashboard',
    component: EmqxDashboard,
    meta: {
        title: 'EMQX控制台'
    }
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router


