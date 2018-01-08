import _ from 'underscore'
import timeDiff from '../vuePlugin/utils/timeDiff'
import date from '../vuePlugin/utils/toDate'

export default {
    async(columnVal, lineData,column){
        let obj=column.filterAsync;
        try {
            return obj&&obj.format(columnVal, lineData,obj.option);
        } catch(e) {
            console.log(e);
            return columnVal
        }
    },
    custom(columnVal, lineData,column){
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
    timeDiff,
    date
}