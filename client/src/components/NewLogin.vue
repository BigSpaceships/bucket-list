<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithRedirect } = useAuth0();

async function login() {
    loginWithRedirect()
}
</script>

<template>

    <button @click="login">
        Login Here
    </button>
</template>

<style lang="postcss">

.login-inputs {
    button {
        text-align: center;

        border-radius: 2px;

        background-color: var(--accent-color);

        width: 100%;
        height: 26px;

        transition: filter .5s ease;

        &:hover {
            filter: brightness(75%)
        }
    }
}

</style>