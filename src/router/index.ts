import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const mroute = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: 'about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
];
const croute = [
  {path: '', name: 'index', component: () => import(/* webpackChunkName: "index" */ '../views/console/C-index.vue')},
  {
    path: 'article', name: 'article',
    component: () => import(/* webpackChunkName: "article" */ '../views/console/article/C-article-layout.vue'),
    children: [
      { path: '', name:'list', component: () => import(/* webpackChunkName: "article" */ '../views/console/article/C-article.vue') },
      { path: 'add', name:'articleAdd', component: () => import(/* webpackChunkName: "articleAdd" */ '../views/console/article/C-article-add.vue') }
    ]
  },
  {
    path: 'tags', name: 'tags',
    component: () => import(/* webpackChunkName: "tags" */ '../views/console/tags/C-tags-layout.vue'),
    children: [
      { path: '', name:'list', component: () => import(/* webpackChunkName: "tags" */ '../views/console/tags/C-tags.vue') },
      { path: 'add', name:'tagsAdd', component: () => import(/* webpackChunkName: "tagsAdd" */ '../views/console/tags/C-tags-add.vue') }
    ]
  }
]

const routes = [
  {
    path: '',
    name: 'layout',
    component: Layout,
    children: mroute
  },
  {
    path: '/console',
    name: 'console',
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
