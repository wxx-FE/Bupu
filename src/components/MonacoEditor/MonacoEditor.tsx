import {defineComponent, ref, onMounted, computed, watch, onBeforeUnmount, defineExpose} from 'vue'
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import type {PropType} from 'vue'
import type {Theme, Language, LineNumbers} from './MonacrEditor.type'
import {ElMessage} from "element-plus"
import {useExpose} from "@/utils";
//基本支持语言
import "monaco-editor/esm/vs/language/json/monaco.contribution"
import "monaco-editor/esm/vs/basic-languages/css/css.contribution"
import "monaco-editor/esm/vs/basic-languages/html/html.contribution"
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution"
//常见功能栏
import "monaco-editor/esm/vs/editor/contrib/find/browser/findController"
import "monaco-editor/esm/vs/editor/contrib/contextmenu/browser/contextmenu"
import "monaco-editor/esm/vs/editor/contrib/folding/browser/folding"
import "monaco-editor/esm/vs/editor/contrib/clipboard/browser/clipboard"

const MonacoEditor = defineComponent({
    name: 'MonacoEditor',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        language: {
            type: String as PropType<Language>,
            default: 'javascript',
        },
        // 主题
        theme: {
            type: String as PropType<Theme>,
            default: 'vs-light',
        },
        //是否只读
        readOnly: {
            type: Boolean,
            default: false,
        },
        //行高
        lineHeight: {
            type: Number,
            default: 20
        },
        //字体大小
        fontSize: {
            type: Number,
            default: 14
        },
        //是否显示行号 "on" | "off"
        lineNumbers: {
            type: String as PropType<LineNumbers>,
            default: "off"
        },
        //行号与内容之间的距离
        lineDecorationsWidth: {
            type: Number,
            default: 0
        },
        // <=25 光标宽度
        cursorWidth: {
            type: Number,
            default: 2
        },
        //显示预览图
        minimap: {
            type: Object,
            default: {
                enabled: false
            }
        },
        config: Object
    },
    setup(props, context) {
        //容器
        let container: any = ref(null)
        //配置
        let option: any = computed(() => {
            //常用的基本配置
            let commonlyConfig = {
                theme: props.theme,
                language: props.language,
                readOnly: props.readOnly,
                lineHeight: props.lineHeight,
                fontSize: props.fontSize + "px",
                lineNumbers: props.lineNumbers,
                lineDecorationsWidth: props.lineDecorationsWidth,
                cursorWidth: props.cursorWidth,
                // 预览图设置
                minimap: props.minimap
            }

            //复杂默认配置
            let defaultMonacoEditorConfig = {
                // 接受关于提交字符的建议
                acceptSuggestionOnCommitCharacter: true,
                // 接受输入建议 "on" | "off" | "smart"
                acceptSuggestionOnEnter: 'on',
                // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
                accessibilityPageSize: 10,
                // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
                accessibilitySupport: 'on',
                // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
                autoClosingBrackets: 'always',
                // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
                autoClosingDelete: 'always',
                // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
                autoClosingOvertype: 'always',
                // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
                autoClosingQuotes: 'always',
                // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
                autoIndent: 'None',
                // 自动布局
                automaticLayout: true,
                // 是否应自动环绕选择
                autoSurround: 'never',
                // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
                codeLens: false,
                // codeLens的字体样式
                codeLensFontFamily: '',
                // codeLens的字体大小
                codeLensFontSize: 14,
                // 呈现内联色彩装饰器和颜色选择器
                colorDecorators: false,
                // 注释配置
                comments: {
                    // 插入行注释时忽略空行。默认为真。
                    ignoreEmptyLines: true,
                    // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
                    insertSpace: true
                },
                // 启用上下文菜单
                contextmenu: true,
                // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
                columnSelection: false,
                // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
                copyWithSyntaxHighlighting: true,
                // 光标动画样式
                cursorBlinking: 'Solid',
                // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
                cursorSmoothCaretAnimation: true,
                // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
                cursorStyle: 'UnderlineThin',
                // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
                cursorSurroundingLines: 0,
                // "default" | "all" 光标环绕样式
                cursorSurroundingLinesStyle: 'all',
                // 是否启用代码折叠
                folding: true,
                // 是否点击链接
                links: true,
                // 是否应围绕概览标尺绘制边框
                overviewRulerBorder: false,
                // 当前行突出显示方式
                renderLineHighlight: 'gutter',
                // 选区是否有圆角
                roundedSelection: false,
                // 设置编辑器是否可以滚动到最后一行之后
                scrollBeyondLastLine: false
            }

            if (props.config) {
                return Object.assign(props.config, [commonlyConfig, defaultMonacoEditorConfig])
            } else {
                return Object.assign(commonlyConfig, defaultMonacoEditorConfig)
            }
        })
        //数据更新标志位
        let monacoInstance: monaco.editor.IStandaloneCodeEditor

        //创建编辑器实例
        function createMonacoInstance() {
            if (monacoInstance) {
                monacoInstance.dispose()
            }
            monacoInstance = monaco.editor.create(container.value, option.value)
            monacoInstance.setValue(props.modelValue)
            monacoInstance.onDidChangeModelContent(() => {
                context.emit('update:modelValue', monacoInstance.getValue())
            })
        }

        //获取当前编辑器配置项
        function getConfig() {
            return option.value
        }

        //监听是否是config
        watch(() => props.config, () => {
            if (props.config) {
                createMonacoInstance()
            }
        })

        //监听props变化 主要修改配置信息
        watch([() => props.theme, () => props.readOnly, () => props.language, () => props.lineHeight, () => props.fontSize, () => props.lineNumbers, () => props.lineDecorationsWidth, () => props.cursorWidth, props.minimap], (newVal, oldVal) => {
            ElMessage.success("重新设置")
            createMonacoInstance()
        })

        watch(() => props.modelValue, (newVal, oldVal) => {
            //确保正常输入不会重新赋值
            if (newVal !== monacoInstance.getValue()) {
                monacoInstance.setValue(props.modelValue ? props.modelValue : "")
            }
        })

        onMounted(() => {
            createMonacoInstance()
        })

        onBeforeUnmount(() => {
            if (monacoInstance) {
                monacoInstance.dispose()
            }
        })

        useExpose({getConfig})
        return {
            container
        }
    },
    render() {
        return <div ref={'container'} style={{width: '100%', height: "100%"}}></div>
    }
    ,
})

export default MonacoEditor
