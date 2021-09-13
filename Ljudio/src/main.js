import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Vuex from 'vuex'

createApp(App)
.use(Router)
.use(Vuex)
.mount('#app')
