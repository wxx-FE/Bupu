import AnimateTransition from "./AnimateTransition";
import {App} from "vue"

export default {
    install(app: App) {
        app.component('AnimateTransition', AnimateTransition)
    }
}

export {AnimateTransition}
