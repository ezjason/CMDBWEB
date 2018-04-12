<style lang="less" scoped>
    .el-input,.el-select {
        width: 120px;
    }
</style>
<style lang="less">
    .treePopover{
        padding: 0;
        max-width: 200px;
        max-height: 300px;
        overflow: auto;
        .el-input{
            width: 100%;
            input{
                border: none;
            }
        }
    }
</style>

<template>
    <div class="searchItem">
        <el-select v-if="toType==='select'"
                   :placeholder="placeholder"
                   :clearable="true"
                   :filterable="props&&props.filterable"
                   v-model="value"
                   size="small">
            <el-option-group v-if="groupKey"
                             v-for="item in cacheOption"
                             :label="item.label">
                <el-option v-for="i in item.children" :value="i.value" :label="i.label"></el-option>
            </el-option-group>
            <el-option v-if="!groupKey" v-for="i in cacheOption" :value="i.value" :label="i.label"></el-option>
        </el-select>

        <el-date-picker v-else-if="toType==='datatime'" size="small"
                        v-model.async="value" type="datetime" :placeholder="placeholder||'选择日期时间'"
                        :picker-options="pickerOptions">
        </el-date-picker>

        <el-popover popper-class="treePopover" v-else-if="toType==='tree'">
            <el-input :placeholder="placeholder" readonly :value="treeText" slot="reference"></el-input>
            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>
            <el-tree
                    class="tree"
                    ref="tree"
                    :data="cacheOption"
                    show-checkbox
                    :filter-node-method="filterNode"
                    @check-change="treeCheckChange"
                    :default-checked-keys="value"
                    :node-key="treeKey">
            </el-tree>
        </el-popover>

        <el-input :placeholder="placeholder" v-if="!toType||toType==='input'" size="small" v-model="value"></el-input>
    </div>
</template>

<script>

    let cache={};

    export default {
        model: {
            prop: 'value',
            event: 'change'
        },
        props:{
            value:String,
            groupKey:String,
            remote:String,
            placeholder:String,
            data:Object,
            props:Object,//{filterable}
            replaceLabel:String,
            replaceValue:String,
            type:String,//DateTime|select|tree|input
            option:Array,//[{label,value}]
            treeKey:String,
            childrenKey:String,
        },
        data(){
            return {
                cache,
                filterText:'',
                treeText:[],
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        watch:{
            value(val){
                this.$emit('change',val);
            },
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        computed:{
            toType(){
                return this.type&&this.type.toLocaleLowerCase()
            },
            cacheKey(){
                return (this.remote+JSON.stringify(this.data)).toString(36)
            },
            cacheOption(){
                return this.cache[this.cacheKey]||this.option
            },
        },
        methods:{
            async lookupTypeChange(val) {
                if (this.remote && !(this.cacheOption&&this.cacheOption.length)) {
                    let data = await this.$fetch('post', this.remote, this.data ||{"params":{"pagination":{"pagenum":1,"pagesize":"999"}}});
                    let list = data.data.records || data.data;
                    let label = this.replaceLabel || 'label';
                    let value = this.replaceValue || 'value';
                    let groupKey = this.groupKey;
                    this.$recursion(list,this.childrenKey||'children',obj => {
                        obj.value = obj[value];
                        obj.label = obj[label];
                        obj.disabled = false;
                        return obj
                    });
                    if(groupKey){
                        let optionsObj = {};
                        for (let obj of list) {
                            if(!obj[groupKey]){
                                continue;
                            }
                            if (!optionsObj[obj[groupKey]]) {
                                optionsObj[obj[groupKey]] = {
                                    label:obj[groupKey],
                                    children:[]
                                };
                            }
                            optionsObj[obj[groupKey]].children.push(obj);
                        }
                        //再转换
                        this.$set(this.cache,this.cacheKey,Object.values(optionsObj));
                    }else{
                        this.$set(this.cache,this.cacheKey,list);
                    }
                }
            },
            treeCheckChange(node,check){
                if(!Array.isArray(this.value)){
                    this.value=[];
                }
                let index=this.value.indexOf(node[this.treeKey]);
                if(index>=0){
                    if(!check){
                        this.value.splice(index,1);
                        this.treeText.splice(index,1);
                    }
                }else{
                    if(check){
                        this.value.push(node[this.treeKey]);
                        this.treeText.push(node.label);
                    }
                }
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        },
        created(){
            this.lookupTypeChange();
        },
        updated(){
            this.lookupTypeChange();
        },
    }
</script>