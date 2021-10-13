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
    component: () => import(/* webpackChunkName: "clientArticle" */ '../views/client/article/Article.vue')
  },
  {
    path: 'article/:id',
    name: 'articleDetail',
    component: () => import(/* webpackChunkName: "clientArticleDetail" */ '../views/client/article/ArticleDetail.vue')
  },
  {
    path: 'album',
    name: 'albumList',
    component: () => import(/* webpackChunkName: "clientAlbum" */ '../views/client/album/Album.vue')
  },
  {
    path: 'live',
    name: 'live',
    component: () => import(/* webpackChunkName: "clientLive" */ '../views/client/live/index.vue')
  },
];

export default mroute;