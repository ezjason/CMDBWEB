import _ from 'underscore'

function findAll(data, where, attr) {
    attr = attr || 'children';
    let arr = [];
    switch (typeof data) {
        case 'object':
            arr = arr.concat(_.where(data, where));
            _.each(data, function (val) {
                let redata = val[attr] && val[attr].length && findAll(val[attr], where);
                redata && redata.length && (arr = arr.concat(redata));
            });
            break;
        default:
            break;
    }
    return arr
}

export default findAll