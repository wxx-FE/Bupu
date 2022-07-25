import {defineComponent, reactive,provide,watch} from "vue"
import {zhCN, dateZhCN,useLoadingBar} from "naive-ui";
import {useRoute} from "vue-router";
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
            <n-loading-bar-provider>
                <router-view></router-view>
            </n-loading-bar-provider>
        </n-config-provider>

    }
})
