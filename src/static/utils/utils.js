/**
 * 这里用于存放常用的公共方法
 */

/**
 * 在tree结构数据中，通过你要选中的id，返回这个id在这个tree中的路径
 * 
 * @param {Array} data 树结构的data
 * @param {String} value 树结构中你要选择的ID值
 * @param {String} id 你要选中的ID值得key
 * @param {Array} children 树结构中的children
 * @returns {Array} 返回你要选择的ID值在整个树中的路径
 */
const findCascader = function (data, value, id, children) {
    children = children || 'children'
    id = id || 'id'
    
    for (let option of data) {
        let relay = [option[id]];
        if (option[id] == value) {
            return relay
        } else if (option[children] instanceof Array) {
            let have = findCascader(option[children], value, id, children);
            if (have) {
                return relay.concat(have)
            }
        } else {
            continue
        }
    }
};

/**
 * 在tree结构数据中，通过你传入的id，返回这个id在这个tree中的数据
 * 
 * @param {Array} data 树结构的data
 * @param {String} value 树结构中你要查询的ID值
 * @param {String} id 你要选中的ID值得key
 * @param {Array} children 树结构中的children
 * @returns {Array} 返回你传入的ID值相关的数据
 */
let findCascaderList = null;
const findCascaderData = function (data, value, id, children) {
    children = children || 'children'
    id = id || 'id'
    
    for (var i = 0; i < data.length; i++) {
        var option = data[i];
        if (option[id] == value){
            findCascaderList = option;
        }
   
        if (option[children] && option[children].length > 0){
            findCascaderData(option[children], value, id, children)
        }
    }
    return findCascaderList;
};

export {
    findCascader,
    findCascaderData
}