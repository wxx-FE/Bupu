import {defineComponent} from "vue"
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default defineComponent({
    name: "App",
    setup() {
        //document.domain = "192.168.1.6"
        return {
            locale: zhCn
        }
    },
    render() {
        return <el-config-provider locale={this.locale}>
            <router-view></router-view>
        </el-config-provider>
    }
})
