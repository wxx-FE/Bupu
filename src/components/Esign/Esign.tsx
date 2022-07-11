import {defineComponent} from "vue";
import VueEsign from "vue-esign";

console.log("组件", VueEsign)
export default defineComponent({
    name: "Esign",
    props: {},
    setup() {

    },
    render() {
        return <VueEsign {...this.$attrs}></VueEsign>
    }
})
