import {defineComponent, ref} from "vue"
import {useZymStore, useWxxStore} from "@/store";
import WaterMask from "@/components/WaterMask/WaterMask";
import {faker} from "@faker-js/faker";

export default defineComponent({
    name: "App",
    setup() {
        let state = useZymStore()
        let state1 = useWxxStore()
        let userName = ref<string>("wxx")
        let svgColor = ref<string>("")
        let svgNumber = ref<number>(0)
        setInterval(() => {
            userName.value = faker.name.firstName()
            svgColor.value = faker.color.rgb()
        }, 3000)
        return {
            state,
            state1,
            userName,
            svgColor
        }
    },
    render() {
        return <div>
            <p>我是zym数据:{this.state.counter}</p>
            <p>我是wxx数据:{this.state1.counter}</p>
            <el-button onClick={() => {
                this.state.counter += 1
                this.state1.counter += 2
            }}>
                累加
            </el-button>
            <WaterMask svgColor={this.svgColor} svgName={this.userName} style={{height: "500px"}}>
                <p>我时水印</p>
            </WaterMask>
            <el-button onClick={() => {
                this.state.$reset()
            }}>重置zym
            </el-button>
            <el-button onClick={() => {
                this.state1.$reset()
            }}>重置wxx
            </el-button>
        </div>
    }
})
