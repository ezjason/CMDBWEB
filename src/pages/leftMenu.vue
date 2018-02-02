<style lang="less" scoped>
    .treeMenu{
        position: absolute;
        width: 175px;
        top: 60px;
        bottom: 0;
        box-sizing: border-box;
        border-right: 1px solid #d9dde0;
        overflow-x: hidden;
        transition: width .2s;
        z-index: 10;
        background-color: #f1f5f6;
        /*border-top: 1px solid #76797b;*/
        border-radius: 0;
        & div:first-child{
            background: #f1f5f6;
        }
        &.shrink{
            width: 56px;
            overflow: visible;
            .toggleMenu:before{
                display: none;
            }
        }

        .menuBottom{
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 50px;
            z-index: -1;
            .toggleMenu{
                width: 100%;
                height: 20px;
                margin-bottom: 5px;
                text-align: center;
                position: relative;
                background-color: #f1f5f6;
                i{
                    border-radius: 50%;
                    font-size: 14px;
                    line-height: 20px;
                    text-align: center;
                    height: 20px;
                    width: 20px;
                    background: #b2b8b9;
                    position: relative;
                    color: #666;
                    cursor: pointer;
                    transition: background .3s;
                    &:hover{
                        background: #d6d6d6;
                    }
                }
                &:before{
                    content: ' ';
                    width: 90%;
                    margin: 0 5%;
                    height: 1px;
                    background: #b2b8b9;
                    position: absolute;
                    left: 0;
                    bottom: 9px;
                }
            }
        }
    }
</style>

<style>
    /* 一级菜单 */
    .treeMenu>.menuList>.el-submenu>.el-submenu__title,
    .treeMenu>.menuList>a>.el-menu-item,
    .treeMenu>.menuBottom>.menuList>.el-submenu>.el-submenu__title,
    .treeMenu>.menuBottom>.menuList>a>.el-menu-item{
        color: #5e7c98;
    }
    .treeMenu>.menuList>.el-submenu>.el-submenu__title:hover,
    .treeMenu>.menuList>a>.el-menu-item:hover,
    .treeMenu>.menuBottom>.menuList>.el-submenu>.el-submenu__title:hover,
    .treeMenu>.menuBottom>.menuList>a>.el-menu-item:hover{
        background: #fff;
        color: #5e7c98;
    }
    .treeMenu>.menuList>a.router-link-active>.el-menu-item{
        background: #4e5052;
        color: #e0e0e0;
        font-weight: normal;
    }
    .treeMenu>.menuList>a.router-link-active>.el-menu-item>i,
    .treeMenu>.menuBottom>.menuList>a.router-link-active>.el-menu-item>i{
        color: #55a8fd;
    }
    .treeMenu>.menuList>.el-submenu:first-child>.el-submenu__title,
    .treeMenu>.menuList>a:first-child>.el-menu-item{
        border-top: 1px solid #f1f5f6;
    }
    .treeMenu>.menuList>a:first-child.router-link-active>.el-menu-item{
        border-top: 1px solid #76797b;
    }

    /* 子级菜单 */
    .treeMenu>.menuList>.el-submenu>.el-menu .el-submenu__title,
    .treeMenu>.menuList>.el-submenu>.el-menu .el-menu-item,
    .treeMenu>.menuBottom>.menuList>.el-submenu>.el-menu .el-submenu__title,
    .treeMenu>.menuBottom>.menuList>.el-submenu>.el-menu .el-menu-item{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }
</style>

<template>
    <div>
        <div v-show="!isOptionPage">
            <el-menu class="treeMenu" :class="{shrink:shrink}" :default-openeds="openeds" :default-active="key" @select="onSelect" :unique-opened="true">
                <component :is="menuComponent" :list="menuList" ></component>
                <div class="menuBottom">
                    <div class="toggleMenu">
                        <i :class="{['el-icon-arrow-left']:!shrink,['el-icon-arrow-right']:shrink}"
                           @click="toggleMenu"></i>
                    </div>
                    <component v-if="bottomMenu&&bottomMenu.length" :is="menuComponent" :list="bottomMenu" ></component>
                </div>
            </el-menu>
        </div>

        <transition name="router-fade" mode="out-in">
            <router-view name="Breadcrumb"></router-view>
        </transition>
        <transition name="router-fade" mode="out-in" v-show="resetNumber">
            <router-view name="RightBody" v-if="showRightBody"></router-view>
            <!--:key="$route.path"-->
        </transition>
    </div>
</template>

<script type="es6">
    import TreeRender from '../components/treeMenu/render.vue';
    import Shrink from '../components/treeMenu/shrink.vue';
    import menu from '../data/menu'


    export default {
        data(){
            return {
                asyncData: null,
                showRightBody:true,
            }
        },
        components: {
            TreeRender
        },
        computed: {
            isOptionPage(){
                return this.key === 'index'
            },
            openeds(){
                return this.findOpens(this.menu,this.key)
            },
            menuComponent(){
                return this.shrink?Shrink:TreeRender
            },
            shrink(){
                return this.$store.state.shrink
            },
            resKey(){
                return this.$route.params.id;
            },
            key(){
                return this.$route.params.key;
            },
            code(){
                return this.$store.state.authorityKey
            },
            menuData(){
                return this.authorization(JSON.parse(JSON.stringify(menu)))
            },
            menu(){
                this.$store.commit('setAppendPath',{data:[]});
                let resKey = this.resKey;
                if(!this.menuData.length){
                    return []
                }
                let menuchild=this.menuData.filter(
                    function (v) {
                        return v.path == resKey
                    }
                );
                let menuList = menuchild && menuchild[0] && menuchild[0].children;
                if(menuList && menuList.length){
                    if(!this.key||this.key==='index'){
                        let realPath=this.findPath(menuList);
                        if(realPath){
                            this.$router.replace('/home/' + resKey + '/'+realPath)
                        }
                    }
                }else{
                    this.$router.replace(`/home/${resKey}/index`)
                }
                return menuList||[]
            },
            menuList(){
                return this.menu.filter(val=>val.position!=='bottom');
            },
            bottomMenu(){
                return this.menu.filter(val=>val.position==='bottom');
            },
            resetNumber(){
                this.resetRightBody();
                return this.$store.state.reset.rightBody>=0;
            },
        },

        methods: {
            findOpens(menu,key){
                let result=[];
                let exist='';
                for(let item of menu){
                    if(item.path===key){
                        result.push(item.name);
                        break;
                    }else if(item.children){
                        exist=this.findOpens(item.children,key);
                        if(exist.length){
                            result.push(item.name);
                            result=result.concat(exist);
                            break
                        }
                    }
                }
                return result
            },
            findPath(menu){
                for(let item of menu){
                    if(item.path){
                        return item.path;
                    }else if(item.children&&item.children.length){
                        return this.findPath(item.children);
                    }
                }
            },
            authorization(menuData){
                return menuData.filter((val,index)=>{
                    if (val.children && val.children.length) {
                        val.children = this.authorization(val.children);
                    }else if(val.data&&val.data.length){
                        val.data = this.authorization(val.data);
                    }
                    return val.authorityCode?this.code.indexOf(val.authorityCode)>=0:true;

                })
            },
            onSelect(path){
                if(path==this.key){
//                    this.resetRightBody();
                    this.$store.commit('resetModule',{data:'rightBody'});
                }
            },
            resetRightBody(){
                this.$store.commit('setAppendPath',{data:[]});
                this.showRightBody=false;
                this.$nextTick(function () {
                    this.showRightBody=true;
                })
            },
            toggleMenu(){
                this.$store.commit('toggleShrink')
            }
        },
        updated(){
        },
        mounted(){
        }
    }
</script>