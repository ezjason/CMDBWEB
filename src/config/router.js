import storage from '../vuePlugin/utils/storage'
const App=require('../App.vue');
const Home=require('../pages/home.vue');
const Login=require('../pages/login.vue');
const authorization = require('../pages/authorization.vue');
const LeftMenu=require('../pages/leftMenu.vue');
const RightBody=require('../pages/rightBody.vue');
const Breadcrumb=require('../pages/Breadcrumb.vue');

export default [
    {
        path: '/',
        component: App,
        children:[
            {
                path: '',
                redirect: '/login'
            },
            {
                path: '/login',
                component: Login,
            },
            {
                path: '/authorize',
                name:'authorize',
                component: authorization,
            },
            {
                path: '/home',
                component: Home,
                beforeEnter(to, from, next){
                    let loginKey=storage.get('loginKey');
                    if(loginKey){
                        next()
                    }else{
                        next('/')
                    }
                },
                children: [{
                    path: ':id',
                    component: LeftMenu,
                    // component: {template:`<div>{{$route.params.id}}</div>`},
                    children: [
                        {
                            path: ':key',
                            components: {
                                Breadcrumb,
                                RightBody
                            },
                            children:[
                                {
                                    path: ':info',
                                }
                            ]
                        }
                    ]
                }]
            }
        ]
    },


]
