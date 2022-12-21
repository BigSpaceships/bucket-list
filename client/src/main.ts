import { createApp } from 'vue'
import { io } from 'socket.io-client'
import App from './App.vue'
import router from './router/router'
import { fetchItems } from './items'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

const socket = io();
console.log(socket.connected)

// window.setInterval(() => { // TODO: this breaks things
//     fetchItems(); 
// },2000)