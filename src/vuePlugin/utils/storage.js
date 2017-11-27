export default {
    get:function(val){
        let data=window.localStorage.getItem(val);
        let redata=null;
        try{
            redata=JSON.parse(data);
        }catch(e){
            redata=data;
        }
        return redata
    },
    set:function(key,val){
        let data= typeof val === 'object'?JSON.stringify(val):val;
        try {
            window.localStorage.setItem(key,data);
        }catch (e){
            if(confirm('性能趋势缓存数据超出本地存储限制，请清空后再试')){
                window.localStorage.clear();
            }
        }
    }
}