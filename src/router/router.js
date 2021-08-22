import Main from '@/pages/Main'
import Posts from '@/pages/Posts'
import PostsPageWithStore from '@/pages/PostsPageWithStore'
import PostsCompositionApi from '@/pages/PostsCompositionApi'
import About from '@/pages/About'
import PostDetails from '@/pages/PostDetails'
import PostEdit from '@/pages/PostEdit'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: Posts
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostDetails
    },
    {
        path: '/posts/:id/edit',
        component: PostEdit
    },
    {
        path: '/store',
        component: PostsPageWithStore
    },
    {
        path: '/composition-api',
        component: PostsCompositionApi
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router