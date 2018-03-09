<style lang="less" scoped>

</style>

<template>
    <div>{{num}}</div>
</template>

<script>
    export default {
        data(){
            return {
                num:0
            }
        },
        computed: {},
        methods: {},
        mounted(){
            this.$windowEventOn('onresize',()=>{console.log(11);this.num++});
            this.$windowEventOn('onclick',()=>{console.log(22);this.num--})
        },
        beforeDestroy(){
            this.$windowEventOff('onresize');
            this.$windowEventOff('onclick')
        },
    }
</script>