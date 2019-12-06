import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/client/Layout.vue'
import croute from './console'
import mroute from './home'

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
    children: croute
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
