let id = 0;

export type Todo = {
    id: number;
    text: string;
    completed: boolean;
    date?: Date;
}
export let todoList: Todo[] = [] as Todo[];

export function addTodo(text: string) {
    todoList.push({
        id: id++,
        text: text,
        completed: false,
        date: undefined,
    })
}

export function clear() {
    todoList = [] as Todo[];
}

export function todoFromObject(obj: object): Todo | undefined {
    const todo: Todo = obj as Todo;

    if (todo.id == undefined || todo.text == undefined) {
        return;
    }

    if (todo.completed == undefined) {
        todo.completed = false;
    }
        
    return todo;
}

export function modifyTodo(todo: Todo) {
    const index = todoList.findIndex((value: Todo) => {
        return todo.id == value.id 
    })

    todoList[index] = todo;
}
