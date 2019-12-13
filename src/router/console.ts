const croute = [
    // { path: '', name: 'console', component: () => import(/* webpackChunkName: "index" */ '../views/console/C-index.vue') },
    { path: '', redirect: 'article' },
    {
        path: 'article',
        component: () => import(/* webpackChunkName: "article" */ '../views/console/article/C-article-layout.vue'),
        children: [
            { path: '', name: 'c-article', component: () => import(/* webpackChunkName: "article" */ '../views/console/article/C-article.vue') },
            { path: 'add', name: 'articleAdd', component: () => import(/* webpackChunkName: "articleAdd" */ '../views/console/article/C-article-add.vue') },
            { path: 'edit/:id', name: 'articleEdit', component: () => import(/* webpackChunkName: "articleEdit" */ '../views/console/article/C-article-edit.vue') }
        ]
    },
    {
        path: 'tags',
        component: () => import(/* webpackChunkName: "tags" */ '../views/console/tags/C-tags-layout.vue'),
        children: [
            { path: '', name: 'tags', component: () => import(/* webpackChunkName: "tags" */ '../views/console/tags/C-tags.vue') },
            { path: 'add', name: 'tagsAdd', component: () => import(/* webpackChunkName: "tagsAdd" */ '../views/console/tags/C-tags-add.vue') }
        ]
    },
    {
        path: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/console/user/C-user-layout.vue'),
        children: [
            { path: '', name: 'user', component: () => import(/* webpackChunkName: "user" */ '../views/console/user/C-user.vue') },
            { path: 'add', name: 'userAdd', component: () => import(/* webpackChunkName: "tagsAdd" */ '../views/console/user/C-user-add.vue') }
        ]
    }
];
export default croute;