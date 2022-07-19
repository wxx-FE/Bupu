import {defineComponent, ref} from "vue";
import {AnimateTransition} from "@/components/AnimateTransition"
import type {AnimateTransitionType} from "@/components/AnimateTransition/AnimateTransition.type";


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
        return <div class={"demo"} style={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            boxSizing: "border-box",
            padding: "15px"
        }}>
            {this.transitionList.map((item: AnimateTransitionType) => {
                return <div style={{
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
        </div>
    }
})
