import {createApp} from 'vue'
import App from './App'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css";
import {createPinia} from "pinia";
import piniaPersist from "pinia-plugin-persist"

const pinia = createPinia()

const app = createApp(App)
pinia.use(piniaPersist)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
