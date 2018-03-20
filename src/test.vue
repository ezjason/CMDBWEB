<style lang="less" scoped>

</style>

<template>
    <div>
        {{num}}
        <el-button @click="trigger">trigger</el-button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                num:0
            }
        },
        computed: {},
        methods: {
            trigger(){
                this.$windowEvent.trigger('onclick')
            }
        },
        mounted(){
            this.$windowEvent.on('onresize',()=>{console.log(11);this.num++});
            this.$windowEvent.on('onclick',()=>{console.log(22);this.num--})
        },
        beforeDestroy(){
            this.$windowEvent.off('onresize');
            this.$windowEvent.off('onclick')
        },
    }
</script>