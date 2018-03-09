let listenVue=[];
window.onresize=()=>{
    for(let i=0,
            flag=true,
            len=listenVue.length;
        i<len;
        flag ? i++ : i
    ){
        if(listenVue[i].vm._isDestroyed){
            listenVue.splice(i,1);
            flag = false;
        } else {
            listenVue[i].fn&&listenVue[i].fn();
            flag = true;
        }
    }
};

export let on =function (fn) {
    let check=listenVue.some(val=>val.vm===this);
    if(!check){
        check.push({
            vm:this,
            fn
        });
    }
};
export let off =function (fn) {
    return listenVue.some((val,index)=>{
        if(val.vm===this){
            listenVue.splice(index,1);
            return true
        }
    });
};