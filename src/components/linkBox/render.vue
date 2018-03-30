<style lang="less" scoped>
    .linkBox{
        position: fixed;
        top:0;
        width: 72%;
        height: 100%;
        left:105%;
        z-index: 10;
        overflow: hidden;
        transition: all .3s;
        background: #FFFFFF;
        box-shadow:-1px 0px 10px 1px rgba(0, 0, 0, 0.3);
        &.show{
            left: 28%;
        }
        .header{
            font-size: 14px;
            line-height: 44px;
            height: 44px;
            color: #3c495a;
            padding: 0 15px;
            background: #f2f6fa;
            i{
                float: right;
                margin-top:16px;
                cursor: pointer;
                font-size: 12px;
                color: #8098b6;
                &:hover{
                    color: black;
                }
            }
            span{
                display: block;
                text-align: left;
                font-size: 18px;
            }
        }

        .linkbody{
            overflow-y: auto;
            position: absolute;
            top: 44px;
            left: 0;
            bottom: 0;
            right: 0;
            .btnList{
                padding-bottom: 10px;
                .el-button+.el-button{
                    margin-left: 25px;
                }
            }
        }
    }
</style>
<style>
    .linkBox .el-col{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

<template>
    <div>
        <div @click.stop="()=>{}"
             v-for="(box,index) in linkBoxs"
             class="linkBox"
             :key="box._"
             :class="{show:box.show}">
            <div class="header">
                <i class="el-icon-close"
                   @click="hideLinkBox(box,index)"></i>
                <span>{{box.title}}</span>
            </div>
            <div class="linkbody">
                <component @appendLinkBox="appendLinkBox" :is="box.vue" :data="box.data" :param="box.data"></component>
            </div>
        </div>
    </div>
</template>

<script>

    let animateTime=230;
    export default {
        data(){
            return {
                boxTimer:'',
                linkBoxs:[],
                lineBtn:[]
            }
        },
        computed: {
        },
        methods: {
            hideLinkBox(box,index){
                let self=this;
                box.show=false;
                if(this.boxTimer){
                    clearTimeout(this.boxTimer)
                }
                this.boxTimer=setTimeout(function(){
                    self.linkBoxs.splice(index,1);
                    self.boxTimer='';
                },animateTime);
                document.onclick=null;
            },
            allHideLinkBox(){
                let self=this;
                this.linkBoxs.map(box=>{box.show=false});
                this.boxTimer=setTimeout(function(){
                    self.linkBoxs=[];
                    self.boxTimer='';
                },animateTime);
                document.onclick=null;
            },
            appendLinkBox({show=false,data,title,vue,showBtn=false}){
                let box={
                    _:(+new Date()).toString(36),
                    show,
                    title,
                    data,
                    vue,
                    showBtn
                };
                this.linkBoxs.push(box);
                this.$nextTick(function(){
                    setTimeout(()=>{
                        box.show=true;
                    })
                })
            },
            toggleLinkBox({show=false,data,title,vue,showBtn=false}){
                let self=this;
                let box={
                    _:(+new Date()).toString(36),
                    show,
                    title,
                    data,
                    vue,
                    showBtn
                };
                this.linkBoxs.map(box=>{box.show=false});
                let old=this.linkBoxs.length;
                this.linkBoxs.push(box);
                this.$nextTick(function(){
                    if(old){
                        if(self.boxTimer){
                            clearTimeout(self.boxTimer)
                        }
                        self.boxTimer=setTimeout(function(){
                            box.show=true;
                            self.linkBoxs=[box];
                            self.boxTimer='';
                        },animateTime)
                    }else{
                        setTimeout(()=>{
                            box.show=true;
                        })
                    }
                });
                document.onclick=e=>{
                    this.allHideLinkBox()
                };
            },
        },
        mounted(){
            let self=this;
            this.$store.commit('setLinkBoxs',{
                append:self.appendLinkBox,
                toggle:self.toggleLinkBox,
                allHide:self.allHideLinkBox,
                hide:self.hideLinkBox,
            });
        }
    }
</script>