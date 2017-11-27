<style lang="less">
    .tabsRender{
        .el-tabs__header{
            padding: 5px 20px 0;
        }
        &.hideHeader>.el-tabs__header{
            display: none;
        }
    }
</style>

<template>
    <el-tabs class="tabsRender" :class="{hideHeader:hideHeader}" v-model="active">
        <el-tab-pane v-for="(tab,index) in data" :label="tab.name" :name="tab.index">
            <component @onPageOpen="toggle" :is="tab.vue" :data="tab.data"></component>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        props:['data'],
        data(){
            return {
                active:'0',
                hideHeader:false,
            }
        },
        watch: {
            data(){
               this.active='0';
               this.hideHeader=false;
            }
        },
        methods:{
            toggle(bool){
                this.hideHeader=bool;
            }
        }
    }
</script>