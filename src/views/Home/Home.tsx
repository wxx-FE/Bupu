import {defineComponent, ref, reactive, watch, provide} from "vue"
import {Router, useRouter, useRoute} from "vue-router";
import Layout from "@/layout/Layout"
import {useLoadingBar} from "naive-ui"

export default defineComponent({
    name: "Home",
    setup() {
        let router: Router = useRouter()
        let route = useRoute()
        let loadingBar = useLoadingBar()
        provide("loadingBar",loadingBar)
        watch(() => route.fullPath, () => {
            loadingBar.start()
        })

    },
    render() {
        return <Layout></Layout>
    }
})
