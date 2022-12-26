<script setup lang="ts">
import TopHeader from "../components/TopHeader.vue"
import ItemList from "../components/ItemList.vue";
import ItemDetails from "../components/ItemDetails.vue";
</script>

<template>
    <div id="main">
        <TopHeader></TopHeader>
        <div id="content">
            <ItemList/>
            <ItemDetails/>
        </div>
    </div>
</template>

<style lang="postcss">
#main {
    height: 100vh;
    display: flex;
    flex-direction: column;
}


#content {
    display: flex;
    align-items: stretch;
    flex: 1;

    overflow: hidden
}

</style>