import {createApp} from 'vue'
import App from './App'

const app = createApp(App)

//状态管理
import {createPinia} from "pinia";
import piniaPersist from "pinia-plugin-persist"

const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

//UI框架
import ElementPlus from "element-plus"
import "element-plus/dist/index.css";

app.use(ElementPlus)

//路由
import router from "./router";

console.log(router)
app.use(router)


app.mount('#app')
