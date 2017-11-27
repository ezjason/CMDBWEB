import _ from 'underscore'
import format from '../vuePlugin/utils/format'

export default {
    custom: function(columnVal, lineData,column){
        try {
            if(column.filterCustom){
                switch (typeof column.filterCustom){
                    case 'function':
                        return column.filterCustom(columnVal,lineData);
                    case 'string':
                        return _.template(column.filterCustom)(_.extend({},{obj:lineData, val:columnVal}))
                }
            }
        } catch(e) {
            console.log(e);
            return columnVal
        }
    },
    date(val,line,column){
        if(!val){
            return ''
        }
        let time=val;
        let digit=val.toString().length;
        const timeLength=13;
        if(digit>timeLength){
            time=+new Date(val)
        }else{
            time=val*Math.pow(10,timeLength-digit)
        }
        return time?(format('yyyy/MM/dd hh:mm:ss',parseInt(time))):''
    },
    timeDiff(start,end){
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
}