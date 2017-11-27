import _ from 'underscore'

export default function (data) {
    let result={};
    if(typeof data=='object'){
        _.each(data,(v,k)=>{
            if(k.indexOf('.')===-1){
                result[k]=v;
            }else{
                let keys=k.split('.');
                let relay=result;
                _.map(keys,function(v1,k1){
                    if(keys.length-1===k1){
                        relay[v1]=v;
                    }else{
                        relay=relay[v1]||(relay[v1]={});
                    }
                });
            }
        })
    }
    return result
}