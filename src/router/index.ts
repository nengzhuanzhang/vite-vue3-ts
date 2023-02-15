import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/:catchAll(.*)',
    component: () => import('../components/notFound.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
