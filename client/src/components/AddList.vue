<script setup lang="ts">
import { reactive } from "vue"

const formData = reactive({
    password: ""
})

function submitForm() {

}

</script>

<template>
    <form class="new-list-form" @submit.prevent="submitForm">
        <label for="new-list-password">Password</label>
        <input id="new-list-password" type="password" v-model="formData.password"/>
    </form>
</template>

<style lang="postcss">

form.new-list-form {
    > * {
        display: block
    }

    label {
        text-align: center;
    }

    input {
        border-radius: 2px;

        background-color: var(--accent-background-color);

        box-shadow: inset 0px 0px 5px rgba(20, 20, 20, 0.8);

        font-size: 16px;

        text-align: center;

        height: 26px;
        width: -webkit-fill-available;

        margin-top: 4px;

        padding-left: 2px;
    }
}

</style>