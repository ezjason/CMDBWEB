<style lang="less" scoped>

</style>

<template>
    <div>
        {{num}}
        <el-button @click="trigger"></el-button>
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
                this.num++
            }
        },
        mounted(){

        },
        beforeDestroy(){
        },
    }
</script>