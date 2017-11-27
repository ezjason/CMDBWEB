import _ from 'underscore'

export default function (list, parentKey, key,labelKey,valueKey) {
    key = key || 'id';
    function findChild(list, where) {
        let child = _.where(list, where);
        if (child.length) {
            child = _.map(child, function (val) {
                let id = val[key];
                val.label=val[labelKey];
                val.value=val[valueKey];
                let children=findChild(list, {[parentKey]: id});
                if(children&&children.length){
                    val.children = children;
                }
                return val;
            })
        }
        return child
    }

    if (!parentKey || !(list && list.length)) {
        return list
    }
    _.map(list, function (val) {
        val[parentKey] = val[parentKey] >= 0 ? Number(val[parentKey]) : val[parentKey];
        val[key] = val[key] >= 0 ? Number(val[key]) : val[key];
    })
    let rootmenu = _.filter(list, function (val) {
        let find = _.where(list, {[key]: val[parentKey]});
        return !find.length
    });
    if (!rootmenu || !rootmenu.length) {
        return list
    }
    let newData = _.map(JSON.parse(JSON.stringify(rootmenu)), function (val) {
        let id = val[key];
        val.label=val[labelKey];
        val.value=val[valueKey];
        let children=findChild(list, {[parentKey]: id});
        if(children&&children.length){
            val.children = children;
        }
        return val;
    });
    return newData;
};