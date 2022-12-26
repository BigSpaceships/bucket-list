import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { createProxyServer } from "http-proxy";
import mongoose from "mongoose";
import { Server } from "socket.io";

import { dbConnect, syncFromDb } from "./items";
import { routes } from "./router";

dotenv.config({ path: ".env.local" })

interface ClientToServerEvents {

}
interface ServerToClientEvents {
    itemsUpdated: () => void,
    message: (message: string) => void,
}

const proxyInstance = createProxyServer({
    target: "http://127.0.0.1:5173",
    ws: true,
});

const app = express();

const expressServer = createServer(app);

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

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(expressServer);

io.on("connection", (socket) => {
    console.log(socket.id)
})

expressServer.on("upgrade", (req, socket, head) => {
    proxyInstance.ws(req, socket, head)
})

const port = 3000;

expressServer.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})

dbConnect().then(syncFromDb);

async function killServer() {
    const closePromise = new Promise((resolve, reject) => {
        io.close(() => {
            resolve(1);
        })
    })

    await closePromise;

    await mongoose.disconnect();

    console.log("gracefully shut down")

    process.exit(0);
}

process.on("SIGUSR2", killServer)