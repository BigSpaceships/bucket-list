let id = 0;

export type Todo = {
    id: number;
    text: string;
    completed: boolean;
    date?: Date;
}

export default {
    todoList: [] as Todo[],
    addTodo: function(text: string) {
        this.todoList.push({
            id: id++,
            text: text,
            completed: false,
            date: undefined,
        })
    }
}