import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import store from './store';
import ElementUI from 'element-ui'

import './config/globalConfig'
import routes from './config/router'
import vuePlugin from './vuePlugin/index'

const isProd = process.env.NODE_ENV === 'production';
Vue.config.devtools = !isProd;
Vue.config.silent = isProd;

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(vuePlugin);

const router = new VueRouter({
    routes,
    mode:'hash',
    strict:isProd
});

const app = new Vue({
    store:new Vuex.Store(store),
    router,
    el: '#app'
});
