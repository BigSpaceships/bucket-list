<script setup lang="ts">
import { computed } from 'vue';
import { todos } from "../todos";

const props = defineProps({
    id: Number
})
    
function toggleCompleted() {
    if (props.id != undefined) {
        todos.toggleCompleted(props.id)
    }
}

const todo = computed(() => {
    if (props.id != undefined) {
        return todos.getTodoById(props.id);
    }
    return todos.getDefaultTodo();
});
</script>

<template>
<svg height="50px" @click="toggleCompleted" class="checkbox">
    <g v-if="!todo.completed" class="incomplete">
        <circle cx="50%" cy="50%" r="10"></circle>
    </g>
    <g v-else class="complete">
        <circle cx="50%" cy="50%" r="10"></circle>
        <polyline points="20,25 24,29 31,22"></polyline>
    </g>
</svg>
</template>

<style>
.checkbox {
    aspect-ratio: 1;
}

.checkbox:hover {
    cursor: pointer;
}

.incomplete > circle {
    fill:none; 
    stroke: var(--accent-color); 
    stroke-width: 2;
}

.complete > circle {
    fill: var(--accent-color); 
    stroke: var(--accent-color); 
    stroke-width: 2;
}

.complete > polyline {
    fill:none; 
    stroke: #444; 
    stroke-width: 3;
}
</style>