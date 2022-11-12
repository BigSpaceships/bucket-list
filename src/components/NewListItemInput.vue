<script setup lang="ts">
import { reactive } from "vue";
import {todos} from "../todos";
const state = reactive({newInputText: ""});

function makeNewTodo() {
    todos.addTodo(state.newInputText);
    state.newInputText = "";
}
</script>

<template>
<div class="new-list-item-input">
    <input placeholder="New Todo..." v-model="state.newInputText">
    <svg height="50px" @click="makeNewTodo">
        <circle cx="50%" cy="50%" r=10 class="add-item-circle"></circle>
        <line x1=20 y1=25 x2=30 y2=25 class="add-item-line"></line>
        <line x1=25 y1=20 x2=25 y2=30 class="add-item-line"></line>
    </svg>
</div>
</template>
<style>
div.new-list-item-input {
    background-color: #222;

    display: inline-flex;

    width: -webkit-fill-available;

    border: 2px solid var(--accent-color);
    border-radius: 4px;

    margin: 2px;

    margin-top: auto;
/*     align-self: flex-end; */
}

div.new-list-item-input > input {
    margin-left: 15px; 
}

div.new-list-item-input > svg {
    aspect-ratio: 1;

    margin-left: auto;
}

.add-item-circle {
    fill: var(--accent-color);
    stroke: var(--accent-color);
    stroke-width: 2px;
}

.add-item-line {
    stroke-width: 3px;
    stroke: #444;
    stroke-linecap: round;
}
</style>