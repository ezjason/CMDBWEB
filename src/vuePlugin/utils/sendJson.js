import $ from 'jquery'
import axios from 'axios'
import { Message } from 'element-ui'

var service = axios.create({
    // baseURL: '',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});
service.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
        });
        return Promise.reject(error)
    }
)


export default function (url, data, success) {
    let loginKey=this.$store.state.loginKey||{};
    let path=encodeURIComponent(this.$store.state.pathText);
    service({
        url,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {'Content-Type': 'application/json','snc-token':loginKey['snc-token'],path}
    }).then(function (response) {
        let data=response.data;
        switch (data.msgCode){
            case 400:
            case 405:
                this.$message.error(data.message||'系统繁忙');
                break;
            case 401:
            case 402:
                this.$router.push('/');
                // location.reload();
                return;
            case 403:
                this.$message.error('当前用户权限不足');
                break;
            case 500:
            case 501:
                this.$message.error(data.message||'接口异常');
                break
        }
        success(data)
    }).catch(function (error) {
        console.log(error);
    })
}