<style lang="less">
    body, ul {
        margin: 0;
        padding: 0;
        font-family: Roboto, Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\\5FAE软雅黑', Arial, sans-serif;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background: rgba(0, 0, 0, 0);
    }

    ::-webkit-scrollbar-thumb {
        /* background-color: rgb(79, 164, 218); */
        background-color: #dce7ed;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        border-right: 1px solid #fff;
    }
</style>

<template>
    <div v-loading="loading" :element-loading-text="loadText">
        <top-nav></top-nav>
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script type="es6">
    import topNav from './topNav.vue';
    import menu from '../data/menu'
    import $ from 'jquery'
    module.exports = {
        components: {
            topNav
        },
        data(){
            return {
                loading:true,
                loadText:'',
            }
        },
        methods:{
            diffMenu(menuJson){
                for(let item of menuJson){
                    let menuItem=this.$findAll(menu,{authorityCode:item.authorityCode});
                    if(menuItem instanceof Array&&menuItem.length){
                        menuItem[0].name=item.name;
                    }
                    if(item.children&&item.children instanceof Array&&item.children.length){
                        this.diffMenu(item.children)
                    }
                }
            },
            async getMenuJson(){
                this.loadText='加载菜单数据中...';
                let menuJson;
                try{
                    menuJson=await this.$fetch('GET','menu.json');
                }catch (err){
                    console.log('未找到菜单配置静态配置文件menu.json')
                }
                menuJson instanceof Array&&this.diffMenu(menuJson);
            },
            async getTime(){
                this.loadText='校对时间中...';
                let systemTime=await this.$fetch('POST','/atm/common/system/time');
                let endTime=+new Date();
                window.timeDiff=endTime-systemTime.data.result;
                this.$store.commit('setTimeDiff',window.timeDiff);
            },
            async getAuthorization(){
                this.loadText='加载用户权限中...';
                let data=await this.$fetch('POST','/authorization/function/user/have/list');
                this.$store.commit('setAuthorityKey',{data:data.data});
            },
        },
        async created(){
            await this.getMenuJson();
            await this.getTime();
            await this.getAuthorization();
            this.loadText='即将加载完成...';
            this.$nextTick(()=>{
                this.loading=false;
            })
        },
    }
</script>
