import {defineComponent, h, Component} from "vue";
import styles from "./Layout.module.scss"
import AsideMenu from "./AsideMenu/AsideMenu";

export default defineComponent({
    name: "Layout",
    setup(props, context) {
    },
    render() {
        return <n-layout has-sider class={styles["layout"]}>
            <n-layout-sider width={300}>
                <AsideMenu></AsideMenu>
            </n-layout-sider>
            <n-layout-content>
                <router-view></router-view>
            </n-layout-content>
        </n-layout>

    }
});
