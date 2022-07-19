import {defineComponent, ref, reactive} from "vue"
import {Router, useRouter} from "vue-router";
import Layout from "@/layout/Layout"

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
                type: "info",
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
            },
            {
                type: "primary",
                text: "电子签名演示",
                funC: () => {
                    routerJumper("EsignDemo")
                }
            },
            {
                type: "primary",
                text: "高阶组件演示",
                funC: () => {
                    routerJumper("ZymHocDemo")
                }
            }

        ]

        return {
            buttonList
        }
    },
    render() {
        return <Layout></Layout>
    }
})
