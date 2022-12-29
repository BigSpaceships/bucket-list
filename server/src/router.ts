import { Express } from "express";
import {expressjwt as jwt, GetVerificationKey} from "express-jwt";
import JwksRsa from "jwks-rsa";
import {addItem, clear, deleteItem, itemFromObject, itemList, modifyItem} from "./items";

export function routes(app: Express) {
    const jwtCheck = jwt({
        secret: JwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: 'https://dev-bucket-list.us.auth0.com/.well-known/jwks.json'
      }) as GetVerificationKey,
      audience: 'https://bucket-list-api',
      issuer: 'https://dev-bucket-list.us.auth0.com/',
      algorithms: ['RS256']
  });

    app.get('/api/items', jwtCheck, (req, res) => {
        res.json({
            items: itemList
        })
    })
    
    app.get('/api/clear', jwtCheck, (req, res) => {
        clear();
        res.status(200).end();
    })
    
    app.post('/api/new-item', jwtCheck, (req, res) => {
        const text: string = req.body['text'];
        addItem(text);
    
        res.status(200).end();
    })
        
    app.post('/api/update-item', jwtCheck, (req, res) => { // TODO: there's a PUT endpoint for updating data
        const itemToUpdate = itemFromObject(req.body.item);
        
        if (itemToUpdate === undefined) {
            return; // TODO: Probably should send an error
        }
    
        modifyItem(itemToUpdate);
    
        res.status(200).end();
    })
    
    app.post('/api/delete-item', jwtCheck, (req, res) => { // TODO: there's a DELETE endpoint 
        const id = req.body.id;
    
        deleteItem(id);
    
        res.status(200).end();
    })

    app.post('/api/login', (req, res) => {
        res.json({
            success: req.body.password == "hi"
        })
    })
}