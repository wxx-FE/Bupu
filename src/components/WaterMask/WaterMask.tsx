import {defineComponent, ref, onMounted, renderSlot, watch} from "vue"
import {getWatermarkSVGBg, getSvgUrl} from "@/utils"

export default defineComponent({
    name: "WaterMask",
    props: {
        svgName: {
            type: String,
            default: ""
        },
        svgColor: {
            type: String,
            default: "#f7f8fa"
        },
        svgNumber: {
            type: Number,
            default: 10
        },
        svgSize: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        let container = ref<HTMLElement | null>(null)

        function getWaterMask() {
            let svg = getWatermarkSVGBg(props.svgName, props.svgNumber, props.svgSize, props.svgColor)
            let bgUrl: string = getSvgUrl(svg.outerHTML)
            if (container.value) {
                container.value.style.background = 'url("' + bgUrl + '") repeat'
            }
        }

        onMounted(() => {
            getWaterMask()
        })

        watch([() => props.svgName, props.svgNumber, props.svgColor, props.svgSize], getWaterMask)

        return {
            container
        }
    },
    render() {
        return <div {...this.$attrs} ref={"container"}>
            {renderSlot(this.$slots, "default")}
        </div>
    }
})
