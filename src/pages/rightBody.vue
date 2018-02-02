<style lang="less" scoped>
    .rightBody {
        position: absolute;
        left: 175px;
        right: 0;
        overflow: auto;
        top: 100px;
        bottom: 0;
        /*border-top: 2px solid #ececec;*/
        border: 5px solid #ececec;
        /*transition: left .2s;*/
        &.shrink{
            left:56px;
        }
        >div{
            transition: all 0.5s;
        }
        .iconBox{
            width: 4%;
            text-align: center;
            position: absolute;
            top: 140px;
            font-size: 28px;
            color: #8492a6;
            left: 48%;
        }
    }

    .optionPage {
        /*background: #eee;*/
        position: absolute;
        left: 0;
        right: 0;
        overflow: auto;
        top: 60px;
        bottom: 0;
    }

    .gray {
        background-color: #ECECEC;
    }

</style>

<template>
    <div v-loading="loading" :class="{rightBody:!isOptionPage,optionPage:isOptionPage,gray:isGray,shrink:shrink}">
        <component :is="getType" :data="getData" :param="getData"></component>
        <link-box></link-box>
    </div>
</template>

<script type="es6">
    import menu from '../data/menu'
	import moduleRenderVue from '../components/table/renderVue.vue';
    import linkBox from '../components/linkBox/render.vue'

    module.exports = {
        data(){
            return {
                moduleData: '',
				moduleVersion: 'old',
            }
        },
        computed: {
            shrink(){
                return this.$store.state.shrink
            },
            isGray(){
                //部分页面的背景色需要设置成灰色
                return this.$route.params.key === 'devconfig_view';
            },
            isOptionPage(){
                return this.resKey === 'index'
            },
            resKey(){
                return this.$route.params.key
            },
            id(){
                return this.$route.params.id
            },
            code(){
                return this.$store.state.authorityKey
            },
            getType(){
                let menuObj,comp=false;
                let path=this.isOptionPage?this.id:this.resKey;

                menuObj = this.$findAll(menu,{path});
                this.moduleData={};
                if(menuObj&&menuObj.length){
                    menuObj=menuObj[0];
                    if(menuObj.authorityCode){
                        if(this.code.indexOf(menuObj.authorityCode)>=0){
                            if(menuObj.data instanceof Array){
                                this.moduleData=menuObj.data.filter(val=>{
                                    return val.authorityCode?this.code.indexOf(val.authorityCode)>=0:true
                                })
                            }else{
                                this.moduleData=menuObj.data;
                            }
                            comp=menuObj.vue;
                        }
                    }else{
                        this.moduleData=menuObj.data;
                        comp=menuObj.vue;
                    }
                }

                return comp;
            },
            getData(){
                let type = this.getType;
                return this.moduleData;
            },
            loading(){
                return this.$store.state.loading
            }
        },
        components: {
            linkBox
        },
        methods: {
        },
    }
</script>
