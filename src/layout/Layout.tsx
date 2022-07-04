import {defineComponent} from "vue";
import styles from "./Layout.module.scss"
import AsideMenu from "./AsideMenu/AsideMenu";
import {useBupuStore} from "@/store";

export default defineComponent({
    name: "Layout",
    setup(props, context) {
        return {};
    },
    render() {
        return <div class={styles["home"]}>
            <el-container>
                <el-header>Header</el-header>
                <el-container>
                    <el-aside width="200px">
                        <AsideMenu></AsideMenu>
                    </el-aside>
                    <el-container>
                        <el-main>Main</el-main>
                        <el-footer>Footer</el-footer>
                    </el-container>
                </el-container>
            </el-container>
        </div>
    }
});
