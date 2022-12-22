import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import { createServer } from "http";
import { createProxyServer } from "http-proxy";
import proxy from "express-http-proxy";
import { Server } from "socket.io";

import { routes } from "./router";

interface ClientToServerEvents {

}
interface ServerToClientEvents {
    itemsUpdated: () => void
}

const app = express();

const proxyInstance = createProxyServer({
    target: "http://127.0.0.1:5173", 
    ws: true,
});

// const proxyServer = createServer(function (req, res) {
    
//     proxyInstance.web(req, res, )
// });

const expressServer = createServer(app);

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(expressServer);

// app.use(cors());
app.use(bodyParser.json());
routes(app);

app.get("/*", (req, res) => {
    // console.log(req.url)
    proxyInstance.web(req, res, {});
})

io.on("connection", (socket) => {
    console.log(socket.id) // TODO: figure out why this is chashing things
})

expressServer.on("upgrade", (req, socket, head) => {
    proxyInstance.ws(req, socket, head)
})

const port = 3000;

expressServer.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})

// proxyServer.listen(4001)