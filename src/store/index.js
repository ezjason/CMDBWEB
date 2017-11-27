const strict=true;
const state = {
    authorityKey:[],
    appendPath:[],
    pathText:'',
    reset:{
        rightBody:1
    },
    linkBoxs:{},
    shrink:false,
    loading:false,
};
const localStoragePlugin = store => {
    store.subscribe((mutation, { todos }) => {
        //state.data=todos;
    })
};

const mutations = {
    setAuthorityKey (state,{data}) {
        state.authorityKey = data
    },
    setAppendPath(state,{data}){
        state.appendPath = data
    },
    pushAppendPath(state,{data}){
        state.appendPath.push(data);
    },
    popAppendPath(state){
        state.appendPath.pop();
    },
    resetModule(state,{data}){
        data&&(state.reset[data]+=1)
    },
    toggleLoading(state,data){
        state.loading=data===undefined?!state.loading: data
    },
    setLinkBoxs(state,data){
        state.linkBoxs=data;
    },
    toggleShrink(state,data){
        state.shrink=!state.shrink
    },
    setPathText(state,data){
        state.pathText=data
    },
};

export default {
    state,
    mutations,
    //plugins: [localStoragePlugin],
    strict
}
