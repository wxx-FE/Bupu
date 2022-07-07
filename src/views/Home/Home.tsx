import {defineComponent, ref, reactive} from "vue"
import {Router, useRouter} from "vue-router";

export default defineComponent({
    name: "Home",
    setup() {
        let router: Router = useRouter()

        function routerJumper(name: string) {
            router.push({
                name: name
            })
        }

        let buttonList = [
            {
                type: "primary",
                text: "编辑器演示",
                funC: () => {
                    routerJumper("MonacoEditorDemo")
                }
            },
            {
                type: "primary",
                text: "水印演示",
                funC: () => {
                    routerJumper("WaterMaskDemo")
                }
            },
            {
                type: "primary",
                text: "过渡动画演示",
                funC: () => {
                    routerJumper("AnimateTransitionDemo")
                }
            }
        ]

        return {
            buttonList
        }
    },
    render() {
        return <div style={{
            boxSizing: "border-box",
            padding: "20px"
        }}>
            {this.buttonList.map((item: any) => {
                return <el-button type={item.type} onClick={item.funC}>{item.text}</el-button>
            })}
        </div>
    }
})
