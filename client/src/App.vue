<script setup lang="ts">
import TopHeader from "./components/TopHeader.vue"
import { RouterView } from "vue-router";
</script>

<template>
    <TopHeader/>
    <div class="main">
        <RouterView></RouterView>
    </div>
</template>

<style>
#app {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.main {
    display: flex;
    align-items: stretch;
    flex: 1;

    overflow: hidden
}

</style>