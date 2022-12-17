<script setup lang="ts">
import { computed } from 'vue';
import { toggleItemCompleted, getItemById, getDefaultItem } from "../items";

const props = defineProps({
    id: Number
})

function toggleCompleted() {
    if (props.id != undefined) {
        toggleItemCompleted(props.id)
    }
}

const item = computed(() => {
    if (props.id != undefined) {
        return getItemById(props.id);
    }
    return getDefaultItem();
});
</script>

<template>
    <svg height="50px" @click="toggleCompleted" class="checkbox">
        <g v-if="!item.completed" class="incomplete">
            <circle cx="50%" cy="50%" r="10"></circle>
        </g>
        <g v-else class="complete">
            <circle cx="50%" cy="50%" r="10"></circle>
            <polyline points="20,25 24,29 31,22"></polyline>
        </g>
    </svg>
</template>

<style lang="postcss">
.checkbox {
    aspect-ratio: 1;

    &:hover {
        cursor: pointer;

    }
}

.incomplete > circle {
    fill: none;
    stroke: var(--accent-color);
    stroke-width: 2;
}

.complete {
    circle {
        fill: var(--accent-color);
        stroke: var(--accent-color);
        stroke-width: 2;
    }

    polyline {
        fill: none;
        stroke: #444;
        stroke-width: 3;
    }
}
</style>