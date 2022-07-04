import {defineComponent} from "vue"
import {useBupuStore} from "@/store";

export default defineComponent({
    name: "AsideMenu",
    setup() {
        let {menuConfig} = useBupuStore()
        console.log(menuConfig)
        return {
            menuConfig
        }
    },
    render() {
        return <el-menu></el-menu>
    }
})
