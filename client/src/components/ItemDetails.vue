<script setup lang="ts">
// name and checkbox up top
// have a menu with three dots for rename and delete (or maybe move it somewhere else if thats hard)
// calander for when it was completed if it is completed

import { getActiveId, getItemById, updateItem } from '../items';
import { computed, ref } from 'vue';
import DeleteIcon from './DeleteIcon.vue';
import { deleteItem } from '../items';

const activeItem = computed(() => {
    return getItemById(getActiveId());
})

const nameInput = ref<HTMLInputElement | null>(null);

function update() {
    updateItem(activeItem.value);
}
</script>

<template>
    <div class="item-details-block">
        <div class="details" v-if="(activeItem !== undefined)">
            <div class="top-bar">
                <!-- <ItemCheckbox :id="activeItem.id"/> -->
                <input v-model="activeItem.text" ref="nameInput" @change="update()"
                    @keypress.enter.stop="nameInput?.blur()">
                <DeleteIcon @delete="deleteItem(activeItem.id)"/>
            </div>
            <textarea v-model="activeItem.description" @change="update()"></textarea>
        </div>
    </div>
</template>

<style lang="postcss">
.item-details-block {
    /* flex: 1; */
    margin-left: auto;
    width: 35%;

    padding: 4px;

    border-top-left-radius: 4px;
    /* border-bottom-left-radius: 4px; */


    background-color: var(--accent-background-color);
}

.details {
    padding: 10px;

    .top-bar {
        display: flex;
        
        border-style: dashed;
        border-width: 2px;
        border-color: var(--accent-background-color);

        border-radius: 4px;

        transition: border-color 100ms, border-style 1ms step-end 1s; /* TODO: this transition still looks weird */

        &:hover {
            border-color: #666;
        }

        &:focus {
            border-color: #666;
            border-style: solid;
        }

        input {
            text-align: center;
            font-size: 2em;

            /* width: 100%; */
            /* width: -webkit-fill-available; */

            padding: 6px;
            
            flex: 1;
        }
    }

    textarea {
        border: 2px solid #666;
        border-radius: 4px;

        margin-top: 8px;

        padding: 4px;

        width: -webkit-fill-available;
    }
}
</style>