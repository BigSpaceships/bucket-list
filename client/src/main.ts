import { createApp } from 'vue'
import { io, Socket } from 'socket.io-client'
import App from './App.vue'
import router from './router/router'
import { fetchItems } from './items'

import './assets/main.css'

interface ClientToServerEvents {

}
interface ServerToClientEvents {
    itemsUpdated: () => void
}

const app = createApp(App)

app.use(router)
app.mount('#app')

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

socket.on("itemsUpdated", () => {
    fetchItems();
})

// window.setInterval(() => { // TODO: this breaks things
//     fetchItems(); 
// },2000)