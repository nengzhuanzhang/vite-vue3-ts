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
    leftMenu: true,
    meta: {
      title: '首页',
      hide: false,
      icon: 'HomeOutlined'
    },
    component: () => import('../views/home.vue')
  },
  {
    path: '/about',
    name: 'About',
    leftMenu: true,
    meta: {
      title: '关于',
      hide: false,
      icon: 'VideoCameraOutlined'
    },
    component: () => import('../views/about.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
