import store from './store';
import './config/globalConfig'
import routes from './config/router'
import vuePlugin from './vuePlugin/index'
import menu from './data/menu'
import ModuleRender from "./components/table/renderVue.vue";
import widgetRender from "./components/table/searchItem.vue";
import TabsRender from "./components/tabs/render.vue";
import api from './config/api'
import cacheConfig from './config/cacheConfig'

export {
    routes,
    store,
    menu,
    vuePlugin,
    api,
    ModuleRender,
    TabsRender,
    widgetRender,
    cacheConfig
}
