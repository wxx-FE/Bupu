import Esign from "./Esign";
import {App} from "vue"

export default {
    install(app: App) {
        app.component('Esign', Esign)
    }
}

export {Esign}
