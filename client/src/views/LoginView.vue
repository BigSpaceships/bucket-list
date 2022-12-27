<script lang="ts" setup>
import { login } from '@/main';
</script>

<template>
    <div id="container">
        <form id="login-box" @submit.prevent="login">
            <h1 class="login-header">Login</h1>

            <label for="login-name">Name</label>
            <input id="login-name"/>
            <label for="login-password">Password</label>
            <input type="password" id="login-password">

            <button type="submit">Login</button>
        </form>
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

    /* width: 40vw; */
    /* height: 30vh; */

    background-color: #333;
    label {
        margin-top: 14px;
    }

    * {
        display:block;
    }

    h1 {
        /* text-align: center; */
        /* margin-bottom: 20px; */
        /* background-color: red; */
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
        /* border: 2px solid ; */
        border-radius: 2px;

        background-color: var(--accent-background-color);

        box-shadow: inset 0px 0px 5px rgba(20, 20, 20, 0.8);

        font-size: 16px;
        height: 26px;

        margin-top: 4px;

        padding-left: 2px;
    }
}
</style>
