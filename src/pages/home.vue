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
    <div>
        <top-nav></top-nav>
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script type="es6">
    import topNav from './topNav.vue';
    import $ from 'jquery'
    module.exports = {
        components: {
            topNav
        },
        async created(){
            let systemTime=await this.$fetch('POST','/atm/common/system/time');
            let endTime=+new Date();
            this.$store.commit('setTimeDiff',endTime-systemTime.data.result);

            let data=await this.$fetch('POST','/authorization/function/user/have/list');
            this.$store.commit('setAuthorityKey',{data:data.data});
        },
        methods: {},
    }
</script>
