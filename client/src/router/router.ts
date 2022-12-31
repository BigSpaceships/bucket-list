import { createRouter, createWebHistory } from 'vue-router'
import TodoListView from "../views/TodoListView.vue";
import LoginView from "../views/LoginView.vue";
import NewLogin from "../components/NewLogin.vue";
import AddList from "../components/AddList.vue";

export function clearId() {
    toId(undefined);
}

export function toId(id: string | undefined) {
    if (id === undefined) {
        router.replace('/items/');
        return;
    }

    router.replace('/items/' + id);
}

const routes = [
    { path: '/', redirect: '/items/' },
    { 
        path: '/login/',
        component: LoginView,
        name: "login",
        children: [
            {
                path: "",
                name: "login",
                component: NewLogin,
            },
            {
                path: "add-list",
                name: "new list",
                component: AddList,
            }
        ]
        // beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
            // if (!loggedIn) {
            //     return true;
            // }

            // return { name: "home" }
        // }
    },
    {
        path: "/items/",
        name: "home",
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

// router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // if (!loggedIn && to.name !== "login") {
    //     return { name: "login"}
    // }
// })

export default router
