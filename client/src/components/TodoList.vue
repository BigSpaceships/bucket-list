<script setup lang="ts">
import { reactive } from "vue";
import ListItem from "../components/ListItem.vue";
import NewListItemInput from "../components/NewListItemInput.vue";
// import type { Todo } from "../todos";
import { todos } from '../todos';

const state = reactive({
    selected: -1,
})

function itemSelected(id: number) {
    state.selected = id;
}

</script>

<template>
<div class="todo-list" v-on:click="itemSelected(-1)">
    <div class="todo-list-items">
        <ListItem :todoId="todo.id" :selected="(todo.id == state.selected)"
        @selected="itemSelected"
        v-for="todo in todos.todoList" :key="todo.id"/>
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