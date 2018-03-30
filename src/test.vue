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
            },
            checkBox(){

            },
            async pageChange(){
                return  new Promise(resolve=>{
                    this.$confirm('你还有数据未保存, 确定离开此页面么?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(()=>{resolve(true)}).catch(()=>{resolve(false)});
                });
            },
        },
        mounted(){
            console.log(+new Date());
            this.$pageChange(this.pageChange)
        },
        beforeDestroy(){

        },
    }
</script>