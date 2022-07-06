import {defineComponent, ref, reactive} from "vue"
import {Router, useRouter} from "vue-router";
import {MonacoEditor} from "@/components/MonacoEditor"

export default defineComponent({
    name: "Home",
    setup() {
        let text = ref<string>("")
        let router: Router = useRouter()
        let monacoConfig: any = reactive({
            theme: "light",
            minimap: false
        })

        function routerJumper(name: string) {
            router.push({
                name: name
            })
        }

        return {
            text,
            monacoConfig,
            routerJumper
        }
    },
    render() {
        return <div>
            <el-button onClick={() => {
                this.routerJumper("MonacoEditorDemo")
            }}>编辑器演示
            </el-button>
            <el-button onClick={() => {
                this.routerJumper("WaterMaskDemo")
            }}>水印演示
            </el-button>
        </div>
    }
})
