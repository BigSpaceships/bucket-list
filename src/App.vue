<script setup lang="ts">
import TopHeader from "./components/TopHeader.vue"
import TodoList from "./views/TodoList.vue";
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
    <TopHeader/>
    <div id="main-section">
        <TodoList/>
    </div>
</template>

<style>
#main-section {
    display: flexbox;
}
</style>