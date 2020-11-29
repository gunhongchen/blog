import MHome from '../views/mobile/m-home.vue';
import MAlbum from '../views/mobile/m-album/m-album.vue';
import MArticle from '../views/mobile/m-article/m-article.vue';

const oroute = [
    {
        path: '',
        name: 'mhome',
        component: MHome
    },
    {
        path: 'album',
        name: 'album',
        component: MAlbum
    },
    {
        path: 'article/tag/:id',
        name: 'article',
        component: MArticle
    },
    {
        path: 'article/:id',
        name: 'mArticleDetail',
        component: () => import(/* webpackChunkName: "articleDetail" */ '../views/mobile/m-article/m-article-detail.vue')
    }
]
export default oroute;