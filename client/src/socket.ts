import { Socket, io } from "socket.io-client";

import { fetchItems } from "./items";

export interface ClientToServerEvents {

}

export interface ServerToClientEvents {
    itemsUpdated: () => void,
    message: (message: string) => void,
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

socket.on("itemsUpdated", () => {
    fetchItems();
})
