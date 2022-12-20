import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { fetchItems } from './items'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

window.setInterval(() => { // TODO: this breaks things
    fetchItems(); 
},2000)