import {defineComponent, ref} from "vue";
import {AnimateTransition} from "@/components/AnimateTransition"
import type {AnimateTransitionType} from "@/components/AnimateTransition/AnimateTransition.type";
import {MonacoEditor} from "@/components/MonacoEditor";

export default defineComponent({
    name: "AnimateTransitionDemo",
    setup() {
        let isExist = ref<boolean>(true)
        let isShow = ref<boolean>(true)


        setInterval(() => {
            isShow.value = !isShow.value
        }, 3000)

        let transitionList: Array<AnimateTransitionType> = ["bounce", "fade", "flip", "lightSpeed", "rotate", "slide", "roll"]


        return {
            isExist,
            isShow,
            transitionList
        }
    },
    render() {
        return <div class={"demo"}>
            <el-container>
                <el-main style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                    {this.transitionList.map((item: AnimateTransitionType) => {
                        return <div
                            style={{
                                width: "33%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxSizing: "border-box",
                                border: "1px solid rgba(0,0,0,0.1)",
                                marginBottom: "10px"
                            }}>
                            <div style={{
                                width: "150px",
                                height: '150px',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <AnimateTransition transitionType={item}>
                                    <p style={{color: "#409eff", fontSize: "24px"}} v-show={this.isShow}>{item}</p>
                                </AnimateTransition>
                            </div>
                            <AnimateTransition transitionType={item}>
                                <div v-show={this.isShow} style={{
                                    width: "150px",
                                    height: '150px',
                                    backgroundColor: "#409eff",
                                    marginRight: "20px",
                                    textAlign: "center",
                                    lineHeight: "150px",
                                    color: "#fff"
                                }}>
                                    {item}
                                </div>
                            </AnimateTransition>
                        </div>
                    })}
                </el-main>
                {/*<el-aside width={"320px"} style={{padding: "10px"}}>*/}
                {/*    <el-divider>配置信息</el-divider>*/}
                {/*    <el-form>*/}
                {/*        <el-form-item label={"是否存在"}>*/}
                {/*            <el-switch v-model={this.isExist}></el-switch>*/}
                {/*        </el-form-item>*/}
                {/*        <el-form-item label={"显示隐藏"}>*/}
                {/*            <el-switch v-model={this.isShow}></el-switch>*/}
                {/*        </el-form-item>*/}
                {/*    </el-form>*/}
                {/*</el-aside>*/}
            </el-container>
        </div>
    }
})
