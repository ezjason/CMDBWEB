import storage from '../vuePlugin/utils/storage'
const App=require('../App.vue');
const Home=r => require.ensure([], () => r(require('../pages/home.vue')), 'home');
const Login=r => require.ensure([], () => r(require('../pages/Login.vue')), 'login');
const LeftMenu=r => require.ensure([], () => r(require('../pages/LeftMenu.vue')), 'home');
const RightBody=r => require.ensure([], () => r(require('../pages/RightBody.vue')), 'home');
const Breadcrumb=r => require.ensure([], () => r(require('../pages/Breadcrumb.vue')), 'home');


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
