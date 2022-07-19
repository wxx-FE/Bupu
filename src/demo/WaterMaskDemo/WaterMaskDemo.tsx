import {defineComponent, reactive, ref} from "vue";
import {WaterMask} from "@/components/WaterMask"
import {MonacoEditor} from "@/components/MonacoEditor"
import type {WaterMarkDefaultOptions} from "@/utils";

export default defineComponent({
    name: "WaterMaskDemo",
    setup() {
        let waterMaskInstance: any = ref(null)
        let waterMaskConfigData = reactive({
            show: false,
            config: ""
        })
        let waterMaskConfig = reactive<WaterMarkDefaultOptions>({
            content: "wxx",
            backgroundColor: "#f7f8fa",
            number: 5,
            size: 0,
            color: "#e5e5e5",
            fontSize: 15,
        })

        function showConfig() {
            waterMaskConfigData.config = JSON.stringify(waterMaskInstance.value?.getConfig(), null, 4)
            waterMaskConfigData.show = true
        }

        return {
            waterMaskConfig,
            waterMaskInstance,
            showConfig,
            waterMaskConfigData
        }
    },
    render() {
        return <div class={"demo"}>
            <n-layout has-sider>
                <n-layout-content content-style={{padding: "15px"}}>
                    <WaterMask
                        ref={"waterMaskInstance"}
                        {...this.waterMaskConfig}>
                    </WaterMask>
                </n-layout-content>
                <n-layout-sider width={320} content-style={{padding: "15px"}}>
                    <n-divider>配置信息</n-divider>
                    <n-form model={this.waterMaskConfig} label-position={"left"} label-width={"auto"}>
                        <n-form-item label={"内容"}>
                            <n-input v-model:value={this.waterMaskConfig.content}></n-input>
                        </n-form-item>
                        <n-form-item label={"数量"}>
                            <n-input-number min={0} v-model:value={this.waterMaskConfig.number}></n-input-number>
                        </n-form-item>
                        <n-form-item label={"大小"}>
                            <n-input-number v-model:value={this.waterMaskConfig.size}></n-input-number>
                        </n-form-item>
                        <n-form-item label={"字体大小"}>
                            <n-input-number min={0} v-model:value={this.waterMaskConfig.fontSize}></n-input-number>
                        </n-form-item>
                        <n-form-item label={"文字色"}>
                            <n-color-picker v-model:value={this.waterMaskConfig.color}></n-color-picker>
                        </n-form-item>
                        <n-form-item label={"背景色"}>
                            <n-color-picker v-model:value={this.waterMaskConfig.backgroundColor}></n-color-picker>
                        </n-form-item>
                        <n-button onClick={this.showConfig} type={"primary"}>查看配置</n-button>
                    </n-form>
                </n-layout-sider>
            </n-layout>
            <n-drawer width={500} v-model:show={this.waterMaskConfigData.show}>
                <n-drawer-content title={"当前配置信息"}>
                    <MonacoEditor v-model={this.waterMaskConfigData.config}
                                  readOnly={true}
                                  language={"json"}>
                    </MonacoEditor>
                </n-drawer-content>
            </n-drawer>
        </div>
    }
})
