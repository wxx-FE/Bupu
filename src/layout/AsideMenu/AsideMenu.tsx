import {Component, defineComponent, h, inject, ref, watch} from "vue"
import {MenuOption, NIcon, useMessage, useLoadingBar} from 'naive-ui'
import styles from "./AsideMenu.module.scss"
import {RouterLink, useRouter, useRoute} from 'vue-router'
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    WineOutline as WineIcon,
    HomeOutline as HomeIcon
} from '@vicons/ionicons5'

export default defineComponent({
    name: "AsideMenu",
    setup() {
        let router = useRouter()
        let route = useRoute()
        let nowMenuSelection = ref<string>("WaterMaskDemo")
        function renderIcon(icon: Component) {
            return () => h(NIcon, null, {default: () => h(icon)})
        }

        function routerJump(name: string) {
            router.push({
                name
            })
        }

        watch(() => route.name, (newName, oldName) => {
            if (typeof newName !== "string") return
            nowMenuSelection.value = newName
        })

        const menuOptions: MenuOption[] = [
            {
                label: '演示demo',
                key: 'demo',
                icon: renderIcon(BookIcon),
                children: [
                    {
                        label: '水印',
                        key: 'WaterMaskDemo',
                    },
                    {
                        label: '编辑器',
                        key: 'MonacoEditorDemo',
                    },
                    {
                        label: '动画',
                        key: 'AnimateTransitionDemo'
                    },
                    {
                        label: "签名",
                        key: "EsignDemo"
                    },
                    {
                        label: "HOC组件",
                        key: "ZymHocDemo"
                    }
                ]
            }
        ]
        return () => <div class={styles["aside-menu"]}>
            <div class={styles["aside-menu-header"]}>
                <n-image img-props={{style: {width: "100%"}}} src={"http://192.168.43.2:3000/zym.png"}></n-image>
            </div>
            <n-menu v-model:value={nowMenuSelection.value}
                    onUpdateValue={routerJump}
                    class={styles["aside-menu-content"]}
                    options={menuOptions}></n-menu>
        </div>
    }
})