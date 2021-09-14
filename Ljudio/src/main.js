import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Vuex from './store'

createApp(App)
.use(Vuex)
.use(Router)
.mount('#app')
