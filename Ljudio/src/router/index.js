import {createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Song from '../views/Song.vue'
import Album from '../views/Album.vue'
import Artist from '../views/Artist.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: '/song/:videoId',
    name: 'Song',
    component: Song
},
// { requirement removed from assignment
//     path: '/album/:browseId',
//     name: 'Album',
//     component: Album
// },
{
    path: '/artist/:browseId',
    name: 'Artist',
    component: Artist
}

]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router