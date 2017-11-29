export default function timeDiff(start,end){
    let diff=arguments.length>1?end-start:start;
    let h=Math.floor(diff/(60*60));
    let m=Math.floor(diff%(60*60)/60);
    let s=Math.ceil(diff%60);
    let str='';
    if(h>0){
        return h+'小时'+m+'分钟'+s+'秒'
    }else if(m>0){
        return m+'分钟'+s+'秒'
    }else{
        return s+'秒'
    }
}