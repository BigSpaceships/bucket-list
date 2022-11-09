<script lang="ts">
import { defineComponent } from 'vue';
import type { Todo } from "../todos.ts";

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
    emits: ["toggleCompleted"],
    computed: {
        dataOptions: () => { return { year: "numeric", month: "numeric", day: "numeric" } }
    },
})

</script>

<template>
    <div class="border">
        <svg height="50px" @click="$emit('toggleCompleted')">
            <g v-if="!todoItem?.completed">
                <circle cx="50%" cy="50%" r="10" style="fill:none; stroke: var(--accent-color); stroke-width: 2">
                </circle>
            </g>
            <g v-else>
                <circle cx="50%" cy="50%" r="10"
                    style="fill: var(--accent-color); stroke: var(--accent-color); stroke-width: 2"></circle>
                <polyline points="20,25 24,29 31,22" style="fill:none; stroke: #444; stroke-width: 3"></polyline>
            </g>
        </svg>
        <span class="overview-text" :class="{ completed: todoItem?.completed }">{{ todoItem?.text }}</span>
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