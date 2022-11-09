<script lang="ts">
import ListItem from "../components/ListItem.vue";
import type { Todo } from "../todos.ts";
import { todos } from '../todos.ts';
let id = 0;

export default {
    components: {
        ListItem
    },
    data() {
        return {
            newTodo: "",
            todos,
        }
    },
    methods: {
        // addTodo() {
        //     this.todoList.push({
        //         id: id++,
        //         text: this.newTodo,
        //         completed: false,
        //         date: undefined,
        //     })
        //     this.newTodo = ""
        // },
        // toggleCompleted(todo: Todo) {
        //     todo.completed = !todo.completed;

        //     if (todo.completed) {
        //         todo.date = new Date(Date.now());
        //     }
        // }
    },
    mounted() {
        todos.addTodo("Hello")
    }
}
</script>

<template>
    <div id="todoList">
        <ListItem v-for="todo in todos.todoList" :key="todo.id" :todoItem="todo"/>
    </div>

    <form @submit.prevent="todos.addTodo(newTodo)">
        <input v-model="newTodo">
        <button>Add Todo</button>
    </form>
</template>

<style>
#todoList {
    /* border: 2px solid var(--accent-color); */
    border-radius: 4px;
    
}
</style>