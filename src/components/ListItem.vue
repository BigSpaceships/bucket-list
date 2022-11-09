<script setup lang="ts">
import { reactive, computed } from 'vue';
import Checkbox from './Checkbox.vue'
import type { Todo } from "../todos";
import { todos } from "../todos"
    
const props = defineProps({
    todoId: Number
})

const todoItem = computed(() => {
    return todos.getTodoById(props.todoId)
});

const dataOptions = computed(() => { return { year: "numeric", month: "numeric", day: "numeric" } });

</script>

<template>
    <div class="border">
        <Checkbox :id="todoId"/>
        <span class="overview-text" :class="{ completed: todoItem?.completed }">{{ todoItem.text }}</span>
        <span class="date-completed" v-if="todoItem?.completed"> <i>completed: {{
                todoItem?.date?.toLocaleDateString("en-US")
        }}</i></span>
    </div>
    <br />
</template>

<style>
.border {
    border: 0px solid var(--accent-color);
    border-radius: 4px;

    background-color: #444;

    display: inline-flex;

    flex-direction: row;

    align-items: center;

    width: -webkit-fill-available;

    margin: 2px;
}

.border>svg {
    aspect-ratio: 1;
}

.overview-text {
    /* margin: 4px; */
    height: 100%;
}

.completed {
    text-decoration: line-through;
}

.date-completed {
    margin-left: auto;
    color: #eee;

    margin-right: 15px;
}
</style>