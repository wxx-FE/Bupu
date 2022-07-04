import {createPinia} from "pinia";
import piniaPersist from "pinia-plugin-persist";
import {useGlobalConfigStore} from "./modules/globalConfigStore";

const pinia = createPinia()
pinia.use(piniaPersist)

export default pinia
export {useGlobalConfigStore}
