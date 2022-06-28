import {defineComponent} from "vue"
import {useZymStore,useWxxStore} from "@/store";

export default defineComponent({
    name: "App",
    setup() {
        let state = useZymStore()
        let state1 = useWxxStore()
        return {
            state,
            state1
        }
    },
    render() {
        return <div>
            <p>我是zym数据:{this.state.counter}</p>
            <p>我是wxx数据:{this.state1.counter}</p>
            <el-button onClick={()=>{
                this.state.counter += 1
                this.state1.counter += 2
            }}>
                累加
            </el-button>
            <el-button onClick={()=>{this.state.$reset()}}>重置zym</el-button>
            <el-button onClick={()=>{this.state1.$reset()}}>重置wxx</el-button>
        </div>
    }
})