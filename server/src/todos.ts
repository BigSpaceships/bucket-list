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
