import express from "express";
import type { Todo } from "./todos";
import {addTodo, todoList} from "./todos";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get('/api/', (req, res) => {
    res.send("data");
})

app.get('/api/todos', (req, res) => {
    res.json({
        todos: todoList
    })
})

app.post('/api/new-todo', (req, res) => {
    const text: string = req.body['text'];
    addTodo(text);

    res.json({
        todos: todoList
    })
})

app.post('/api/update-todo', (req, res) => {
    
})

const port = 3000;
app.listen(port,'127.0.0.1', () => {
   console.log(`Example app listening on port ${port}!`);
});