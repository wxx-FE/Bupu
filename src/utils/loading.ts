import {Component, defineComponent, createVNode, onMounted, provide, inject, renderSlot} from "vue";

type Lazy<T> = () => Promise<T>;

export function lazyLoadComponent(component:()=>Promise<any>){
    component().then(data=>{
        console.log(data)
    })
    return defineComponent({})
}


export function loadingComponent(component: Component): Component {
    console.log(component)
    return defineComponent({
        name: component.name,
        setup() {
            const loadingBar: any = inject("loadingBar")
            onMounted(() => {
                setTimeout(() => {
                    loadingBar.finish()
                }, 0)
            })
        },
        render() {
            return createVNode(component, {...this.$attrs},renderSlot(this.$slots,"default"))
        }
    })
}
