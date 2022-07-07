import {defineComponent, Transition, renderSlot, PropType} from "vue"
import "animate.css"
import type {AnimateTransitionType} from "./AnimateTransition.type"

export default defineComponent({
    name: "AnimateTransition",
    props: {
        transitionType: {
            type: String as PropType<AnimateTransitionType>,
            default: "bounce"
        }
    },
    setup() {
        function getAnimateClassName(transitionType: AnimateTransitionType) {
            if (transitionType === "fade") {
                return {
                    enterActiveClass: "animate__animated animate__fadeInDown",
                    leaveActiveClass: "animate__animated animate__fadeOutUp",
                    appearActiveClass: "animate__animated animate__fadeInDown"
                }
            } else if (transitionType === "bounce") {
                return {
                    enterActiveClass: "animate__animated animate__bounceInDown",
                    leaveActiveClass: "animate__animated animate__bounceOutUp",
                    appearActiveClass: "animate__animated animate__bounceInDown"
                }
            } else if (transitionType === "flip") {
                return {
                    enterActiveClass: "animate__animated animate__flipInX",
                    leaveActiveClass: "animate__animated animate__flipOutY",
                    appearActiveClass: "animate__animated animate__flipInX"
                }
            } else if (transitionType === "lightSpeed") {
                return {
                    enterActiveClass: "animate__animated animate__lightSpeedInRight",
                    leaveActiveClass: "animate__animated animate__lightSpeedOutLeft",
                    appearActiveClass: "animate__animated animate__lightSpeedInRight"
                }
            } else if (transitionType === "rotate") {
                return {
                    enterActiveClass: "animate__animated animate__rotateInDownLeft",
                    leaveActiveClass: "animate__animated animate__rotateOutUpRight",
                    appearActiveClass: "animate__animated animate__rotateInDownLeft"
                }
            } else if (transitionType === "slide") {
                return {
                    enterActiveClass: "animate__animated animate__slideInLeft",
                    leaveActiveClass: "animate__animated animate__slideOutRight",
                    appearActiveClass: "animate__animated animate__slideInLeft"
                }
            } else if (transitionType === "roll") {
                return {
                    enterActiveClass: "animate__animated animate__rollIn",
                    leaveActiveClass: "animate__animated animate__rollOut",
                    appearActiveClass: "animate__animated animate__rollIn"
                }
            }
        }

        return {
            getAnimateClassName
        }
    },
    render() {
        return <Transition
            appear
            mode={"in-out"}
            {...this.getAnimateClassName(this.$props.transitionType)}
        >
            {renderSlot(this.$slots, "default")}
        </Transition>
    }
})
