import {defineStore} from "pinia";

export const useZymStore = defineStore("zym", {
    state: () => {
        return {
            counter: 0
        }
    }
})

// @ts-ignore
export const useWxxStore: any = defineStore("wxx", {
    state: () => ({
        counter: 0
    }),
    persist: {
        enabled: true,
        strategies: [
            {storage: sessionStorage, paths: ["counter"]}
        ]
    },
    gutters: {
        doubleCounter(state: any) {
            return state.counter * 2
        }
    }
})