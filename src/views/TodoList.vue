<script lang="ts">
import ListItem from "../components/ListItem.vue";
import type { Todo } from "../todos";
import { todos } from '../todos';
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
        
    },
    mounted() {
        todos.addTodo("Hello")
    }
}
</script>

<template>
    <div id="todoList">
        <ListItem v-for="todo in todos.todoList" :key="todo.id" :todoId="todo.id"/>
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