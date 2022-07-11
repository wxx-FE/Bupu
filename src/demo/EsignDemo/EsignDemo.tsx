import {defineComponent, onMounted, reactive, ref} from "vue";
import {Esign} from "@/components/Esign";
import {MonacoEditor} from "@/components/MonacoEditor";
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
                    console.log(data)
                    esignImage.value = data
                }, (err: any) => {
                    console.log(err)
                })
            }
        }


        onMounted(() => {
            console.log(esignInstance.value)
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
        return <div class={"demo"}>
            <el-container>
                <el-main>
                    <VueEsign ref={"esignInstance"} {...this.esignConfig}></VueEsign>
                </el-main>
                <el-aside width={"320px"} style={{padding: "10px",overflow:"hidden"}}>
                    <el-divider>配置信息</el-divider>
                    <el-form model={this.esignConfig} label-position={"left"} label-width={"auto"}>
                        <el-form-item label={"背景颜色"}>
                            <el-color-picker v-model={this.esignConfig.bgColor}></el-color-picker>
                        </el-form-item>
                        <el-form-item label={"画笔颜色"}>
                            <el-color-picker v-model={this.esignConfig.lineColor}></el-color-picker>
                        </el-form-item>
                        <el-form-item label={"图片品质"}>
                            <el-slider step={0.01} marks={true} size={"small"} min={0} max={1} v-model={this.esignConfig.quality}></el-slider>
                        </el-form-item>
                        <el-form-item label={"宽度"}>
                            <el-input-number min={0} v-model={this.esignConfig.width}></el-input-number>
                        </el-form-item>
                        <el-form-item label={"高度"}>
                            <el-input-number min={0} v-model={this.esignConfig.height}></el-input-number>
                        </el-form-item>
                        <el-form-item label={"画笔宽度"}>
                            <el-input-number min={0} v-model={this.esignConfig.lineWidth}></el-input-number>
                        </el-form-item>
                        <el-form-item label={"裁剪空白"}>
                            <el-switch v-model={this.esignConfig.isCrop}></el-switch>
                        </el-form-item>
                        <el-button onClick={this.resetEsign} type={"primary"}>重置</el-button>
                        <el-button onClick={this.generateEsign} type={"success"}>生成图片</el-button>
                    </el-form>
                    <el-image style={{marginTop: "15px"}} preview-src-list={[this.esignImage]}
                              src={this.esignImage}></el-image>
                </el-aside>
            </el-container>
            {/*<el-drawer title={"当前配置信息"} v-model={this.monacoEditorConfig.show}>*/}
            {/*    <MonacoEditor v-model={this.monacoEditorConfig.config}*/}
            {/*                  readOnly={true}*/}
            {/*                  language={"json"}>*/}
            {/*    </MonacoEditor>*/}
            {/*</el-drawer>*/}
        </div>
    }
})
