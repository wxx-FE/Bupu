import {defineComponent} from "vue"

export default defineComponent({
    name: "App",
    setup() {
        //document.domain = "192.168.1.6"
    },
    render() {
        return <router-view></router-view>
    }
})
