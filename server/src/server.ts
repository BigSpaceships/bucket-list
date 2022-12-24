import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import { createServer } from "http";
import { createProxyServer } from "http-proxy";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { Schema, model, connect } from "mongoose";

import { routes } from "./router";

dotenv.config({ path: ".env.local" })

interface ClientToServerEvents {

}
interface ServerToClientEvents {
    itemsUpdated: () => void,
    message: (message: string) => void,
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
    proxyInstance.web(req, res, {})
})

proxyInstance.on("error", (err, req, res) => {
    res.end("whoops");
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

async function killServer() {
    const closePromise = new Promise((resolve, reject) => {
        io.close(() => {
            resolve(1);
        })
    })

    await closePromise;

    process.exit(0);
}

process.on("SIGUSR2", killServer)