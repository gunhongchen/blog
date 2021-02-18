import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/client/Layout.vue'
import croute from './console'
import mroute from './home'
import oroute from './mobile'
import notFound from '../views/core/not-found.vue'
import UAParser from 'ua-parser-js';

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('../views/client/Layout.vue'),
    children: mroute,
    beforeEnter: (to, from, next) => {
      // authkey 存在 进入该路由，不存在跳转到登陆页面
      const parser = new UAParser();
      if (parser.getResult().device.type === undefined) {
        next()
      } else {
        next('/m')
      }
    },
  },
  {
    path: '/m',
    component: () => import(/* webpackChunkName: "mobile" */ '../views/mobile/m-layout.vue'),
    children: oroute
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
