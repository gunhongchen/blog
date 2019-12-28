import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/client/Layout.vue'
import croute from './console'
import mroute from './home'
import notFound from '../views/core/not-found.vue'
import * as consoleHttp from '../http/api/console'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    children: mroute
  },
  {
    path: '/console',
    component: () => import(/* webpackChunkName: "console" */ '../views/console/C-layout.vue'),
    children: croute,
    beforeEnter: (to, from, next) => {
      consoleHttp.testToken().then(res => {
        if(res['success'] === 1) {
          next();
        }
      }).catch(err => {
        next('/login')
      })
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
