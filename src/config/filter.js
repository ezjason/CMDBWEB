import _ from 'underscore'
import timeDiff from '../vuePlugin/utils/timeDiff'
import date from '../vuePlugin/utils/toDate'

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
    timeDiff,
    date
}