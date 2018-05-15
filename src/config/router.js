import storage from '../vuePlugin/utils/storage'
const App=r => require.ensure([], () => r(require('../App.vue')), 'appbox');
const Home=r => require.ensure([], () => r(require('../pages/home.vue')), 'home');
const Login=r => require.ensure([], () => r(require('../pages/login.vue')), 'login');
const LeftMenu=r => require.ensure([], () => r(require('../pages/leftMenu.vue')), 'home');
const RightBody=r => require.ensure([], () => r(require('../pages/rightBody.vue')), 'home');
const Breadcrumb=r => require.ensure([], () => r(require('../pages/breadcrumb.vue')), 'home');
const authorization=r => require.ensure([], () => r(require('../pages/authorization.vue')), 'authorization');

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
                    console.log(loginKey)
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
