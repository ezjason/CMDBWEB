export default function recursion(arr,childKey,fn){
    let result=[];
    if(Array.isArray(arr)&&arr.length){
        arr.forEach((val,index)=>{
            let v=fn(val);
            if(v){
                result.push(fn(val));
                if(Array.isArray(val[childKey])&&val[childKey].length){
                    result[index][childKey]=recursion(val[childKey],childKey,fn)
                }
            }
        });
    }
    return result
}