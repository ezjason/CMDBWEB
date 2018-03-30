<style lang="less" scoped>
    .authorization{
        font-size: 12px;
        color: #333333;
        >div{
            width: 490px;
            margin: 20px auto;
            /*border: 1px solid #797979;*/
            border-radius: 10px;
            padding:0 30px;
            background:#F7F8FA;
        }
        .description{
            padding:10px;
            margin-top: 10px;
            background: #eff0f4;
        }
        .upload-demo{
            display: inline-block;
            vertical-align: middle;
        }
        .upload{
            padding-left: 0!important;
            padding-right: 0!important;
            margin:10px 0 0 0 ;
            span{
                padding:0 5px;
                width: 100%;
                display: inline-block;
                overflow-x: scroll;
                white-space: nowrap;
                font-size: 12px;
                background: #fff;
                color: #CCCCCC;
                border:1px solid #DEDFE3;
                border-radius: 3px;
            }
            span::-webkit-scrollbar{
                width:0;
                height: 0;
            }
            p{
                margin: 0;
                padding-top: 11px;
                font-size: 12px;
                line-height: 1;
                height: 21px;
            }
            p:last-child{
                margin-bottom: 10px;
            }
        }
        .item{
            display: inline-block;
            text-align: right;
            color: #323234;
            font-weight: 700;
            padding:5px 10px 5px 10px;
            /*background:#f2f2f2;*/
            border-left:2px solid #93D2F3;
        }
        .el-row{
            margin-left: 0px!important;
            margin-right: 0px!important;
        }
        .topic{
            height: 30px;
            line-height: 30px;
        }
        input{
            width:100%;
            inline:none;
            border:1px solid #DEDFE3;
            border-radius: 3px;
            color: #ccc;
            padding:5px;
            outline: none;
        }
        .authorize{
            text-align: right;
        }
        .logo{
            padding:10px;
            background: #fff;
            margin-bottom: 10px;
        }
        .valid,.invalid{
            .iconfont{
                font-size: 40px;
            }
        }
        .label{
            margin: 0 5px;
            display: inline-block;
            width:auto!important;
            border: none!important;
        }
        .valid{
            color:#38b5f8;
        }
        .invalid{
            color:#b1b1b1;
        }
        .logoText{
            display: inline-block;
        }
    }
</style>
<style lang="less">
    .authorization{
        .upload{
            .el-form-item{
                margin-bottom: 0px;
            }
            .el-button--small{
                padding:7px 40px;
            }
        }
    }
</style>
<template>
    <div class="authorization">
        <div>
            <el-form
                    :model="ruleForm"
                    class="ruleFormWidth"
            >
                <el-row>
                    <el-col :span="20" class="upload">
                        <div class="item">
                            软件授权
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24" class="description">
                        说明：本软件由上海新炬网络技术有限公司拥有完全知识产权，通过载入新炬Licence授权文件即可获得授权。如需延期试用或更多商务咨询请联系本公司售前支持，谢谢！
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20" class="upload">
                        <el-form :label-position="labelPosition" label-width="80px" >
                            <el-form-item label="授权状态:" size="large">
                                <span>{{ status[form.authorizeStatus] }}</span>
                            </el-form-item>
                            <el-form-item label="硬件序列号:" size="large">
                                <span v-html="serial(form.serials,'serial')"></span>
                            </el-form-item>
                            <el-form-item label="授权机器:" size="large">
                                <p v-if="form.serials.length" v-for="val in form.serials">
                                    {{val.ipAddr}}
                                </p>
                                <p v-else>&nbsp;</p>
                            </el-form-item>
                            <el-form-item label="License:" size="large">
                                <input type="text" v-model="form.license" >
                                <!--<span>{{form.license || '&nbsp;'}}</span>-->
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="20" class="upload authorize">
                        <el-button size="small" type="primary" :disabled="form.license && form.license.length == 0" @click="activate">授权</el-button>
                    </el-col>
                    <el-col :span="20" class="upload">
                        <div class="item">
                            使用期限
                        </div>
                    </el-col>
                    <el-col :span="20" class="upload">
                        <el-form :label-position="labelPosition" label-width="80px" >
                            <el-form-item label="开始日期:" size="large">
                                <span>{{ form.startDate ? $format('yyyyMMdd',form.startDate) : '&nbsp;' }}</span>
                            </el-form-item>
                            <el-form-item label="过期日期:" size="large">
                                <span>{{ form.expiredDate ? $format('yyyyMMdd',form.expiredDate) : '&nbsp;' }}</span>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="20" class="upload">
                        <div class="item">
                            系统情况
                        </div>
                    </el-col>
                    <el-col :span="20" class="upload">
                        <el-form :label-position="labelPosition" label-width="80px" >
                            <el-form-item label="权限许可数:" size="large">
                                <span>{{form.maxNum || '&nbsp;'}}</span>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="20" class="upload">
                        <div class="item">
                            产品购买情况
                        </div>
                    </el-col>
                    <el-col :span="20" class="upload">
                        <div class="logo">
                            <div class="label valid" v-if="form.modules && form.modules.indexOf('AMP') > -1 && form.authorizeStatus == 200">
                                <i class="iconfont icon-jiankongmokuai"></i>
                                <div class="logoText">
                                    <div>
                                        监控
                                    </div>
                                    <div>
                                        模块
                                    </div>
                                </div>
                            </div>
                            <div class="label invalid" v-if="form.modules && form.modules.indexOf('AMP') > -1 && form.authorizeStatus != 200">
                                <i class="iconfont icon-jiankongmokuai"></i>
                                <div class="logoText">
                                    <div>
                                        监控
                                    </div>
                                    <div>
                                        模块
                                    </div>
                                </div>
                            </div>
                            <div class="label valid" v-if="form.modules && form.modules.indexOf('ATM') > -1 && form.authorizeStatus == 200">
                                <i class="iconfont icon-yunweimokuai"></i>
                                <div class="logoText">
                                    <div>
                                        运维
                                    </div>
                                    <div>
                                        模块
                                    </div>
                                </div>
                            </div>
                            <div class="label invalid" v-if="form.modules && form.modules.indexOf('ATM') > -1 && form.authorizeStatus != 200">
                                <i class="iconfont icon-yunweimokuai"></i>
                                <div class="logoText">
                                    <div>
                                        运维
                                    </div>
                                    <div>
                                        模块
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                status:{
                    100:'未授权',
                    200:'使用中',
                    300:'已过期'
                },
                labelPosition: 'right',
                form: {

                },
            };
        },
        methods:{
            async getData() {
                let {msgCode, data} = await this.$fetch('POST', '/license-center/license/getObject', {"params": {}})
                if (msgCode == 200) {
                    if (data.authorizeStatus != 200 && !this.isAuthorization) {
                        //不是authorize路径则跳转
                        this.$router.push({name:'authorize'});
                    } else if (data.authorizeStatus == 200 && this.isAuthorization){
                        setTimeout((val)=>{
                            this.$router.push('login');
                        },3000)
                    }
                    this.form = data;
                }
            },
            //激活
            async activate(){
                let {msgCode, data} = await this.$fetch('POST', '/license-center/license/activate', {"params": {activeCode: this.form.license}});
                if (msgCode == 200) {
                    if (this.isAuthorization && data.result) {
                        //authorize路径
                        await this.getData();
                        this.$message.success('激活成功');
                    }
                }
            },
            serial(serials,field){
                var str = '';
                if( Object.prototype.toString.call(serials) == "[object Array]" ){
                    serials.forEach((val)=>{
                        str += `${val[field]} `;
                    })
                }
                return str || '&nbsp;'
            },
        },
        computed:{
            isAuthorization(){
                return this.$route.path == '/authorize'
            }
        },
        created(){
            this.getData();
        }
    }
</script>