export default async function (type = 'GET', url = '', data = {}, method = 'fetch') {

    let result=null;
    /*if (window.fetch&& method == 'fetch') {
     let token=storage.get('loginKey');
     let requestConfig = {
     credentials: 'include',
     method: type,
     headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'snc-token':token['snc-token']
     },
     mode: "cors",
     cache: "no-cache"
     };
     if (type == 'POST') {
     Object.defineProperty(requestConfig, 'body', {
     value: JSON.stringify(data)
     })
     }
     try {
     let response = await fetch(url, requestConfig);
     result= await response.json();
     } catch (error) {
     // throw new Error(error)
     }
     }else {*/
    try {
        result=await new Promise( resolve=>{
            this.$sendJson(url,data,d=>resolve(d),e=>resolve(e))
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