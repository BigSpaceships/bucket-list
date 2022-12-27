import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

import { socket } from './socket'
import { apiURL } from './items'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

export let loggedIn = false;

export function login(response: any) {
    loggedIn = true;

    router.push({ name: "home"})
}

// window.setInterval(() => { // TODO: this breaks things
//     fetchItems(); 
// },2000)