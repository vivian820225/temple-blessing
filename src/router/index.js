import Vue from 'vue'
import VueRouter from 'vue-router'
import Tools from '@/utils/tools'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: 'home' */ '../views/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: 'about' */ '../views/login.vue')
  },
  {
    path: '/blessing',
    name: 'Blessing',
    component: () => import(/* webpackChunkName: 'blessing' */ '../views/blessing.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import(/* webpackChunkName: 'record' */ '../views/record.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/check-order',
    name: 'CheckOrder',
    component: () => import(/* webpackChunkName: 'check-order' */ '../views/check-order.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/finished',
    name: 'Finished',
    component: () => import(/* webpackChunkName: 'finished' */ '../views/finished.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    // 非正常路徑導回首頁
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: { path: '/' }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requireLogin) {
    if (localStorage.getItem('access_token') && store.getters.isLogin) {
      next()
    } else {
      Tools.warningTips('請先登入')
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
