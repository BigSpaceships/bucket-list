<template>
    <div id="container">
        <form id="login-box">
            <h1 class="login-header">
                Login
            </h1>

            <input type="password" class="login-password">
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

    padding: 6px;

    width: 40vw;
    height: 30vh;

    background-color: #333;

    text-align: center;

    .login-password {
        /* border: 2px solid ; */
        border-radius: 2px;

        background-color: var(--accent-background-color);

        box-shadow: inset 0px 0px 5px rgba(0, 0, 0, .8);

        font-size: 16px;
        height: 26px;
    }
}
</style>
