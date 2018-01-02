<style lang="less" scoped>
    .el-input,.el-select {
        width: 120px;
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
                             v-for="item in option"
                             :label="item.label">
                <el-option v-for="i in item.children" :value="i.value" :label="i.label"></el-option>
            </el-option-group>
            <el-option v-if="!groupKey" v-for="i in option" :value="i.value" :label="i.label"></el-option>
        </el-select>

        <el-date-picker v-else-if="toType==='datatime'" size="small"
                        v-model.async="value" type="datetime" :placeholder="placeholder||'选择日期时间'"
                        :picker-options="pickerOptions">
        </el-date-picker>

        <el-input :placeholder="placeholder" v-if="!toType"
                  size="small" v-model="value"></el-input>
    </div>
</template>

<script>
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
            type:String,//DateTime、select、
            option:Array,//[{label,value}]
        },
        data(){
            return {
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
            value(){
                this.$emit('change',this.value);
            },
        },
        computed:{
            toType(){
                return this.type&&this.type.toLocaleLowerCase()
            },
        },
        methods:{
            async lookupTypeChange(val) {
                if (this.remote && !(this.option && this.option.length)) {
                    let data = await this.$fetch('post', this.remote, this.data ||{"params":{"pagination":{"pagenum":1,"pagesize":"999"}}});
                    let list = data.data.records || data.data;
                    let label = this.replaceLabel || 'label';
                    let value = this.replaceValue || 'value';
                    let groupKey = this.groupKey;
                    list.map( obj => {
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
                                    label:obj.labelTypeName,
                                    children:[]
                                };
                            }
                            optionsObj[obj[groupKey]].children.push(obj);
                        }
                        //再转换
                        this.option=Object.values(optionsObj);
                    }else{
                        this.option=list;
                    }
                }
            },
        },
        created(){
            this.lookupTypeChange();
        },
        updated(){
            this.lookupTypeChange();
        },
    }
</script>