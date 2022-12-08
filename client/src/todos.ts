import { reactive } from "vue";

export type Todo = {
    id: number;
    text: string;
    completed: boolean;
    date?: Date;
}

// let id = 0;
const apiURL = import.meta.env.VITE_API_URL;

export const todos = reactive({
    todoList: [] as Todo[]
})

export function fetchTodos() {
    fetch(apiURL + "/api/todos", {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())
    .then((response) => {
        const newTodos = response.todos;

        todos.todoList = updateAllTodos(newTodos);
    });
}

export function getDefaultTodo() {
    return todos.todoList[0];
}

export function addTodo(text: string): void {
    fetch(apiURL + "/api/new-todo", {
        method: "POST",
        body: JSON.stringify({
            text: text
        }),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        fetchTodos();
    }).catch((error) => {
        console.error(error)
    })
}

export function getTodoById(id: number) {
    return todos.todoList[getTodoIndexById(id)]
}

export function getTodoIndexById(id: number) {
    return todos.todoList.findIndex((todo: Todo) => {
        return todo.id == id;
    })
}

export function toggleTodoCompleted(id: number) {
    const index =  getTodoIndexById(id);

    const newTodo = todos.todoList[index];

    newTodo.completed = !newTodo.completed;

    if (newTodo.completed) {
        newTodo.date = new Date(Date.now());
    }

    fetch(apiURL + "/api/update-todo", {
        method: "POST",
        body: JSON.stringify({
            todo: newTodo,
        }),
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        fetchTodos();
    }).catch((error) => {
        console.error(error);
    }) 
}

export function todoFromObject(obj: object): Todo | undefined {
    const todo: Todo = obj as Todo;

    if (todo.id == undefined || todo.text == undefined) {
        return;
    }

    if (todo.completed == undefined) {
        todo.completed = false;
    }

    if (todo.date != undefined) {
        todo.date = new Date(todo.date);
    }
        
    return todo;
}

export function updateTodo(todo: Todo, todoList: Todo[]): Todo[] {
    const index = todoList.findIndex((value: Todo, index: Number) => {
        return value.id == index;
    });

    const newTodoList = todoList;
    newTodoList[index] = todo;

    return newTodoList;
}

export function updateAllTodos(todos: object[]): Todo[] {
    const todoList: Todo[] = [] as Todo[];

    todos.forEach((todo: object) => {
        const newTodo = todoFromObject(todo);

        if (newTodo == undefined) {
            return;
        }
        todoList.push(newTodo);
    })

    return todoList;
}

export function updateSomeTodos(todosToModify: object[]): Todo[] {
    let todoList: Todo[] = todos.todoList;

    todosToModify.forEach((todo: object) => {
        const newTodo = todoFromObject(todo);

        if (newTodo == undefined) {
            return;
        }

        todoList = updateTodo(newTodo, todoList);
    })

    return todoList;
}