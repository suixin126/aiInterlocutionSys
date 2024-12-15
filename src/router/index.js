import { createWebHashHistory, createRouter } from 'vue-router'



const routes = [
    {
        path:'/login',
        name:'login',
        component: () => import('@/views/login/Login.vue')
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router