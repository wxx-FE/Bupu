import {defineStore} from "pinia";
import globalConfig from "@/globalConfig"

export const useGlobalConfigStore = defineStore("globalConfig", {
    state: () => {
        return {
            globalConfig
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: sessionStorage,
                paths: ["globalConfig"]
            }
        ]
    }
})
