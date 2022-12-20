import { Express } from "express";
import {addItem, clear, deleteItem, itemFromObject, itemList, modifyItem} from "./items";

export function routes(app: Express) {
    app.get('/items', (req, res) => {        
        res.json({
            items: itemList
        })
    })
    
    app.get('/clear', (req, res) => {
        clear();
        res.status(200).end();
    })
    
    app.post('/new-item', (req, res) => {
        const text: string = req.body['text'];
        addItem(text);
    
        res.status(200).end();
    })
        
    app.post('/update-item', (req, res) => {
        const itemToUpdate = itemFromObject(req.body.item);
        
        if (itemToUpdate === undefined) {
            return; // TODO: Probably should send an error
        }
    
        modifyItem(itemToUpdate);
    
        res.status(200).end();
    })
    
    app.post('/delete-item', (req, res) => {
        const id = req.body.id;
    
        if (isNaN(id)) {
            return; // TODO: error
        }
    
        deleteItem(id);
    
        res.status(200).end();
    })
}