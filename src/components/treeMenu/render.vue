<style lang="less">
    a{
        text-decoration: none !important;
    }
    .menuList{
        .el-menu-item-group__title{
            display: none;
        }
        .el-menu-item, .el-submenu__title{
            /*margin: 5px 0;*/
            color: #666666;
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            &:hover{
                background: none;
                color: #1391c5;
            }
            >i:first-child{
                width: 24px;
                text-align: center;
                font-size: 18px;
                margin-right: 7px;
            }
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
        }
        .el-submenu{
            /*margin: 5px 0;*/
            &.is-opened{
                >.el-submenu__title{
                    .el-submenu__icon-arrow{
                        -webkit-transform: rotateZ(-90deg);
                        transform: rotateZ(-90deg);
                    }
                }
            }
            .el-menu{
                background-color: #fafcfb;
                border-radius: 0;
            }
            .el-menu-item{
                min-width: 190px;
            }
        }
        .router-link-exact-active.router-link-active{
            li{
                color: #0690c3;
                font-weight: bold;
                /*position: relative;*/
                /*background: #505050;*/
                /*&:after{*/
                    /*opacity: 1;*/
                /*}*/
            }
        }
        .el-submenu__icon-arrow{
            -webkit-transform: rotateZ(-90deg);
            transform: rotateZ(-90deg);
        }
    }
</style>

<style>
    .menuList .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
        -webkit-transform: rotateZ(0);
        transform: rotateZ(0);
    }
</style>

<template>
    <div class="menuList">
        <template v-for="menu in list">
            <el-submenu v-if="menu.children&&menu.children.length" :index="menu.name">
                <template slot="title"><i :class="{[menu.icon]:true}"></i>&nbsp;{{menu.name}}</template>
                <el-menu-item-group>
                    <tree :list="menu.children"></tree>
                </el-menu-item-group>
            </el-submenu>
            <router-link v-else :to="'/home/'+$route.params.id+'/'+menu.path">
                <el-menu-item  :index="menu.path"><i :class="{[menu.icon]:true}"></i>&nbsp;{{menu.name}}</el-menu-item>
            </router-link>
        </template>
    </div>
</template>

<script>
    module.exports = {
        props: ['list'],
        name:'tree',
        watch: {
        },
        computed: {
            resKey(){
                return this.$route.params.key
            },
            id(){
                return this.$route.params.id
            }
        },
        methods:{
        },
        updated(){
        }
    }
</script>