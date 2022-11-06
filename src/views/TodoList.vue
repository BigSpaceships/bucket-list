<script lang="ts">
let id = 0;

type Todo = {
    id: number;
    text: string;
}

export default {
    data() {
        return {
            newTodo: "",
            todoList: [] as Todo[]
        }
    },
    methods: {
        addTodo() {
            this.todoList.push({
                id: id++,
                text: this.newTodo,
            })
            this.newTodo = ""
        }
    }
}
</script>

<template>
    <form @submit.prevent="addTodo">
        <input v-model="newTodo">
        <button>Add Todo</button>
    </form>

    <ul>
        <li v-for="todo in todoList" :key="todo.id">
            {{ todo.text }}
        </li>
    </ul>
</template>