import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: 'home' */ '../views/home.vue')
  },
  {
    path: '/blessing',
    name: 'Blessing',
    component: () => import(/* webpackChunkName: 'about' */ '../views/blessing.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: 'about' */ '../views/login.vue')
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import(/* webpackChunkName: 'about' */ '../views/record.vue')
  },
  {
    path: '/check-order',
    name: 'CheckOrder',
    component: () => import(/* webpackChunkName: 'about' */ '../views/check-order.vue')
  },
  {
    path: '/finished',
    name: 'Finished',
    component: () => import(/* webpackChunkName: 'about' */ '../views/finished.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
