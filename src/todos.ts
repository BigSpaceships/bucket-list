import { reactive } from "vue";

export type Todo = {
    id: number;
    text: string;
    completed: boolean;
    date?: Date;
}

let id = 0;

export const todos = reactive({
    todoList: [] as Todo[],
    addTodo: function(text: string) {
        fetch("https://bucket-list.bigspaceships.repl.co/api/new-todo", {
            method: "POST",
            body: JSON.stringify({
                text: text
            }),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => response.json())
            .then((response) => {
                const newTodos = response.todos.todoList;

                this.todoList = [];

            });
    },
    getTodoById: function(id: number) {
        return this.todoList[this.getTodoIndexById(id)]
    },
    getTodoIndexById: function(id: number) {
        return this.todoList.findIndex((todo: Todo) => {
            return todo.id == id;
        })
    },
    toggleCompleted: function(id: number) {
        const todoIndex: number = this.getTodoIndexById(id);
        this.todoList[todoIndex].completed = !this.todoList[todoIndex].completed;

        if (this.todoList[todoIndex].completed) {
            this.todoList[todoIndex].date = new Date(Date.now());
        }
    },
    getDefaultTodo: function() {
        return this.todoList[0];
    },
    fromJson: function(json: string) {
    }
})