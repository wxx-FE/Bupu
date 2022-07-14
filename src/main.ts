import {createApp} from 'vue'
import App from './App'
import "@/assets/styles/globals.scss"

const app = createApp(App)

//状态管理
import pinia from "@/store"

app.use(pinia)

//自定义指令
import directive from "@/directive"

app.use(directive)

//UI框架
import ElementPlus from "element-plus"
import "element-plus/dist/index.css";

app.use(ElementPlus)

import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"

app.use(Antd)

import naive from "naive-ui"

app.use(naive)

//路由
import router from "./router";

app.use(router)

app.mount('#app')
