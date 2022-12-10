<script setup lang="ts">
import { computed } from 'vue';
import Checkbox from './ItemCheckbox.vue'
import { getTodoById, getDefaultTodo} from "../todos"
    
const props = defineProps({
    todoId: Number,
    selected: Boolean,
})

const emit = defineEmits<{
    (e: "selected", id: number): void
}>()

const todoItem = computed(() => {
    if (props.todoId == undefined) return getDefaultTodo();
    return getTodoById(props.todoId)
});

function click() {
    emit('selected', todoItem.value.id);
}

// const dataOptions = computed(() => { return { year: "numeric", month: "numeric", day: "numeric" } });
</script>

<template>
    <div class="border" :class="{ selected: selected}" v-on:click.stop="click">
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
    border-radius: 4px;

    background-color: #444;

    display: inline-flex;

    flex-direction: row;

    align-items: center;

    width: -webkit-fill-available;
    width: -moz-available;
    width: stretch;

    margin: 2px;
}

.selected {
    border: 0px solid var(--accent-color);
}

.selected, .border:hover {
    background-color: #555;
}

.overview-text {
    /* margin: 4px; */
    height: 100%;
    align-self: center;
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