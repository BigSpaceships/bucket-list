<script setup lang="ts">
import { reactive } from "vue";
import ListItem from "./ListItem.vue";
import NewListItemInput from "./NewListItemInput.vue";
// import type { Todo } from "../todos";
import { items, fetchItems } from '../items';
import { clearId } from "@/router/router";

fetchItems();

</script>

<template>
<div class="item-list" v-on:click="clearId()">
    <div class="item-list-items">
        <ListItem :itemId="item.id" v-for="item in items.itemList" :key="item.id"/>
    </div>
    
    <NewListItemInput/>
</div>
</template>

<style>
.item-list {
    display: flex;
    flex-direction: column;

    background-color: var(--accent-background-color);

    border-top-right-radius: 4px;
    
    min-width: 25%;

    padding: 4px;
}

.item-list-items {
    overflow:auto;
}
</style>