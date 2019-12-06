import Home from '../views/client/Home.vue'

const mroute = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: 'about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/client/About.vue')
  },
  {
    path: 'article',
    name: 'article',
    component: () => import(/* webpackChunkName: "article" */ '../views/client/Article.vue')
  },
];

export default mroute;