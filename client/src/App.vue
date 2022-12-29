<script setup lang="ts">
import { RouterView } from "vue-router";
import { setToken, fetchItems } from "./items";

import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted } from "vue";

const { getAccessTokenSilently } = useAuth0();

onMounted(async () => {
    
    const token = await getAccessTokenSilently();

    console.log(token);
    setToken(await getAccessTokenSilently())

    fetchItems()
})

</script>

<template>
    <RouterView/>
</template>

<style lang="postcss">
</style>