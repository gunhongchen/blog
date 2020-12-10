import MHome from '../views/mobile/m-home.vue';

const oroute = [
    {
        path: '',
        name: 'mhome',
        component: MHome
    },
    {
        path: 'album',
        name: 'album',
        component: () => import( '../views/mobile/m-album/m-album.vue')
    },
    {
        path: 'article/tag/:id',
        name: 'article',
        component: () => import( '../views/mobile/m-article/m-article.vue')
    },
    {
        path: 'article/:id',
        name: 'mArticleDetail',
        component: () => import( '../views/mobile/m-article/m-article-detail.vue')
    }
]
export default oroute;