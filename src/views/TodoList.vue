<script lang="ts">
import ListItem from "../components/ListItem.vue";
let id = 0;

export type Todo = {
    id: number;
    text: string;
    completed: boolean;
    date?: Date;
}

export default {
    components: {
        ListItem
    },
    data() {
        return {
            newTodo: "",
            todoList: [] as Todo[]
        }
    },
    methods: {
        addTodo() {
            this.todoList.push({
                id: id++,
                text: this.newTodo,
                completed: false,
                date: undefined,
            })
            this.newTodo = ""
        },
        toggleCompleted(todo: Todo) {
            todo.completed = !todo.completed;

            if (todo.completed) {
                todo.date = new Date(Date.now());
            }
        }
    },
    mounted() {
        this.todoList.push({
            id: id++,
            text: "Hello",
            completed: false,
            date: undefined,
        })
    }
}
</script>

<template>
    <div id="todoList">
        <ListItem v-for="todo in todoList" :key="todo.id" :todoItem="todo" @toggleCompleted="toggleCompleted(todo)" />
    </div>

    <form @submit.prevent="addTodo">
        <input v-model="newTodo">
        <button>Add Todo</button>
    </form>
</template>

<style>
#todoList {
    
}
</style>