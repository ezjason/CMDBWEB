<style lang="less" scoped>

</style>

<template>
    <div>
        <el-input v-model="value"></el-input>
    </div>
</template>

<script>
    export default {
        props:['data'],
        watch:{
            data(){
                console.log(this.data)
            }
        },
        data(){
            return {
                value:'',
            }
        },
        computed: {},
        methods: {},
        mounted(){
        }
    }
</script>