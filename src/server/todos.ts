import type {Todo} from "../todos";

let id = 0;

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