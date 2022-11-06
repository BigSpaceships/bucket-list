<script lang="ts">
import { defineComponent } from 'vue';
import type { Todo } from "../views/TodoList.vue";

export default defineComponent({
    props: {    
        todoItem: {
            type: Object as () => Todo,
        }
    },
    methods: {
        // toggleCompleted: function() {
        //     console.log(this.todoItem)
        // }
    },
    emits: ["toggleCompleted"]
})

</script>

<template>
    <div class="border" :class="{ completed: !todoItem?.completed}" @click="$emit('toggleCompleted')">
        {{todoItem?.text}}
    </div>
</template>

<style>
.border {
    border: 0px solid var(--accent-color);
    border-radius: 4px;

    background-color: #444;

    padding: 10px;
    max-width: 300px;
}

.completed {
    text-decoration: line-through;
}
</style>