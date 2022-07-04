import WaterMask from "./WaterMask";
import {App} from "vue"

export default {
    install: (app: App) => {
        app.component(WaterMask.name, WaterMask)
    }
}

export {WaterMask}
