import MonacoEditor from "./MonacoEditor";
import {App} from "vue"

export default {
    install(app: App) {
        app.component('MonacoEditor', MonacoEditor)
    }
}

export {MonacoEditor}
