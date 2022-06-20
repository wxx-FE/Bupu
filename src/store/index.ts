import {defineStore} from "pinia";

export const useZymStore = defineStore("zym", {
    state: () => {
        return {
            counter: 0
        }
    }
})