
export default function get(getFn,defultValue){
    let result;
    if(getFn instanceof Function){
        try{
            result=getFn()
        }
        catch(e){}
    }
    if(result === undefined){
        result=defultValue;
    }
    return result
}