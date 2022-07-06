import {defineComponent, ref, onMounted, renderSlot, watch, computed, PropType} from "vue"
import {getWatermarkSVGBg, getSvgUrl, useExpose} from "@/utils"
import type {WaterMarkOptions, WaterMarkDefaultOptions} from "@/utils";

export default defineComponent({
    name: "WaterMask",
    props: {
        content: {
            type: String,
            default: "Bupu"
        },
        number: {
            type: Number,
            default: 5
        },
        size: {
            type: Number,
            default: 0
        },
        backgroundColor: {
            type: String,
            default: "transparent"
        },
        color: {
            type: String,
            default: "#e5e5e5"
        },
        fontSize: {
            type: Number,
            default: 16
        },
        config: Object as PropType<WaterMarkOptions>
    },
    setup(props) {
        let container = ref<HTMLElement | null>(null)

        let waterMaskConfig = computed<WaterMarkDefaultOptions | WaterMarkOptions>(() => {
            if (props.config) {
                return props.config
            } else {
                let config: WaterMarkDefaultOptions = {
                    content: props.content,
                    number: props.number,
                    size: props.size,
                    backgroundColor: props.backgroundColor,
                    color: props.color,
                    fontSize: props.fontSize
                }
                return config
            }
        })

        //生成水印
        function getWaterMask() {
            let svg = getWatermarkSVGBg(waterMaskConfig.value)
            let bgUrl: string = getSvgUrl(svg.outerHTML)
            if (container.value) {
                container.value.style.background = 'url("' + bgUrl + '") repeat'
            }
        }

        //获取当前编辑器配置项
        function getConfig() {
            return waterMaskConfig.value
        }


        onMounted(() => {
            getWaterMask()
        })

        watch([props], getWaterMask, {
            deep: true
        })

        useExpose({getConfig})
        return {
            container
        }
    },
    render() {
        return <div {...this.$attrs} style={{width: "100%", height: "100%"}} ref={"container"}>
            {renderSlot(this.$slots, "default")}
        </div>
    }
})
