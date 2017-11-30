<style lang="less" scoped>
    @import "../static/less/login.less";
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
</style>

<template>
    <div id="login">
        <div class="col-md-12 blockBanner">
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
        </div>
        <el-col :offset="9" :span="6">
            <el-form ref="form" :model="form">
                <el-form-item></el-form-item>
                <el-form-item prop="account"
                              :rules="rules.name">
                    <el-input placeholder="请输入账号" v-model="form.account">
                        <template slot="prepend"><i class="fa fa-user"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password"
                              :rules="rules.pwd">
                    <el-input  type="password" placeholder="请输入密码"  auto-complete="off" v-model="form.password">
                        <template slot="prepend"><i class="fa fa-lock"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item class="text-right remember-password">
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="login" type="primary" @click="login" :loading="loading" onclick="return false" native-type="submit">登录</el-button>
                </el-form-item>
                <div class="forget">
                    <span>版本 {{version}}</span>
                </div>
            </el-form>
        </el-col>
    </div>
</template>

<script>
    import packageConfig from '../../package.json'

    module.exports = {
        data:function () {
            return {
                form:{
                    account:'',
                    password:'',
                },
                checked:false,
                loading:false,
                rules:{
                    name:[
                        { required: true, message: '用户名不能为空'},
                        { min: 5, max: 13, message: '用户名只能为5-13个字符'},
                    ],
                    pwd:[
                        { required: true, message: '密码不能为空'},
                        { min: 5, max: 13, message: '密码长度只能为5-13个字符'},
                    ],
                },
                packageConfig
            }
        },
        computed:{
            version(){
                return window.timerVersion||packageConfig.version
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
                let param=self.form;
                let duration=1000;
                let showClose=true;
                let data=await this.$fetch('POST','/user/passport/login',{params:{...param,password:self.$encrypt(param.password)}},'');
                if(data&&data.msgCode=='200'){
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                        duration,
                        showClose,
                    });
                    this.$storage.set('userInfo',data.data.userInfo);
                    if(this.checked){
                        this.$storage.set('login',param);
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
                }
                this.loading=false;
            }
        },
        mounted(){
            let loginInfo=this.$storage.get('login');
            if(loginInfo){
                this.form=loginInfo;
                this.checked=true;
            }
        }
    }
</script>