import {defineComponent, reactive, ref, inject, onBeforeUnmount} from "vue";
import type {FormInstance} from "element-plus"
import styles from "./Login.module.scss";
import rc1 from "@/assets/bgImg/RC1.jpg"
import rc2 from "@/assets/bgImg/RC2.jpg"
import rc3 from "@/assets/bgImg/RC3.jpg"
import rc4 from "@/assets/bgImg/RC4.jpg"
import rc5 from "@/assets/bgImg/RC5.jpg"
import rc6 from "@/assets/bgImg/RC6.jpg"
import rc7 from "@/assets/bgImg/RC7.jpg"
import rc8 from "@/assets/bgImg/RC8.jpg"
import rc9 from "@/assets/bgImg/RC9.jpg"
import rc10 from "@/assets/bgImg/RC10.jpg"
import {User, Lock} from "@element-plus/icons-vue"
import {ElMessage} from "element-plus"
import {useRouter} from "vue-router";
import {useGlobalConfigStore} from "@/store"


export default defineComponent({
    name: "Login",
    setup(props, context) {
        let loginForm: any = ref<FormInstance>()
        let globalConfigStore = useGlobalConfigStore()
        let bgMap: any = {
            0: rc1,
            1: rc2,
            2: rc3,
            3: rc4,
            4: rc5,
            5: rc6,
            6: rc7,
            7: rc8,
            8: rc9,
            9: rc10
        };
        let bg: string = bgMap[Math.floor(Math.random() * 10)];
        let router: any = useRouter()
        //账号密码
        let userMsg = reactive({
            username: "",
            password: ""
        });
        //校验
        let rules = {
            username: [{required: true, message: "请输入账号", trigger: "blur"}],
            password: [{required: true, message: "请输入密码", trigger: "blur"}]
        };

        //路由跳转
        function jump(v: string) {
            if (!loginForm.value) return
            loginForm.value.validate((valid: boolean) => {
                if (valid) {
                    ElMessage.success("登录成功")
                    router.push({name: "Home"})
                } else {
                    return false
                }
            })
        }

        function KeyboardListener(keyboardEvent: KeyboardEvent) {
            if (keyboardEvent.keyCode === 13) {
                jump('Home')
            }
        }


        window.addEventListener("keydown", KeyboardListener)

        onBeforeUnmount(() => {
            //移除键盘监听事件
            window.removeEventListener("keydown", KeyboardListener)
        })

        return {
            bgMap,
            userMsg,
            rules,
            jump,
            bg,
            loginForm
        };
    },
    render() {
        return (
            <div class={styles["login"]}>
                <img class={styles['login-bg']} src={this.bg}/>
                <div class={styles["content"]}>
                    <div class={styles["content-left"]}>
                        <div>
                            <img src={""}/>
                        </div>
                    </div>
                    <div class={styles["content-right"]}>
                        <p class={styles["content-right-copyright"]}>版权所有@Bupu</p>
                        <p class={styles["content-right-title"]}>Bupu</p>
                        <el-form ref={"loginForm"} size={'large'} rules={this.rules} model={this.userMsg}>
                            <el-form-item prop="username">
                                <el-input
                                    prefix-icon={() => <el-icon><User></User></el-icon>}
                                    v-model={this.userMsg.username}
                                    placeholder="账号"
                                ></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input
                                    prefix-icon={() => <el-icon><Lock></Lock></el-icon>}
                                    v-model={this.userMsg.password}
                                    placeholder="密码"
                                    show-password
                                    type="password"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    style="width:100%;margin-top:10px;"
                                    type="primary"
                                    round
                                    onclick={() => {
                                        this.jump("Home");
                                    }}
                                >
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        );
    }
});
