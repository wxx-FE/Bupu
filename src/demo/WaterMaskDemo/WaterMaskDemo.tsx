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
            <el-container>
                <el-main>
                    <WaterMask
                        ref={"waterMaskInstance"}
                        {...this.waterMaskConfig}>
                    </WaterMask>
                </el-main>
                <el-aside width={"320px"} style={{padding: "10px"}}>
                    <el-divider>配置信息</el-divider>
                    <el-form model={this.waterMaskConfig} label-position={"left"} label-width={"auto"}>
                        <el-form-item label={"内容"}>
                            <el-input v-model={this.waterMaskConfig.content}></el-input>
                        </el-form-item>
                        <el-form-item label={"数量"}>
                            <el-input-number min={0} v-model={this.waterMaskConfig.number}></el-input-number>
                        </el-form-item>
                        <el-form-item label={"大小"}>
                            <el-input-number v-model={this.waterMaskConfig.size}></el-input-number>
                        </el-form-item>
                        <el-form-item label={"字体大小"}>
                            <el-input-number min={0} v-model={this.waterMaskConfig.fontSize}></el-input-number>
                        </el-form-item>
                        <el-form-item label={"文字色"}>
                            <el-color-picker v-model={this.waterMaskConfig.color}></el-color-picker>
                        </el-form-item>
                        <el-form-item label={"背景色"}>
                            <el-color-picker v-model={this.waterMaskConfig.backgroundColor}></el-color-picker>
                        </el-form-item>
                        <el-button onClick={this.showConfig} type={"primary"}>查看配置</el-button>
                    </el-form>
                </el-aside>
            </el-container>
            <el-drawer title={"当前配置信息"} v-model={this.waterMaskConfigData.show}>
                <MonacoEditor v-model={this.waterMaskConfigData.config}
                              readOnly={true}
                              language={"json"}>
                </MonacoEditor>
            </el-drawer>
        </div>
    }
})
