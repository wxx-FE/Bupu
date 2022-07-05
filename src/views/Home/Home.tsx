import {defineComponent, ref, reactive} from "vue"
import {MonacoEditor} from "@/components/MonacoEditor"

export default defineComponent({
    name: "Home",
    setup() {
        let text = ref<string>("")
        let monacoConfig: any = reactive({
            theme: "light",
            minimap: false
        })
        return {
            text,
            monacoConfig
        }
    },
    render() {
        return <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            width: "100%",
            height: '100vh',
            padding: "100px"
        }}>
            <div style={{width: "100%", height: "100%"}}>
                <div style={{width: "100%"}}>
                    <el-switch v-model={this.monacoConfig.minimap}></el-switch>
                </div>
                <MonacoEditor
                    style={{border: "1px solid rgba(0,0,0,0.1)"}}
                    language={this.monacoConfig.language}
                    theme={this.monacoConfig.theme}
                    v-model={this.text}>
                </MonacoEditor>
            </div>
        </div>
    }
})
