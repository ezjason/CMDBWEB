import store from './store';
import './config/globalConfig'
import routes from './config/router'
import vuePlugin from './vuePlugin/index'
import menu from './data/menu'
import ModuleRender from "./components/table/renderVue.vue";
import TabsRender from "./components/tabs/render.vue";

export {
    routes,
    store,
    menu,
    vuePlugin,
    ModuleRender,
    TabsRender,
}
