import {defineComponent} from "vue"
import {useZymStore} from "@/store";

export default defineComponent({
    name: "App",
    setup() {
        let state = useZymStore()
        return {
            state
        }
    },
    render() {
        return <div>
            我是数据:{this.state.counter}
        </div>
    }
})