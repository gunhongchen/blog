import Home from '../views/client/Home.vue'

const mroute = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: 'article',
    name: 'articleList',
    component: () => import(/* webpackChunkName: "article" */ '../views/client/article/Article.vue')
  },
  {
    path: 'article/:id',
    name: 'articleDetail',
    component: () => import(/* webpackChunkName: "articleDetail" */ '../views/client/article/ArticleDetail.vue')
  },
  {
    path: 'album',
    name: 'albumList',
    component: () => import(/* webpackChunkName: "album" */ '../views/client/album/Album.vue')
  },
];

export default mroute;