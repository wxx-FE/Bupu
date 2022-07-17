import {defineComponent, Component, watch, ref} from "vue"

//基础图片 传入一个链接即可显示
const baseImage = defineComponent({
    name: "ZymHoc",
    props: {
        avatar: {
            type: String,
            default: ""
        }
    },
    render() {
        return <img style={{width: "200px"}} src={this.$props.avatar}/>
    }
})

function MakeImage1(baseImage: Component): Component {
    return defineComponent({
        name: "ZymHoc1",
        props: {
            id: {
                type: String,
                default: ""
            }
        },
        setup(props) {
            function getAvatarById(id: string) {
                if (id === "1") {
                    return "https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF"
                } else if (id === "2") {
                    return "https://t7.baidu.com/it/u=825057118,3516313570&fm=193&f=GIF"
                } else if (id === "3") {
                    return "https://t7.baidu.com/it/u=1517419723,1472324058&fm=193&f=GIF"
                } else if (id === "4") {
                    return "https://t7.baidu.com/it/u=359304471,1368552526&fm=193&f=GIF"
                } else {
                    return "https://img1.baidu.com/it/u=3120415872,169262463&fm=253&fmt=auto&app=138&f=JPEG?w=164&h=138"
                }
            }

            return {
                getAvatarById
            }
        },
        render() {
            return <baseImage {...this.$attrs} avatar={this.getAvatarById(this.$props.id)}></baseImage>
        }
    })
}

function getCommonImage(component:Component):Component{
    let v = 3
    if(v===3){
        return component
    }else if(v === 4){
        return defineComponent({

        })
    }else{
        return component
    }
}


let baseImage1: Component = MakeImage1(baseImage)


let baseImage2: Component = MakeImage1(baseImage)


export default defineComponent({
    name: "ZymHocDemo",
    setup() {
        let testUrl: string = "https://t7.baidu.com/it/u=3691080281,11347921&fm=193&f=GIF"
        let testId = ref("1")
        return {
            testUrl,
            testId
        }

    },
    render() {
        return <n-layout has-sider class={"demo"}>
            <n-layout-content content-style={"padding:15px"}>
                <p>基础图片</p>
                <baseImage src={this.testUrl}></baseImage>
                <p>根据id显示图片</p>
                <baseImage1 id={this.testId}></baseImage1>
            </n-layout-content>
            <n-layout-sider content-style={"padding:15px"} width={300} theme={"light"}>
                <n-divider>配置信息</n-divider>
                <n-form label-placement={"left"} label-width={"auto"}>
                    <n-form-item label={"图片id"}>
                        <n-input v-model:value={this.testId}></n-input>
                    </n-form-item>
                </n-form>
            </n-layout-sider>
        </n-layout>
    }
})