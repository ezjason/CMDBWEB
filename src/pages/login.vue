<style lang="less" scoped>
    @import "../static/less/login.less";
    .validCode{
        .el-input{
            width: 30%;
            min-width: 100px;
        }
        img{
            cursor: pointer;
        }
        .el-checkbox{
            float: right;
        }
    }
</style>

<style>
    #login .el-input-group__prepend {
        border-left: none;
        border-top: none;
        border-right: none;
        border-radius: 0;
        background-color: transparent;
        font-size: 16px;
        color: #e0e0e0;
        padding-left: 0;
    }
    #login .el-input__inner {
        border-left: none;
        border-top: none;
        border-right: none;
        border-radius: 0;
        padding: 3px 0;
    }
    #login .el-input__inner:hover, #login .el-input__inner:focus {
        border-color: #dcdcdc;
    }
    #login .el-form-item__error{
        margin-left: 22px;
    }
    .el-input .el-input__inner{
        width:100%;
        height:42px;
        margin-top: 25px;
        padding:0 15px !important;
        border-radius: 6px !important;
        background:rgba(45,45,45,.15);
        box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset;
        font-size:14px;
        color:#fff !important;
        text-shadow:0 1px 2px rgba(0,0,0,.1);
        -webkit-transition:all .2s;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>

<template>
    <div id="login">
        <!--<div class="col-md-12 blockBanner">
            <div class="col-md-4 col-md-offset-4">
                <div class="logo"></div>
                <div class="logoTitle">
                    自动化运维管理平台
                </div>
            </div>
            <div class="el-1"></div>
            <div class="el-2"></div>
            <div class="el-3"></div>
            <div class="el-4"></div>
        </div>-->
        <el-col :offset="9" :span="6">
            <el-form ref="form" :model="form">
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item><h1 style="color: #ffffff;text-align: center">Login</h1></el-form-item>
                <el-form-item></el-form-item>
                <el-form-item prop="account"
                              :rules="rules.name">
                    <el-input placeholder="请输入账号" v-model="form.account">
                        <!--<template slot="prepend"><i class="fa fa-user"></i></template>-->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password"
                              :rules="rules.pwd">
                    <el-input  type="password" :maxlength="64" placeholder="请输入密码"  auto-complete="off" v-model="form.password">
                        <!--<template slot="prepend"><i class="fa fa-lock"></i></template>-->
                    </el-input>
                </el-form-item>

               <!-- <el-form-item class="validCode"
                              prop="code"
                              :rules="rules.code">
                    <template v-if="api.loginValidateCode">
                        <el-input v-model="form.code" :maxlength="4" placeholder="请输入验证码">
                            <template slot="prepend"><i class="fa fa-check-circle"></i></template>
                        </el-input>
                        <img @click="getValidateCode" :src="Validate.code" alt="验证码" title="验证码"/>
                    </template>
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                </el-form-item>-->
                <el-form-item>
                    <el-button class="login" type="primary" @click="login" :loading="loading" onclick="return false" native-type="submit">登录</el-button>
                </el-form-item>
                <div class="forget">
                    <span>版本 {{version}}</span>
                </div>
            </el-form>
        </el-col>
        <div class ="backImg">
            <transition name="slide-fade">
                <ul id="supersized" v-if="show">
                    <li class="slide0">
                        <img src="../static/img/1.jpg">
                    </li>
                    <li class="slide1">
                        <img src="../static/img/2.jpg">
                    </li>
                    <li class="slide2">
                        <img src="../static/img/3.jpg">
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>
    import api from '../config/api'

    module.exports = {
        data:function () {
            return {
                api,
                form:{
                    account:'',
                    password:'',
                    code:'',
                },
                show:true,
                checked:false,
                loading:false,
                Validate:{
                    code:'',
                    key:'',
                },
                rules:{
                    name:[
                        { required: true, message: '用户名不能为空'},
                        { min: 5, max: 13, message: '用户名只能为5-13个字符'},
                    ],
                    pwd:[
                        { required: true, message: '密码不能为空'},
                        { min: 5, max: 64, message: '密码长度只能为5-64个字符'},
                    ],
                },
            }
        },
        computed:{
            version(){
                return window.timerVersion
            },
            code(){
                return this.$store.state.authorityKey
            }
        },
        methods:{
            async login(){
                let self=this;
                let valid=await new Promise(resolve=>{
                    self.$refs.form.validate(v=>resolve(v))
                });
                if(!valid){return}
                self.loading=true;
                let params={
                    account:self.form.account,
                    password:self.$encrypt(self.form.password)
                };
                if(self.api.loginValidateCode){
                    params.codeKey=self.Validate.key;
                    params.code=self.form.code;
                }
                let duration=1000;
                let data=await this.$fetch('POST', this.api.lgoinActionUrl || '/user/passport/login',{params},'');
                if(data&&data.msgCode=='200'){
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                        duration,
                        showClose:true,
                    });
                    this.$storage.set('userInfo',data.data.userInfo);
                    if(this.checked){
                        this.$storage.set('login',{
                            account:self.form.account,
                            password:self.form.password,
                        });
                    }
                    let loginKey={
                        'snc-token':data.data.certification.token,
                        'account':self.form.account,
                    }
                    this.$store.commit('setLoginKey',{data:loginKey});
                    this.$router.push('/home/');
                }else{
                    this.$store.commit('setLoginKey',{data:null});
                    this.$storage.set('login',null);
                    this.$storage.set('userInfo',null);
                    this.validInit();
                }
                this.loading=false;
            },
            async getValidateCode(){
                let data=await this.$fetch('POST',this.api.loginValidateCode);
                if(data.msgCode===200){
                    this.Validate=data.data;
                }
            },
            validInit(){
                if(this.api.loginValidateCode){
                    this.getValidateCode();
                    if(!this.rules.code){
                        this.rules.code=[
                            { required: true, message: '验证码不能为空'},
                            { min: 4, max: 4, message: '验证码长度只能为4个字符'},
                        ];
                    }
                }
            },
            async getTime(){
                let systemTime=await this.$fetch('POST','/user/common/system/time');
                if( systemTime.msgCode == 200 ){
                    let endTime=+new Date();
                    this.$store.commit('setTimeDiff',endTime-systemTime.data.result);
                }
            },
        },
        mounted(){
//            this.getTime();
            this.validInit();
            let loginInfo=this.$storage.get('login');//获取localstorage
            if(loginInfo){
                this.form=loginInfo;
                this.checked=true;
            }
        }
    }
</script>
