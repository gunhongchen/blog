import Home from '../views/client/Home.vue'

const mroute = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: 'article',
    name: 'article',
    component: () => import(/* webpackChunkName: "article" */ '../views/client/Article.vue')
  },
  {
    path: 'article-detail/:id',
    name: 'articleDetail',
    component: () => import(/* webpackChunkName: "articleDetail" */ '../views/client/ArticleDetail.vue')
  },
];

export default mroute;