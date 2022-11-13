<script setup lang="ts">
import { computed } from 'vue';
import { todos } from "../todos";
import type { Todo } from "../todos";

const props = defineProps({
    id: Number
})
    
function toggleCompleted() {
    if (props.id) {
        todos.toggleCompleted(props.id)
    }
}

const todo = computed(() => {
    if (props.id) {
        return todos.getTodoById(props.id);
    }
    return todos.getDefaultTodo();
});

</script>

<template>
<svg height="50px" @click="toggleCompleted">
    <g v-if="!todo.completed">
        <circle cx="50%" cy="50%" r="10" 
            style="fill:none; stroke: var(--accent-color); stroke-width: 2"></circle>
    </g>
    <g v-else>
        <circle cx="50%" cy="50%" r="10"
            style="fill: var(--accent-color); stroke: var(--accent-color); stroke-width: 2"></circle>
        <polyline points="20,25 24,29 31,22" style="fill:none; stroke: #444; stroke-width: 3"></polyline>
    </g>
</svg>
</template>