import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [];
let router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
