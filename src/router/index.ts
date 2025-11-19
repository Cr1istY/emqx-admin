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
import DashBoardPage_1 from '@/pages/dashboard/dashboardpage_1.vue'
import DashBoardPage_2 from '@/pages/dashboard/dashboardpage_2.vue'
import ChangeUserStatus from '@/pages/dashboard/changeUserStatus.vue'

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
    path: '/dashboard',
    component: EmqxDashboard,
    children: [
        {
            path: 'page1',
            component: DashBoardPage_1,
            meta: {
                title: '温度视图'
            }
        },
        {
            path: 'page2',
            component: DashBoardPage_2,
            meta: {
                title: '湿度视图'
            }
        },
        {
            path: 'page4',
            component: ChangeUserStatus,
            meta: {
                title: '用户管理'
            }
        }
    ]
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router


