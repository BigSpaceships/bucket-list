<script lang="ts">
import ListItem from "../components/ListItem.vue";
import NewListItemInput from "../components/NewListItemInput.vue";
// import type { Todo } from "../todos";
import { todos } from '../todos';

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
<div class="todo-list">
    <div class="todo-list-items">
        <ListItem :todoId="todo.id" v-for="todo in todos.todoList" :key="todo.id"/>
    </div>
    
    <NewListItemInput/>
</div>
</template>

<style>
.todo-list {
    display: flex;
    flex-direction: column;
    
    min-width: 25%;

    padding: 4px;
}

.todo-list-items {
    overflow:auto;
}
</style>