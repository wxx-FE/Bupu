import {defineComponent, onMounted, reactive, ref} from "vue";
import VueEsign from "vue-esign";

export default defineComponent({
    name: "EsignDemo",
    setup() {
        let esignInstance = ref<any>(null)
        let esignImage = ref<string>("")
        let esignConfig = reactive({
            width: 1920,
            height: 1080,
            lineWidth: 5,
            lineColor: "",
            bgColor: "rgba(0,0,0,0.03)",
            isCrop: false,
            isClearBgColor: false,
            format: "images/webp",
            quality: 0.5
        })

        function resetEsign() {
            if (esignInstance.value) {
                esignInstance.value.reset()
            }
        }

        function generateEsign() {
            if (esignInstance.value) {
                esignInstance.value.generate().then((data: any) => {
                    esignImage.value = data
                }, (err: any) => {
                    console.log(err)
                })
            }
        }


        onMounted(() => {

        })

        return {
            esignConfig,
            esignInstance,
            resetEsign,
            generateEsign,
            esignImage
        }
    },
    render() {
        return <n-layout has-sider class={"demo"}>
            <n-layout-content content-style={"padding:15px"}>
                <VueEsign ref={"esignInstance"} {...this.esignConfig}></VueEsign>
            </n-layout-content>
            <n-layout-sider content-style={"padding:15px"} width={300} theme={"light"}>
                <n-divider>配置信息</n-divider>
                <n-form model={this.esignConfig} label-placement={"left"} label-width={"auto"}>
                    <n-form-item label={"背景颜色"}>
                        <n-color-picker modes={["hex"]} v-model:value={this.esignConfig.bgColor}></n-color-picker>
                    </n-form-item>
                    <n-form-item label={"画笔颜色"}>
                        <n-color-picker modes={["hex"]} v-model:value={this.esignConfig.lineColor}></n-color-picker>
                    </n-form-item>
                    <n-form-item label={"图片品质"}>
                        <n-slider step={0.01} marks={true} size={"small"} min={0} max={1}
                                  v-model:value={this.esignConfig.quality}></n-slider>
                    </n-form-item>
                    <n-form-item label={"宽度"}>
                        <n-input-number min={0} v-model:value={this.esignConfig.width}></n-input-number>
                    </n-form-item>
                    <n-form-item label={"高度"}>
                        <n-input-number min={0} v-model:value={this.esignConfig.height}></n-input-number>
                    </n-form-item>
                    <n-form-item label={"画笔宽度"}>
                        <n-input-number min={0} v-model:value={this.esignConfig.lineWidth}></n-input-number>
                    </n-form-item>
                    <n-form-item label={"裁剪空白"}>
                        <n-switch v-model:value={this.esignConfig.isCrop}></n-switch>
                    </n-form-item>
                    <n-space>
                        <n-button onClick={this.resetEsign} type={"info"}>重置</n-button>
                        <n-button onClick={this.generateEsign} type={"success"}>生成图片</n-button>
                    </n-space>
                </n-form>
                <n-image
                    width={250}
                    style={{marginTop: "15px"}}
                    src={this.esignImage}></n-image>
            </n-layout-sider>
        </n-layout>
    }
})
