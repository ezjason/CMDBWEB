let listenVue;
let bind=false;
let action=async ()=>{
    let result=true;
    if(listenVue){
        if(listenVue.vm._isDestroyed){
            listenVue=undefined;
        } else if(listenVue.fn instanceof Function){
            result=await listenVue.fn();
            if(result){
                listenVue=undefined;
            }
        }
    }
    return result
};
let bindRouterEach=function () {
    this.$router.beforeEach((to, from, next) => {
        action().then(val=>{
            val?next():next(false)
        })
    });
    bind=true;
};

let handle=async function(fn){
    let result=true;
    if(!bind){
        bindRouterEach.call(this)
    }
    if(fn instanceof Function){
        this.$nextTick(()=>{
            listenVue={
                vm:this,
                fn,
            }
        })
    }else{
        result=await action()
    }
    return result
};

export default handle;