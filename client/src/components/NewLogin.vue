<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

import imgURL from "../assets/mine.png";

const { loginWithRedirect } = useAuth0();

const mineImage = ref<HTMLImageElement | null>(null)

onMounted(() => {
    if (mineImage.value != null) { 
        mineImage.value.src = imgURL;
    }
})
</script>

<template>
    <div class="new-login">
        <h1>
            Hi Stupid
        </h1>

        <!-- <div class="img-container"> -->
            <img class="mine-image" ref="mineImage">
        <!-- </div> -->

        <button @click="loginWithRedirect">
            Login Here
        </button>
    </div>
</template>

<style lang="postcss">

.new-login {
    display: flex;
    flex-direction: column;
    height: 100%;

    h1 {
        text-align: center;
        margin: 0;
    }

    img {
        height: 20vh;
        object-fit: contain;
    }
    
    button {
        text-align: center;

        border-radius: 2px;

        background-color: var(--accent-color);

        height: 26px;

        margin-top: auto;

        transition: filter .5s ease;

        &:hover {
            filter: brightness(75%)
        }
    }
}

</style>