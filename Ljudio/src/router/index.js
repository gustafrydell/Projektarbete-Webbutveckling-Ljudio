import {createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Songs from '../views/Songs.vue'


const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: '/songs',
    name: 'Songs',
    component: Songs
},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router