import common from './index'
export default {
    install(Vue){
        Object.keys(common).forEach(key=>{
            Vue.prototype['$'+val]=common[key]
        });
    },
}