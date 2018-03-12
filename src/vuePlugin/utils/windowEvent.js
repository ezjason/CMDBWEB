let listenVue=[];
let eventAction=(type)=>{
    for(let i=0,
            flag=true,
            len=listenVue.length;
        i<len;
        flag ? i++ : i
    ){
        if(listenVue[i].type!==type){
            continue;
        }
        if(listenVue[i].vm._isDestroyed){
            listenVue.splice(i,1);
            flag = false;
        } else {
            listenVue[i].fn&&listenVue[i].fn();
            flag = true;
        }
    }
};
window.addEventListener("resize", function(){
    eventAction('onresize')
});
window.addEventListener("onclick", function(){
    eventAction('onclick')
});


export let on =function (type,fn) {
    let check=listenVue.some(val=>{
        return val.vm===this&&val.type===type
    });
    if(!check){
        listenVue.push({
            vm:this,
            type:type,
            fn
        });
    }
};
export let off =function (type,fn) {
    return listenVue.some((val,index)=>{
        if(val.vm===this&&val.type===type){
            listenVue.splice(index,1);
            return type
        }
    });
};