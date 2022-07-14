import {defineComponent, reactive} from "vue"
import {zhCN, dateZhCN} from "naive-ui";

export default defineComponent({
    name: "App",
    setup() {
        //document.domain = "192.168.1.6"
        let allConfig = reactive({
            componentSize: "middle",
            locale: zhCN,
            dateLocale: dateZhCN
        })
        return {
            allConfig
        }
    },
    render() {
        return <n-config-provider {...this.allConfig}>
            <router-view></router-view>
        </n-config-provider>
    }
})
