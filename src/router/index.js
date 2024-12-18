import { createWebHashHistory, createRouter } from 'vue-router'



const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import('@/views/resetpassword/ResetPassword.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router