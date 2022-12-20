import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

import { routes } from "./router";

const app = express();

const httpServer = createServer(app);
const io = new Server({
    cors: {
        origin: true
    }
});

app.use(cors());

app.use(bodyParser.json());
routes(app);

io.on("connection", (socket) => {
    console.log(socket.id)
})

const port = 3000;

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})

io.listen(4000)