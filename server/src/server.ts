import express from "express";
import type { Item } from "./items";
import {addItem, itemFromObject, modifyItem, itemList, clear} from "./items";
import bodyParser from "body-parser";


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

app.listen(port, "127.0.0.1", () => {
    console.log(`Example app listening on port ${port}!`);
})