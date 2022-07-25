import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from "vue-router";
import {Component, defineComponent} from "vue";
import {loadingComponent} from "@/utils/loading";

const commonRoutes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login/Login")
    },
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home/Home"),
        children:[
            {
                path: "/water-mask-demo",
                name: "WaterMaskDemo",
                component: import("@/demo/WaterMaskDemo/WaterMaskDemo")
            },
            {
                path: "/monaco-editor-demo",
                name: "MonacoEditorDemo",
                component: import("@/demo/MonacoEditorDemo/MonacoEditorDemo")
            },
            {
                path: "/animate-transition-demo",
                name: "AnimateTransitionDemo",
                component: import("@/demo/AnimateTranisationDemo/AnimateTransitionDemo")
            },
            {
                path: "/esign-demo",
                name: "EsignDemo",
                component: import("@/demo/EsignDemo/EsignDemo")
            },
            {
                path: "/zym-hoc-demo",
                name: "ZymHocDemo",
                component: import("@/demo/ZymHocDemo/ZymHocDemo")
            }
        ]
    }
];

let routes: Array<RouteRecordRaw> = commonRoutes

let router: any = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
