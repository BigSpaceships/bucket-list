<script setup lang="ts">
import { computed } from 'vue';
import Checkbox from './ItemCheckbox.vue'
import { getItemById, getDefaultItem} from "../items"
    
const props = defineProps({
    itemId: Number,
    selected: Boolean,
})

const emit = defineEmits<{
    (e: "selected", id: number): void
}>()

const item = computed(() => {
    if (props.itemId == undefined) return getDefaultItem();
    return getItemById(props.itemId)
});

function click() {
    emit('selected', item.value.id);
}

// const dataOptions = computed(() => { return { year: "numeric", month: "numeric", day: "numeric" } });
</script>

<template>
    <div class="border" :class="{ selected: selected}" v-on:click.stop="click">
        <Checkbox :id="itemId"/>
        <span class="overview-text" :class="{ completed: item?.completed }">{{ item.text }}</span>
        <span class="date-completed" v-if="item?.completed"> <i>completed: {{
                item?.date?.toLocaleDateString("en-US")
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