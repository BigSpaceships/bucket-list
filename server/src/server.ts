import dotenv from "dotenv";
import express from "express";
import type { Todo } from "./todos";
import {addTodo, todoFromObject, modifyTodo, todoList, clear} from "./todos";
import bodyParser from "body-parser";

dotenv.config({path: '.env.local'});

const app = express();
app.use(bodyParser.json());

app.get('/api/todos', (req, res) => {
    console.log(todoList)
    
    res.json({
        todos: todoList
    })
})

app.get('/api/clear', (req, res) => {
    clear();
    res.status(200).end();
})

app.post('/api/new-todo', (req, res) => {
    const text: string = req.body['text'];
    addTodo(text);

    res.status(200).end();
})
    
app.post('/api/update-todo', (req, res) => {
    const todoToUpdate = todoFromObject(req.body.todo);
    
    if (todoToUpdate === undefined) {
        return; // TODO: Probably should send an error
    }

    modifyTodo(todoToUpdate);

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
