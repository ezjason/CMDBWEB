<style lang="less" scoped>
    #Breadcrumb {
        position: absolute;
        top: 60px;
        left: 175px;
        right: 0;
        overflow: hidden;
        background-color: #fff;
        margin-bottom: 0;
        border-radius: 0;
        border-bottom: 1px solid #e6e6e6;
        padding: 12px;
        transition: all .2s;
        &.shrink{
            left:56px;
        }
        .el-breadcrumb{
            display: inline-block;
        }
        span{
            font-size: 12px;
        }
        .el-breadcrumb__item:last-child .el-breadcrumb__item__inner span{
            cursor: pointer;

            /*color:  #48576a;*/
            &:hover{
                color: #20a0ff;
            }
        }
        .rightBtn{
            position: absolute;
            right: 10px;
            top: 4px;
            .el-button{
                background: #1fa0ff;
                color: #fff;
                border: none;
                &:hover{
                    background: #1f88ff;
                }
            }
        }
    }
</style>
<style lang="less">
    .el-breadcrumb__separator:after{
        content: '/';
    }
</style>

<template>
    <div id="Breadcrumb" :class="{shrink:shrink}" v-if="hash.key!=='index'">
        <i class="ace-icon fa fa-home home-icon"></i>
        <el-breadcrumb separator="/">
            <transition-group name="nav" tag="div">
                <el-breadcrumb-item v-for="(item, index) in showFind" :key="item.label"><span @click="pathClick(item)">{{item.label||item}}</span></el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
        <div class="rightBtn" v-if="appendPath.length">
            <el-button size="small" @click="back">
                <i class="iconfont icon-fanhui1"></i>
                返回
            </el-button>
        </div>
    </div>
</template>

<script>
    import menu from '../data/menu'
    import _ from 'underscore'


    module.exports = {
        computed: {
            shrink(){
                return this.$store.state.shrink
            },
            hash(){
                let param = this.$route.params;
                return param
            },
            code(){
                return this.$store.state.authorityKey
            },
            appendPath(){
                return this.$store.state.appendPath
            },
            menu(){
                return menu
            },
            authority(){
                let m = this.$findAll(this.menu, {path: this.hash.key});
                if (m && m[0] && m[0].authorityCode) {
                    return this.code.indexOf(m[0].authorityCode) >= 0
                } else {
                    return true
                }
            },
            showFind(){
                let self=this;
                let data=self.find(this.menu);
                let hash;
                if(data&&data.length){
                    hash=data.map(val=>{
                        return val.path
                    }).filter(val=>val).join('/')
                    hash='/home/'+hash;
                }
                if(!this.authority){
                    return []
                }
                if(_.isArray(data)&&_.last(data)){
                    _.last(data).click=()=>{
                        this.$router.push(hash);
                        self.$store.commit('resetModule',{data:'rightBody'});
                    };
                }
                let path=data.concat(self.appendPath);
                this.setPath(path);
                return path
            }
        },
        mounted(){
        },
        methods: {
            setPath(_path){
                let path=_path;
                path=path.map(val=>{
                    return val.label
                });
                path=path.filter(val=>!!val);
                this.$store.commit('setPathText',path.join('/'))
            },
            async back(){
                let self=this;
                let index=this.showFind.length-2;
                let item=this.showFind[index];
                let before=this.showFind[index+1];
                if(!await this.$pageChange()){return}
                if(before.back){
                    before.back()
                }else if(item.click){
                    item.click(item);
                }
                this.$store.commit('popAppendPath');
            },
            async pathClick(item){
                if(!item.click||!await this.$pageChange()){
                    return
                }
                let self=this;
                let index=self.appendPath.indexOf(item);
                let data=self.appendPath.slice(0,index+1);
                this.$store.commit('setAppendPath',{data});
                item.click&&item.click(item)
            },
            find(_data){
                let path=[];
                let data=_data||this.menu;
                for(let i=0;i<data.length;i++){
                    let relay=data[i];
                    if(relay.path===this.hash.key){
                        return [{label:relay.name,path:relay.path}];
                    }else{
                        let childData=relay.children;
                        let childObj=childData&&childData.length&&this.find(childData);
                        if(childObj&&childObj.length){
                            path.push({label:relay.name,path:relay.path});
                            path=path.concat(childObj);
                        }
                    }
                }
                return path
            }
        }
    }
</script>