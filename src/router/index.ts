import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/indexView.vue'),
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/goodsView.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (!token && to.path != '/') {
    next('/')
  } else if (token && to.path == '/') {
    next('/about/index')
  } else {
    next()
  }
})

export default router
