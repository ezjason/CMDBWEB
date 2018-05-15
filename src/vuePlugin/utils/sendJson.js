import axios from 'axios'
import _ from 'underscore'
import cacheConfig from '../../config/cacheConfig'

let cache={};//缓存响应数据
let fn={};//记录请求的回调函数
let option=cacheConfig;//获取缓存接口配置
let service = axios.create({
    // baseURL: '',
    timeout: 0,
    headers: {'Content-Type': 'application/json'}
});
service.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error)
    }
)

function getCheckToken(timeDiff){
    let newTime=+new Date();
    let rendom=_.random(0,10000);
    return `${newTime-timeDiff}_${rendom}`
}

export default function (url, data, success,error,method) {
    let loginKey=this.$store.state.loginKey||{};

    let path=encodeURIComponent(this.$store.state.pathText);
    let accessToken=this.$encrypt(getCheckToken(this.$store.state.timeDiff));
    if(cache[url]){
        success(cache[url])
    }else{
        let run=true;
        if(option[url]){
            if(!fn[url]){
                fn[url]=[]
            }else{
                fn[url].push(success);
                run=false;
            }
        }
        run&&service({
            url,
            method:method||'POST',
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json','snc-token':loginKey['snc-token'],path,accessToken},
        }).then((response)=> {
            if(option[url]){
                cache[url]=response.data;
            }
            if(fn[url]){
                fn[url].forEach(fn=>fn(cache[url]));
                delete fn[url]
            }
            let data=response.data;
            switch (data.msgCode){
                case 400:
                case 405:
                    this.$message.error(data.message||'系统繁忙');
                    break;
                case 401:
                case 402:
                    this.$router.push('/');
                    return;
                case 403:
                    this.$message.error('当前用户权限不足');
                    break;
                case 406:
                    this.$router.push({name:'authorize'});
                    break;
                case 500:
                case 501:
                    this.$message.error(data.message||'接口异常');
                    break
            }
            if(!this._isDestroyed){
                success(data)
            }
        }).catch((err)=>{
            if(error){
                error(err)
            }
        })
    }

}