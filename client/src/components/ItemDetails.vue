<script setup lang="ts">
// name and checkbox up top
// have a menu with three dots for rename and delete (or maybe move it somewhere else if thats hard)
// calander for when it was completed if it is completed

import { getItemById, items, updateItem } from '../items';
import { computed, ref } from 'vue';
import ItemCheckbox from './ItemCheckbox.vue';

const activeItem = computed(() => {
    return getItemById(items.activeId);
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
                <ItemCheckbox :id="activeItem.id"/>
                <input v-model="activeItem.text" ref="nameInput" @change="update()"
                    @keypress.enter.stop="nameInput?.blur()">
            </div>
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

        input {
            text-align: center;
            font-size: 2em;

            /* width: 100%; */
            /* width: -webkit-fill-available; */

            padding: 6px;

            border: 2px dashed var(--accent-background-color);
            border-radius: 4px;

            transition: border-color 85ms;

            transition: border-style 85ms step-end;

            &:hover {
                border: 2px dashed #666;
            }

            &:focus {
                border: 2px solid #666;
            }
        }
    }

}
</style>