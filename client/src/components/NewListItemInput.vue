<script setup lang="ts">
import { reactive, ref } from "vue";
import { addItem } from "../items";
const state = reactive({ newInputText: "" });

const input = ref<HTMLInputElement | null>(null);

function makeNewItem() {
    if (state.newInputText == "") {
        return; // TODO: Feedback
    }

    addItem(state.newInputText);
    state.newInputText = "";
}

function selectInput() {
    input.value?.focus();
}
</script>

<template>
    <form class="new-list-item-input" @submit.prevent="makeNewItem" v-on:click="selectInput">
        <input placeholder="New Todo..." ref="input" v-model="state.newInputText">
        <button>
            <svg height="50px">
                <circle cx="50%" cy="50%" r=10 class="add-item-circle"></circle>
                <line x1=20 y1=25 x2=30 y2=25 class="add-item-line"></line>
                <line x1=25 y1=20 x2=25 y2=30 class="add-item-line"></line>
            </svg>
        </button>
    </form>
</template>
<style lang="postcss">
form.new-list-item-input {
    background-color: #222;

    display: inline-flex;

    width: -webkit-fill-available;

    border: 2px solid var(--accent-color);
    border-radius: 4px;

    align-items: center;

    margin: 2px;

    margin-top: auto;
    bottom: 0;

    input {

        margin-left: 15px;

        flex: 1
    }

    button {
        all: unset;
        display: flex;
        /* deer god why does this work */

        svg {

            aspect-ratio: 1;

            margin-left: auto;

            cursor: pointer;
        }
    }
}

.add-item-circle {
    fill: var(--accent-color);
    stroke: var(--accent-color);
    stroke-width: 2px;
}

.add-item-line {
    stroke-width: 3px;
    stroke: #444;
    stroke-linecap: round;
}
</style>