import { createApp } from 'vue';
import { createAuth0} from '@auth0/auth0-vue';

import App from './App.vue'
import router from './router/router'

import { socket } from './socket'
import { apiURL } from './items'

import './assets/main.css'

const app = createApp(App)

app.use(
    createAuth0({
        domain: import.meta.env.VITE_AUTH0_DOMAIN, // TODO: doesnt work
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    })
)

// alert(window.location.origin)

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