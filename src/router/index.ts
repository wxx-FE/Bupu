import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from "vue-router";

const demoRoutes: Array<RouteRecordRaw> = [
    {
        path: "/water-mask-demo",
        name: "WaterMaskDemo",
        component: import("@/demo/WaterMaskDemo/WaterMaskDemo")
    },
    {
        path: "/monaco-editor-demo",
        name: "MonacoEditorDemo",
        component: import("@/demo/MonacoEditorDemo/MonacoEditorDemo")
    }
]
const commonRoutes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login/Login")
    },
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home/Home")
    }
];

let routes: Array<RouteRecordRaw> = demoRoutes.concat(commonRoutes)

let router: any = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
