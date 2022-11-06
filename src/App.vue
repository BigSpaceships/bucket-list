<script setup lang="ts">
import TopHeader from "./components/TopHeader.vue"
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
    <TopHeader/>
    <RouterView/>
</template>

<style>
header {
    max-height: 100vh;
    padding: 1em
}
</style>