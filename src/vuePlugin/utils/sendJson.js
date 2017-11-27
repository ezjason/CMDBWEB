import $ from 'jquery'
import storage from './storage'

export default function (url, data, success) {
    let loginKey=storage.get('loginKey')||{};
    let path=encodeURIComponent(this.$store.state.pathText);
    $.ajax({
        url,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {'Content-Type': 'application/json','snc-token':loginKey['snc-token'],path},
        success:(data)=>{
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
        },
    })
}