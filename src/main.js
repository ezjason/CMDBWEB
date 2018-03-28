import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import store from './store';
import ElementUI from 'element-ui'

import './config/globalConfig'
import routes from './config/router'
import vuePlugin from './vuePlugin/index'
import menu from './data/menu'

import ModuleRender from "./components/table/renderVue.vue";
import TabsRender from "./components/tabs/render.vue";
// import test from "./test.vue";

let test=r=>require.ensure([], () => r(require('./test.vue')), 'test');


menu.push({
    "name": "运维操作",
    "paramData": "",
    "path": "autoOperation",
    //下拉导航菜单icon
    navMenuIcon:'iconfont icon-yunweicaozuo1',
    //下拉导航菜单是否可见
    isShowInNavMenu:true,
    authorityCode: 'ATM-AUTOMATIC-MENU',
    children: [{
        name: '操作',
        path: 'autoOperationIndex',
        icon: 'fa fa-file-code-o',
        authorityCode: 'ATM-AUTOMATIC-OPTIONS-MENU',
        vue: test,
        data: {}
    }]
})
menu.push({
    "name": "首页",
    "path": "123123",
    //下拉导航菜单icon
    navMenuIcon:'iconfont icon-yunweicaozuo1',
    ///下拉导航菜单是否可见
    isShowInNavMenu:true,
    vue: TabsRender,
    data: [
        {
            name: '用户操作',
            authorityCode: 'ATM-AUTOMATIC-OPTIONS-PUBLICOPTIONS-MENU',
            vue: ModuleRender,
            data: {
                "showTitle": true,
                "showPage": true,
                "title": "用户操作列表",
                "btnAuthorityCode":'ATM-AUTOMATIC-OPTIONS-PUBLICOPTIONS-FIND-MENU',
                "type": "table",
                "url": "/atm/script/info/page/list",
                paramData: {
                    isBuilt: 0
                },
                authorityCode: [{
                    api: '/atm/script/info/page/list',
                    code: 'ATM_SCRIPT_INFO_GET_PAGE_LIST'
                }, {
                    api: '/atm/script/info/one/full',
                    code: 'ATM_SCRIPT_INFO_GET_ONE_FULL'
                }, {
                    api: '/atm/common/label/page/list',
                    code: 'ATM_COMMON_LABEL_GET_PAGE_LIST'
                }, {
                    api: '/atm/script/info/update/label',
                    code: 'ATM_SCRIPT_INFO_UPDATE_LABEL'
                },{
                    api:'/atm/script/type/page/list',
                    code:'ATM_SCRIPT_TYPE_GET_PAGE_LIST'
                },{
                    api:'/atm/script/category/page/list',
                    code:'ATM_SCRIPT_CATEGORY_GET_PAGE_LIST'
                },{
                    api:'/atm/resource/instance/page/list',
                    code:'ATM_RESOURCE_INSTANCE_GET_PAGE_LIST'
                },],
                "btn": [
                    {
                        "type": "pageOpen",
                        "text": "新增",
                        "position": "line",
                        vue: {template:`<div style="    height: 100%;    line-height: 300px;   text-align: center;    background: #666666;">hello world</div>`},

                    },{
                        "type": "pageOpen",
                        "text": "123",
                        "position": "line",
                    },{
                        "type": "pageOpen",
                        "text": "3245",
                        "position": "line",
                    },
                ],
                "grid": {
                    "showTableTop": true,
                    "pageSize": "10",
                    "checkbox": true,
                    "async": true,
                    "searchCondition": {},
                    "url": "",
                    "column": [{
                        "colkey": "scriptName",
                        "name": "操作名称",
                        "hide": false,
                        "object": "scriptInfo",
                        "width": "150px",
                        "filter": "",
                        "filterCustom": "",
                        "noSearch": false,
                        "nosort": [],
                    },
                        {
                            "colkey": "scriptLabels",
                            "name": "标签",
                            "hide": false,
                            "object": "scriptInfo",
                            "width": "270px",
                            "filter": "",
                            "filterCustom": "",
                            "noSearch": true,
                            "nosort": [],
                        },
                        {
                            "colkey": "labelName",
                            "name": "标签",
                            "hide": true,
                            "object": "scriptInfo",
                            "width": "270px",
                            "filter": "",
                            "filterCustom": "",
                            "noSearch": false,
                            "nosort": [],
                            "lookup": {
                                type: 'Select',
                                remote: '/atm/common/label/page/list',
                                replaceLabel: 'labelTitle',
                                replaceValue: 'labelTitle',
                                groupKey: 'labelTypeName',
                                props: {
                                    filterable: true,
                                },
                                option: []
                            },
                        },
                        {
                            "colkey": "categoryId",
                            "name": "分类",
                            "hide": false,
                            "object": "scriptInfo",
                            "width": "",
                            "filter": "custom",
                            "filterCustom": (val, row) => row.categoryName,
                            "noSearch": false,
                            "nosort": [],
                            "lookup": {
                                type: 'Select',
                                props: {
                                    filterable: true,
                                },
                                remote: '/atm/script/category/page/list',
                                replaceLabel: 'categoryName',
                                replaceValue: 'categoryId',
                                option: []
                            },
                        },
                        {
                            "colkey": "riskScript",
                            "name": "危险级别",
                            "hide": false,
                            "object": "scriptInfo",
                            "width": "",
                            "filter": "custom",
                            "filterCustom": function (val) {
                                let state = ['', '危险', '普通'];
                                return state[val];
                            },
                            "noSearch": false,
                            "nosort": [],
                            "lookup": {
                                type: 'Select',
                                option: [
                                    {label: '危险', value: 1},
                                    {label: '普通', value: 2},
                                ]
                            },
                        },
                        {
                            "colkey": "scriptTypeName",
                            "name": "语言",
                            "hide": false,
                            "object": "scriptInfo",
                            "width": "",
                            "filter": "",
                            "filterCustom": "",
                            "noSearch": true,
                            "nosort": [],

                        },
                        {
                            "colkey": "typeId",
                            "name": "语言",
                            "hide": true,
                            "object": "scriptInfo",
                            "width": "",
                            "filter": "",
                            "filterCustom": "",
                            "noSearch": false,
                            "nosort": [],
                            "lookup": {
                                type: 'Select',
                                remote: '/atm/script/type/page/list',
                                replaceLabel: 'typeName',
                                replaceValue: 'typeId',
                                option: []
                            },
                        },
                        {
                            "colkey": "lastUpdateTime",
                            "name": "修改时间",
                            "hide": false,
                            "object": "scriptInfo",
                            "width": "150px",
                            "filter": "date",
                            "filterCustom": "",
                            "noSearch": true,
                            "sort": true,
                        }]
                },
            }
        },
        {
            name: '内置操作',
            authorityCode: 'ATM-AUTOMATIC-OPTIONS-BUILDINOPTIONS-MENU',
            vue: ModuleRender,
            data: {
                "showTitle": true,
                "showPage": true,
                "title": "内置操作列表",
                "btnAuthorityCode":'ATM-AUTOMATIC-OPTIONS-BUILDINOPTIONS-FIND-MENU',
                "type": "table",
                "url": "/atm/script/info/page/list",
                paramData: {
                    isBuilt: 1
                },
                authorityCode: [{
                    api: '/atm/script/info/page/list',
                    code: 'ATM_SCRIPT_INFO_GET_PAGE_LIST'
                },{
                    api: '/atm/common/label/page/list',
                    code: 'ATM_COMMON_LABEL_GET_PAGE_LIST'
                },{
                    api: '/atm/common/label/page/list',
                    code: 'ATM_COMMON_LABEL_GET_PAGE_LIST'
                },{
                    api:'/atm/script/category/page/list',
                    code:'ATM_SCRIPT_CATEGORY_GET_PAGE_LIST'
                }, ],
                btn:[],
                "grid": {
                    "showTableTop": true,
                    "pageSize": "10",
                    "checkbox": true,
                    "async": true,
                    "searchCondition": {},
                    "url": "",
                    "column": [{
                        "colkey": "scriptName",
                        "name": "操作名称",
                        "hide": false,
                        "object": "scriptInfo",
                        "width": "150px",
                        "filter": "",
                        "filterCustom": "",
                        "noSearch": false,
                        "nosort": [],
                    },
                        {
                            "colkey": "scriptLabels",
                            "name": "标签",
                            "hide": false,
                            "object": "scriptInfo",
                            "width": "270px",
                            "filter": "",
                            "filterCustom": "",
                            "noSearch": true,
                            "nosort": [],
                        },
                        {
                            "colkey": "labelName",
                            "name": "标签",
                            "hide": true,
                            "object": "scriptInfo",
                            "width": "270px",
                            "filter": "",
                            "filterCustom": "",
                            "noSearch": false,
                            "nosort": [],
                            "lookup": {
                                type: 'Select',
                                remote: '/atm/common/label/page/list',
                                replaceLabel: 'labelTitle',
                                replaceValue: 'labelTitle',
                                groupKey: 'labelTypeName',
                                props: {
                                    filterable: true,
                                },
                                option: []
                            },
                        },
                        {
                            "colkey": "categoryId",
                            "name": "分类",
                            "hide": false,
                            "object": "scriptInfo",
                            "width": "",
                            "filter": "custom",
                            "filterCustom": (val, row) => row.categoryName,
                            "noSearch": false,
                            "nosort": [],
                            "lookup": {
                                type: 'Select',
                                props: {
                                    filterable: true,
                                },
                                remote: '/atm/script/category/page/list',
                                replaceLabel: 'categoryName',
                                replaceValue: 'categoryId',
                                option: []
                            },
                        },
                        {
                            "colkey": "riskScript",
                            "name": "危险级别",
                            "hide": false,
                            "object": "scriptInfo",
                            "width": "",
                            "filter": "custom",
                            "filterCustom": function (val) {
                                let state = ['', '危险', '普通'];
                                return state[val];
                            },
                            "noSearch": false,
                            "nosort": [],
                            "lookup": {
                                type: 'Select',
                                option: [
                                    {label: '危险', value: 1},
                                    {label: '普通', value: 2},
                                ]
                            },
                        },
                        {
                            "colkey": "scriptTypeName",
                            "name": "语言",
                            "hide": false,
                            "object": "scriptInfo",
                            "width": "",
                            "filter": "",
                            "filterCustom": "",
                            "noSearch": true,
                            "nosort": [],

                        },
                        {
                            "colkey": "typeId",
                            "name": "语言",
                            "hide": true,
                            "object": "scriptInfo",
                            "width": "",
                            "filter": "",
                            "filterCustom": "",
                            "noSearch": false,
                            "nosort": [],
                            "lookup": {
                                type: 'Select',
                                remote: '/atm/script/type/page/list',
                                replaceLabel: 'typeName',
                                replaceValue: 'typeId',
                                option: []
                            },
                        },
                        {
                            "colkey": "lastUpdateTime",
                            "name": "修改时间",
                            "hide": false,
                            "object": "scriptInfo",
                            "width": "150px",
                            "filter": "date",
                            "filterCustom": "",
                            "noSearch": true,
                            "sort": true,
                        }]
                },
            }
        }
    ]
})


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
