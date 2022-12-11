import dotenv from "dotenv";
import express from "express";
import type { Item } from "./items";
import {addItem, itemFromObject, modifyItem, itemList, clear} from "./items";
import bodyParser from "body-parser";

dotenv.config({path: '.env.local'});

const app = express();
app.use(bodyParser.json());

app.get('/api/items', (req, res) => {
    console.log(itemList)
    
    res.json({
        items: itemList
    })
})

app.get('/api/clear', (req, res) => {
    clear();
    res.status(200).end();
})

app.post('/api/new-item', (req, res) => {
    const text: string = req.body['text'];
    addItem(text);

    res.status(200).end();
})
    
app.post('/api/update-item', (req, res) => {
    const itemToUpdate = itemFromObject(req.body.item);
    
    if (itemToUpdate === undefined) {
        return; // TODO: Probably should send an error
    }

    modifyItem(itemToUpdate);

    res.status(200).end();
})

const port = 3000;
let allowedIPs = process.env.HOST_IP;

if (allowedIPs == "ALL") {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    });
} else {
    if (allowedIPs === undefined) {
        allowedIPs = '127.0.0.1';
    }

    app.listen(port, allowedIPs, () => {
        console.log(`Example app listening on port ${port}!`);
    })
}
