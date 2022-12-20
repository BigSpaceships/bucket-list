import { createRouter, createWebHistory } from 'vue-router'
import TodoListView from "../views/TodoListView.vue";

export function clearId() {
    toId(undefined);
}

export function toId(id: number | undefined) {
    if (id === undefined) {
        router.replace('/items/');
        return;
    }

    router.replace('/items/' + id);
}

const routes = [
    { path: '/', redirect: '/items/' },
    {
        path: "/items/",
        component: TodoListView,
    },
    {
        path: "/items/:id",
        component: TodoListView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
