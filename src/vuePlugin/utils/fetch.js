export default async function (type, url = '', data = {}, method = 'fetch') {

    let result=null;
    try {
        result=await new Promise( resolve=>{
            this.$sendJson(url,data,d=>resolve(d),e=>resolve(e),type)
        });
    } catch (error) {
        console.log(error);
        // throw new Error(error)
    }

    // }
    if (typeof result !== 'object') {
        result = JSON.parse(result);
    }
    return result
};