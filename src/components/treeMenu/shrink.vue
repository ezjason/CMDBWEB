<style lang="less" scoped>
    .shrinkMenu{
        .top{
            width: 100%;
            line-height: 44px;
            text-align: center;
            height: 44px;
            font-size: 18px;
            position: relative;
            /*margin: 10px 0;*/
            transition: all .2s;
            color: #5e7c98;
            /*&:after{*/
                /*content: ' ';*/
                /*position: absolute;*/
                /*left: 0;*/
                /*top: 0;*/
                /*width: 5px;*/
                /*height: 100%;*/
                /*background: #6c889c;*/
                /*transition: all .2s;*/
                /*opacity: 0;*/
            /*}*/
            &.active, &.active:hover{
                background: #4e5052;
                cursor: pointer;
                /*&:after{*/
                    /*opacity: 1;*/
                /*}*/
                >i:first-child{
                    color:#55a8fd;
                }
            }
            &:hover{
                background: #fff;
                cursor: pointer;
                >.child{
                    display: block;
                }

            }
            .el-icon-arrow-right{
                color: #bbb;
                position: absolute;
                right: 4px;
                line-height: 44px;
                font-size: 12px;
            }

            .child{
                position: absolute;
                top: 0;
                left: 59px;
                transition: all .2s;
                display: none;
                width: 100px;
                font-size: 12px;
                background: #fafcfb;
                box-shadow: #999 1px 1px 2px;
                >div{
                    position: relative;
                    &:hover{
                        >.title{
                            color: #1391c5;
                            cursor: pointer;
                        }
                        .child{
                            display: block;
                        }
                    }
                    &.active{
                        >.title{
                            color: #0690c3;
                            cursor: pointer;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
    .menuBottom>.shrinkMenu>.top.active{
        background: none;
    }
    .menuBottom>.shrinkMenu>.top.active:hover{
        background: #fff;
    }
</style>

<template>
    <div class="shrinkMenu">
        <div class="top" v-for="item in list" :class="{active:indexOf(item)}" @click="topClick(item)">
            <i :class="{[item.icon]:true}"></i>&nbsp;
            <i class="el-icon-arrow-right" v-if="item.children&&item.children.length"></i>
            <div class="child" v-if="item.children&&item.children.length">
                <div v-for="child in item.children" :class="{active:indexOf(child)}" @click="childClick(child,item)">
                    <div class="title">
                        {{child.name}}&nbsp;
                        <i class="el-icon-arrow-right" v-if="child.children&&child.children.length"></i>
                    </div>
                    <div class="child" v-if="child.children&&child.children.length" style="left:100px;">
                        <div v-for="c2 in child.children" :class="{active:indexOf(c2)}" @click="childClick(c2,child,item)">
                            <div class="title">{{c2.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['list'],
        data(){
            return {
                clickPath:''
            }
        },
        computed: {
            key(){
                return this.$route.params.key
            },
            active(){
                return this.findPath(this.list)
            }

        },
        methods: {
            topClick(menu){
                if(menu.path==this.key){
                    this.$store.commit('resetModule',{data:'rightBody'});
                }else if(menu.path){
                    this.clickPath='';
                    this.$router.push('/home/'+this.$route.params.id+'/'+menu.path);
                }
            },
            childClick(menu){
                if(arguments[0].path==this.key){
                    this.$store.commit('resetModule',{data:'rightBody'});
                }else if(arguments[0].path){
                    this.$router.push('/home/'+this.$route.params.id+'/'+menu.path);
                    this.clickPath=[];
                    for(let i of arguments){
                        this.clickPath.unshift(i)
                    }
                }
            },
            indexOf(menu){
                return this.active&&(this.active.indexOf(menu)>=0)
            },
            findPath(list){
                for(let i in list){
                    if(list[i].path===this.key){
                        return [list[i]];
                    }else if(list[i].children&&list[i].children.length){
                        let child=this.findPath(list[i].children);
                        if(child&&child.length){
                            return [list[i]].concat(child)
                        }

                    }
                }
            },
        },
        mounted(){

        }
    }
</script>