import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/client/Layout.vue'
import croute from './console'
import mroute from './home'
import notFound from '../views/core/not-found.vue'
import UAParser from 'ua-parser-js';

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    children: mroute,
    beforeEnter: (to, from, next) => {
      // authkey 存在 进入该路由，不存在跳转到登陆页面
      const parser = new UAParser();
      if (parser.getResult().device.type === undefined) {
        next()
      } else {
        next('/mobile')
      }
    },
  },
  {
    path: '/mobile',
    component: () => import(/* webpackChunkName: "console" */ '../views/mobile/m-layout.vue'),
  },
  {
    path: '/console',
    component: () => import(/* webpackChunkName: "console" */ '../views/console/C-layout.vue'),
    children: croute,
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/core/login.vue')
  },
  {
    path: '**',
    component: notFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
