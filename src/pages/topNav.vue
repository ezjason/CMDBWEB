<style lang="less" scoped>
    .el-menu{
        background: #4f5052;
        border-radius: 0;
        .el-menu-item{
            color: #fff;
            .router-link-active{
                /*color: #fff;*/
            }
        }
    }
    .logo{
        float: left;
        background: url("../static/img/logo.png") center no-repeat;
        width: 150px;
        height: 60px;
        margin-right: 24px;
    }
    .menu-icon{
        float: left;
        width: 60px;
        height: 60px;
        color: #fff;
        line-height: 60px;
        text-align: center;
        font-size: 19px;
    }
    .menu-icon:hover{
        color: #20a0ff;
        cursor: pointer;
    }
    ul li{
        display: block;
        float: left;
        list-style: none;
    }
    ul li a{
        &:hover{
             text-decoration: none;
             color: #ffffff;
         }
    }
    ul li a.router-link-active{
        /*background: #4fa4da;*/
    }
    ul li a{
        text-decoration: none;
        color: white;
    }
    nav:after{
        content: ' ';
        clear: both;
        display: block;
    }
    .menu{
        position: relative;
        display: inline-block;
        height: 60px;
        float: left;
        color: #000000;
        line-height: 60px;
        padding:0 20px;
        text-align: center;
        &:hover{
            background:#37a8e0 !important;
        }
        .iconfont{
            font-size: 18px;
        }
        .icon-menu2{
            color: #ffffff;
            cursor: pointer;
        }
        .menuList{
            position: absolute;
            left: 0;
            top: 60px;
            box-shadow:0 3px 8px 0px #dadada;
            background: #fff;
            z-index:10000;
            display: flex;
            .item{
                box-sizing: content-box;
                padding:30px 0px 30px 0px;
            }
            .item:first-child{
                padding:30px 0px 30px 45px;
            }
            .item:last-child{
                padding:30px 15px 30px 45px;
            }
            li{
                float: none!important;
                text-align: left;
                color: #808080;
                font-size: 14px;
                span{
                    &:hover{
                        cursor: pointer;
                        color: #36a9df;
                    }
                }
            }
            .item{
                padding-left: 45px;
                width:100px;
                text-align: left;
                li{
                    line-height:35px;
                    height: 35px;
                }
                h3{
                    position: relative;
                    color: #36a9df;
                    font-size:15px;
                    font-weight: 600;
                    padding:0 0 10px 0;
                    margin: 0;
                    border-bottom: 1px solid #e6e6e6;
                    span{
                        position: absolute;
                        left:-34px;
                        top:-5px;
                        .iconfont{
                            font-size: 26px;
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }
    .logout{
        float: right;
        div{
            color: #fff;
            float: left;
            line-height: 60px;
            text-align: center;
            font-size: 16px;
            &:hover{
                background-color: #37a8e0;
            }
        }
        .menu-icon:hover{
            color: #fff;
        }
    }
    .el-menu-item{
        border-bottom: none;
        &:hover, &.is-active{
            background-color: #37a8e0 !important;
            border-bottom: none;
        }
        a.router-link-active{
            color: #fff;
        }
    }
    .userInfo{
        float: right !important;
        .el-menu-item{
            min-width: inherit;
            text-align: center;
            background-color: #4f5052 !important;
            &:last-child{
                border-top:1px solid #333;
            }
            &:hover{
                background-color: #37a8e0 !important;
            }
        }
    }
</style>

<style>
    .userInfo.el-submenu .el-submenu__title{
        color: #fff;
        border-bottom: none;
    }
    .userInfo.el-submenu:hover .el-submenu__title{
        background-color: #37a8e0 !important;
        border-bottom: none;
    }
    .userInfo.el-submenu.is-active .el-submenu__title{
        border-bottom: none;
    }
    .userInfo.el-submenu .el-menu{
        background: #4f5052;
    }
    .userInfo.el-submenu .el-submenu__icon-arrow{
        color: #fff;
    }
</style>

<template>
    <el-menu :router="true" v-if="!!code.length" :default-active="'/home/' + $route.params.id" mode="horizontal" menu-trigger="click" @select="handleSelect">
        <div class="logo">
        </div>
        <div class="logout">
            <div class="menu-icon" @click="logout">
                <i class="iconfont icon-logout"></i>
            </div>
        </div>
        <div class="menu" @mouseenter="showMenuFunc" @mouseleave="showMenuFunc">
            <i class="iconfont icon-menu2">
            </i>
            <div class="menuList" v-show="showMenu">
                <div class="item" v-for="item in menus" v-if="item.isShowInNavMenu" >
                    <h3>
                        {{item.name}}
                        <span>
                            <i :class="item.navMenuIcon"></i>
                        </span>
                    </h3>
                    <ul>
                        <li v-if="item.children&&authority(val)" v-for="val in item.children">
                            <span @click="redirect(item,val)">{{val.name}}</span>
                        </li>
                       </ul>
                </div>
            </div>
        </div>
        <template v-for="menu in menus">
            <el-submenu v-if="menu.path==='user'" :index="'/home/'+menu.path" class="userInfo">
                <template slot="title"><i class="iconfont icon-user2"></i>&nbsp;{{account}}</template>
                <el-menu-item v-for="item in menu.children" :index="'/home/'+menu.path+'/'+item.path" v-if="authority(item)">{{item.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="'/home/'+menu.path">
                <router-link :to="'/home/'+menu.path">
                    {{menu.name}}
                </router-link>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
    import menu from '../data/menu'
    module.exports = {
        data(){
            return{
                account:'',
                accountDialog:false,
                showMenu:false,
            }
        },
        components:{
        },
        computed:{
            code(){
                return this.$store.state.authorityKey
            },
            id(){
                return this.$route.params.id;
            },
            key(){
                return this.$route.params.key;
            },
            menus() {
                let menus=menu.filter(val=>{
                    let isAuth=false;
                    if(val.path==='user'){
                        isAuth=true;
                    }else{
                        isAuth=val.authorityCode?this.code.indexOf(val.authorityCode)>=0:true;
                    }
                    return isAuth
                });
                if(!this.id&&menus.length&&this.code.length){
                    let path='/home/'+menus[0].path;
                    this.$router.replace(path);
                }
                return menus
            },
        },
        methods:{
            authority(menu){
                return menu.authorityCode?this.code.indexOf(menu.authorityCode)>=0:true
            },
            async logout(){
                await this.$fetch('POST','/user/passport/logout');
                this.$storage.set('loginKey',null);
                this.$storage.set('userInfo',null);
                this.$store.commit('setAuthorityKey',{data: []});
                this.$router.push('/');
            },
            init(){
                let loginKey=this.$storage.get('loginKey')||{};
                this.account=loginKey.account||'';
            },
            showMenuFunc(){
                this.showMenu = !this.showMenu;
            },
            //menu一级菜单,subMenu二级菜单
            redirect(menu,subMenu){
                let path = this.concatPath(subMenu);
                this.$router.push(`/home/${menu.path}/${path.join('/')}`)
            },
            concatPath(menu,path = []){
                if(Object.prototype.toString.call(menu) == "[object Array]"){
                    this.concatPath(menu.children[0],path)
                }else if(Object.prototype.toString.call(menu) == "[object Object]"){
                    if(menu.path){
                        path.push(menu.path)
                    }
                    if(Object.prototype.toString.call(menu.children) == "[object Array]"){
                        this.concatPath(menu.children[0],path)
                    }
                }
                return path;
            }
        },
        mounted(){
            this.init();
        }
    }
</script>