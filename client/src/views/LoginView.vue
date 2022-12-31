<script lang="ts" setup>
import { RouterView } from 'vue-router';

import { reactive, ref, onMounted } from 'vue';

import imgURL from "../assets/mine.png";

const mineImage = ref<HTMLImageElement | null>(null)

onMounted(() => {
    if (mineImage.value != null) { 
        mineImage.value.src = imgURL;
    }
})

const formData = reactive({
    name: "",
    password: "",
})
</script>

<template>
    <div id="container">
        <div id="login-box">

            <h1>
                Hi Stupid
            </h1>

            <img class="mine-image" ref="mineImage">

            <div class="login-inputs">
                <RouterView/>
            </div>
        </div>
    </div>
</template>

<style lang="postcss">

#container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

#login-box {
    border: 2px solid #666;
    border-radius: 4px;

    padding: 16px;
    /* padding-left: 50px;
    padding-right: 50px; */

    width: 20vw;
    height: 30vh;

    background-color: #333;

    display: flex;
    flex-direction: column;



    h1 {
        text-align: center;
        margin: 0;
    }

    img {
        height: 20vh;
        object-fit: contain;
    }

    .login-inputs {
        margin-top: auto;

    }
    
    /* label {
        margin-top: 14px;
    }

    * {
        display:block;
    }

    /* h1 { 
        text-align: center;
        margin-bottom: 20px;
        background-color: red;
    } 

    button {
        text-align: center;

        width: -webkit-fill-available;

        border-radius: 2px;

        background-color: var(--accent-color);

        height: 26px;

        margin-top: 16px;
    }

    input {
        /* border: 2px solid ; 
        border-radius: 2px;

        background-color: var(--accent-background-color);

        box-shadow: inset 0px 0px 5px rgba(20, 20, 20, 0.8);

        font-size: 16px;
        height: 26px;

        margin-top: 4px;

        padding-left: 2px;
    }*/
}
</style>
