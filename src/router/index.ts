import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login/Login")
    },
    {
        path: "/",
        name: "Layout",
        component: () => import("@/layout/Layout")
    }
];
let router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
