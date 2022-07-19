import {defineComponent, ref, reactive, watch, onMounted} from "vue"
import {MonacoEditor} from "@/components/MonacoEditor"

export default defineComponent({
    name: "MonacoEditorDemo",
    setup() {
        let text = ref<string>("")
        let monacoEditorConfig = reactive({
            show: false,
            config: ""
        })
        let monacoEditor: any = ref(null)
        let languageList = [
            {
                label: "json",
                value: "json"
            },
            {
                label: "html",
                value: "html"
            },
            {
                label: "css",
                value: "css"
            },
            {
                label: 'javascript',
                value: "javascript"
            },
            {
                label: "typescript",
                value: "typescript"
            }
        ]
        let themeList = [{
            label: "vs-dark",
            value: "vs-dark"
        }, {
            label: "vs-light",
            value: "vs-light"
        }]
        let lineNumbersList = [
            {
                label: "显示",
                value: "on"
            },
            {
                label: "隐藏",
                value: "off"
            }
        ]
        let monacoConfig: any = reactive({
            theme: "vs-light",
            language: "javascript",
            readOnly: false,
            lineHeight: 20,
            fontSize: 15,
            lineNumbers: "on",
            lineDecorationsWidth: 0,
            cursorWidth: 2,
            minimap: {
                enabled: false
            }
        })


        function showConfig() {
            monacoEditorConfig.config = JSON.stringify(monacoEditor.value?.getConfig(), null, 4)
            monacoEditorConfig.show = true
        }

        watch(() => monacoConfig.language, () => {
            switch (monacoConfig.language) {
                case "json":
                    text.value = "{\n" +
                        "  \"name\": \"Bupu\",\n" +
                        "  \"private\": true,\n" +
                        "  \"version\": \"0.0.0\",\n" +
                        "  \"scripts\": {\n" +
                        "    \"dev\": \"vite --host\",\n" +
                        "    \"build\": \"vue-tsc --noEmit && vite build\",\n" +
                        "    \"preview\": \"vite preview\"\n" +
                        "  },\n" +
                        "  \"dependencies\": {\n" +
                        "    \"@antv/g2plot\": \"^2.4.19\",\n" +
                        "    \"@faker-js/faker\": \"^7.2.0\",\n" +
                        "    \"@vitejs/plugin-vue-jsx\": \"^1.3.10\",\n" +
                        "    \"@wangeditor/editor-for-vue\": \"^5.1.11\",\n" +
                        "    \"animate.css\": \"^4.1.1\",\n" +
                        "    \"dayjs\": \"^1.11.3\",\n" +
                        "    \"echarts\": \"^5.3.2\",\n" +
                        "    \"element-plus\": \"^2.2.5\",\n" +
                        "    \"mitt\": \"^3.0.0\",\n" +
                        "    \"monaco-editor\": \"0.33.0\",\n" +
                        "    \"pinia\": \"^2.0.14\",\n" +
                        "    \"pinia-plugin-persist\": \"^1.0.0\",\n" +
                        "    \"save\": \"^2.5.0\",\n" +
                        "    \"vform3-builds\": \"^3.0.8\",\n" +
                        "    \"vue\": \"^3.2.25\",\n" +
                        "    \"vue-esign\": \"^1.1.0\",\n" +
                        "    \"vue-router\": \"4\",\n" +
                        "    \"xgplayer\": \"^2.31.6\",\n" +
                        "    \"yarn\": \"^1.22.19\"\n" +
                        "  },\n" +
                        "  \"devDependencies\": {\n" +
                        "    \"@types/node\": \"^18.0.0\",\n" +
                        "    \"@vitejs/plugin-vue\": \"^2.3.3\",\n" +
                        "    \"typescript\": \"^4.5.4\",\n" +
                        "    \"vite\": \"^2.9.9\",\n" +
                        "    \"vue-tsc\": \"^0.34.7\",\n" +
                        "    \"sass\": \"^1.26.5\",\n" +
                        "    \"sass-loader\": \"^8.0.2\"\n" +
                        "  }\n" +
                        "}\n"
                    break
                case "javascript":
                    text.value = "import {createApp} from 'vue'\n" +
                        "import App from './App'\n" +
                        "import \"@/assets/styles/globals.scss\"\n" +
                        "\n" +
                        "const app = createApp(App)\n" +
                        "\n" +
                        "//状态管理\n" +
                        "import pinia from \"@/store\"\n" +
                        "\n" +
                        "app.use(pinia)\n" +
                        "\n" +
                        "//UI框架\n" +
                        "import ElementPlus from \"element-plus\"\n" +
                        "import \"element-plus/dist/index.css\";\n" +
                        "\n" +
                        "app.use(ElementPlus)\n" +
                        "\n" +
                        "//路由\n" +
                        "import router from \"./router\";\n" +
                        "\n" +
                        "console.log(router)\n" +
                        "app.use(router)\n" +
                        "\n" +
                        "\n" +
                        "app.mount('#app')\n"
                    break
                case "typescript":
                    text.value = "import {createApp} from 'vue'\n" +
                        "import App from './App'\n" +
                        "import \"@/assets/styles/globals.scss\"\n" +
                        "\n" +
                        "const app = createApp(App)\n" +
                        "\n" +
                        "//状态管理\n" +
                        "import pinia from \"@/store\"\n" +
                        "\n" +
                        "app.use(pinia)\n" +
                        "\n" +
                        "//UI框架\n" +
                        "import ElementPlus from \"element-plus\"\n" +
                        "import \"element-plus/dist/index.css\";\n" +
                        "\n" +
                        "app.use(ElementPlus)\n" +
                        "\n" +
                        "//路由\n" +
                        "import router from \"./router\";\n" +
                        "\n" +
                        "console.log(router)\n" +
                        "app.use(router)\n" +
                        "\n" +
                        "\n" +
                        "app.mount('#app')\n"
                    break
                case "html":
                    text.value = "<!DOCTYPE html>\n" +
                        "<html lang=\"en\">\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\"/>\n" +
                        "    <link rel=\"icon\" href=\"/favicon.ico\"/>\n" +
                        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\n" +
                        "    <title>Bupu</title>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "<noscript>\n" +
                        "    save your strength\n" +
                        "</noscript>\n" +
                        "<div id=\"app\"></div>\n" +
                        "<script type=\"module\" src=\"/src/main.ts\"></script>\n" +
                        "</body>\n" +
                        "</html>\n"
                    break
                case "css":
                    text.value = "html, body, div, span, applet, object, iframe,\n" +
                        "h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n" +
                        "a, abbr, acronym, address, big, cite, code,\n" +
                        "del, dfn, em, img, ins, kbd, q, s, samp,\n" +
                        "small, strike, strong, sub, sup, tt, var,\n" +
                        "b, u, i, center,\n" +
                        "dl, dt, dd, ol, ul, li,\n" +
                        "fieldset, form, label, legend,\n" +
                        "table, caption, tbody, tfoot, thead, tr, th, td,\n" +
                        "article, aside, canvas, details, embed,\n" +
                        "figure, figcaption, footer, header, hgroup,\n" +
                        "menu, nav, output, ruby, section, summary,\n" +
                        "time, mark, audio, video, img {\n" +
                        "    margin: 0;\n" +
                        "    padding: 0;\n" +
                        "    border: 0;\n" +
                        "    font-size: 100%;\n" +
                        "    vertical-align: baseline;\n" +
                        "    user-select: none;\n" +
                        "}\n" +
                        "\n" +
                        "a {\n" +
                        "    text-decoration: none;\n" +
                        "    color:#000;\n" +
                        "}\n" +
                        "\n" +
                        "* {\n" +
                        "    user-select: none;\n" +
                        "}\n" +
                        "\n" +
                        "/* HTML5 display-role reset for older browsers */\n" +
                        "article, aside, details, figcaption, figure,\n" +
                        "footer, header, hgroup, menu, nav, section {\n" +
                        "    display: block;\n" +
                        "}\n" +
                        "\n" +
                        "body {\n" +
                        "    line-height: 1;\n" +
                        "}\n" +
                        "\n" +
                        "ol, ul {\n" +
                        "    list-style: none;\n" +
                        "}\n" +
                        "\n" +
                        "blockquote, q {\n" +
                        "    quotes: none;\n" +
                        "}\n" +
                        "\n" +
                        "blockquote:before, blockquote:after,\n" +
                        "q:before, q:after {\n" +
                        "    content: '';\n" +
                        "    content: none;\n" +
                        "}\n" +
                        "\n" +
                        "table {\n" +
                        "    border-collapse: collapse;\n" +
                        "    border-spacing: 0;\n" +
                        "}\n"
                default:
            }
        }, {immediate: true})

        onMounted(() => {
            console.log(monacoEditor.value)
        })

        return {
            text,
            monacoConfig,
            languageList,
            themeList,
            monacoEditor,
            lineNumbersList,
            showConfig,
            monacoEditorConfig
        }
    },
    render() {
        return <div class={"demo"}>
            <n-layout has-sider>
                <n-layout-content content-style={{padding: "15px"}}>
                    <MonacoEditor
                        ref={"monacoEditor"}
                        style={{border: "1px solid rgba(0,0,0,.1)"}}
                        {...this.monacoConfig}
                        v-model={this.text}>
                    </MonacoEditor>
                </n-layout-content>
                <n-layout-sider width={"320px"} content-style={{padding: "15px"}}>
                    <n-divider>配置信息</n-divider>
                    <n-form model={this.monacoConfig} label-position={"left"} label-width={"auto"}>
                        <n-form-item label={"是否只读"}>
                            <n-switch v-model:value={this.monacoConfig.readOnly}></n-switch>
                        </n-form-item>
                        <n-form-item label={"预览图"}>
                            <n-switch v-model:value={this.monacoConfig.minimap.enabled}></n-switch>
                        </n-form-item>
                        <n-form-item label={"行高"}>
                            <n-input-number min={0} v-model:value={this.monacoConfig.lineHeight}></n-input-number>
                        </n-form-item>
                        <n-form-item label={"字体大小"}>
                            <n-input-number min={0} v-model:value={this.monacoConfig.fontSize}></n-input-number>
                        </n-form-item>
                        <n-form-item label={"行号间距"}>
                            <n-input-number min={0}
                                            v-model:value={this.monacoConfig.lineDecorationsWidth}></n-input-number>
                        </n-form-item>
                        <n-form-item label={"光标宽度"}>
                            <n-input-number min={0} v-model:value={this.monacoConfig.cursorWidth}></n-input-number>
                        </n-form-item>
                        <n-form-item label={"语言"}>
                            <n-select v-model:value={this.monacoConfig.language} options={this.languageList}>
                            </n-select>
                        </n-form-item>
                        <n-form-item label={"主题"}>
                            <n-select v-model:value={this.monacoConfig.theme} options={this.themeList}>
                            </n-select>
                        </n-form-item>
                        <n-form-item label={"行号"}>
                            <n-select v-model:value={this.monacoConfig.lineNumbers} options={this.lineNumbersList}>
                            </n-select>
                        </n-form-item>
                        <n-button onClick={this.showConfig} type={"primary"}>查看配置</n-button>
                    </n-form>
                </n-layout-sider>
            </n-layout>
            <n-drawer title={"当前配置信息"} width={500} v-model:show={this.monacoEditorConfig.show}>
                <n-drawer-content title={"当前配置信息"}>
                    <MonacoEditor v-model={this.monacoEditorConfig.config}
                                  readOnly={true}
                                  language={"json"}>
                    </MonacoEditor>
                </n-drawer-content>
            </n-drawer>
        </div>
    }
})
