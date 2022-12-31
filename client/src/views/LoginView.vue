<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { RouterView } from 'vue-router';

import { reactive } from 'vue';

const { loginWithRedirect } = useAuth0();

const formData = reactive({
    name: "",
    password: "",
})
// const domain = computed(() => import.meta.env.VITE_AUTH0_DOMAIN)

async function tryLogin() {
    loginWithRedirect();
}
</script>

<template>
    <div id="container">
        <div id="login-box">
            <RouterView/>
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
