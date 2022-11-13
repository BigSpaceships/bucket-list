<script lang="ts">
import ListItem from "../components/ListItem.vue";
import NewListItemInput from "../components/NewListItemInput.vue";
import type { Todo } from "../todos";
import { todos } from '../todos';
let id = 0;

export default {
    components: {
        ListItem,
        NewListItemInput,
    },
    data() {
        return {
            newTodo: "",
            todos,
        }
    },
    methods: {
        addTodo() {
            todos.addTodo(this.newTodo);
            this.newTodo = "";
        }
    },
    mounted() {
        todos.addTodo("Hello")
    }
}
</script>

<template>
<div class="todoList" style="overflow:auto;">
    <div v-for="todo in todos.todoList" :key="todo.id">
        <ListItem :todoId="todo.id"/>
    </div>
    
    <NewListItemInput/>
</div>
</template>

<style>
.todoList {
    display: flex;
    flex-direction: column;

    min-width: 25%
}
</style>