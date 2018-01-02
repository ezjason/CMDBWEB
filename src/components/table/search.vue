<style lang="less" scoped>
.searchForm {
    padding-top: 15px;
    position: relative;
    .el-form-item {
        /*margin-bottom: 5px;*/
        margin-right: 10px;
        &:last-child {
            margin-right: 0;
        }
        &.searchBtn{
            margin-top: 22px;
            margin-right: 0;
            &+.searchBtn{
                margin-right: 0;
                margin-left: 5px;
            }
        }
    }
    .el-input,.el-select {
        width: 120px;
    }
    .fix{
        vertical-align: bottom;
    }
    &:after {
        content: ' ';
        clear: both;
        display: block;
    }
    .top {
        display: inline-block;
        width: 100%;
        &:after {
            content: ' ';
            clear: both;
            display: block;
        }
        .topSearch {
            /*position: absolute;
                right: 0;
                top:0;*/
            float: right;
            margin-top: -5px;
        }
        .reset {
            margin: 0;
        }
    }
    .bottom {
        float: right;
        display: inline-block;
    }
}

.label {
    float: left;
}

.btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    line-height: 32px !important;
    color: #000;
    font-size: 12px;
    background: #fff;
    /*cursor:initial;*/
    cursor: pointer;
    &:hover i {
        color: #1c8de0;
    }
    i {
        margin: 0 10px;

        &.disabled {
            color: #eee;
            cursor: initial;
        }
    }
}
</style>
<style lang="less">
    .searchItem{
        .el-form-item__label{
            text-align: right;
        }
    }
</style>


<template>
    <div class="searchForm" >
        <div class="top">
            <slot></slot>
            <el-form v-if="!hide" class="topSearch" :inline="true" label-position="left" label-width="60px" size="mini">
                <template v-if="ishigh">
                    <el-form-item class="fix" @keyup.enter.native="onSearch" v-for="search in typeList" :label="search.name">
                        <search-item v-model="form[search.colkey]"
                                     :groupKey="search.lookup&&search.lookup.groupKey"
                                     :remote="search.lookup&&search.lookup.remote"
                                     :placeholder="search.name"
                                     :data="search.lookup&&search.lookup.data"
                                     :props="search.lookup&&search.lookup.props"
                                     :replaceLabel="search.lookup&&search.lookup.replaceLabel"
                                     :replaceValue="search.lookup&&search.lookup.replaceValue"
                                     :type="search.lookup&&search.lookup.type"
                                     :option="search.lookup&&search.lookup.option">
                        </search-item>
                    </el-form-item>
                </template>

                <template v-else>
                    <el-form-item>
                        <el-select class="typeSelect" v-model="checkType" value-key="colkey" size="small" placeholder="请选择">
                            <el-option v-for="item in typeList" :label="item.name" :value="item">
                                <span class="label">{{ item.name }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="fix" @keyup.enter.native="onSearch">
                        <search-item v-model="checkValue"
                                     :groupKey="checkTypeLookup.groupKey"
                                     :remote="checkTypeLookup.remote"
                                     :placeholder="checkType&&checkType.name"
                                     :data="checkTypeLookup.data"
                                     :props="checkTypeLookup.props"
                                     :replaceLabel="checkTypeLookup.replaceLabel"
                                     :replaceValue="checkTypeLookup.replaceValue"
                                     :type="checkTypeLookup.type"
                                     :option="checkTypeLookup.option">
                        </search-item>
                    </el-form-item>
                </template>
                <el-form-item>
                    <!--此处el-button元素头尾相连不格式化是为了解决换行符会在浏览器渲染成一个空格的问题-->
                    <el-button type="text" size="small" @click="ishigh=!ishigh">{{ishigh?'高级':'普通'}}</el-button>
                    <el-button size="small"
                               type="primary"
                               icon="search"
                               @click="onSearch">搜索</el-button><el-button
                        class="reset"
                        type="primary"
                        v-show="list&&list.length"
                        size="small"
                        @click="reset">重置</el-button><el-button
                        size="small"
                        v-for="(btn,index) in btns"
                        v-if="index<4"
                        :type="btn.style||'primary'"
                        @click="btnClick(btn)">{{btn.text}}</el-button>
                </el-form-item>
                <el-form-item class="searchBtn" v-if="btns.length>4" >
                    <el-dropdown @command="btnClick">
                        <el-button size="small" type="primary">
                            更多
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(btn,index) in btns" v-if="index>=4" :command="btn">{{btn.text}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

import _ from 'underscore'
import searchItem from './searchItem.vue'

export default {
    props: ['clumns','hide', 'btns','dataNumber'],
    components:{
        searchItem,
    },
    data() {
        return {
            checkType: '',
            checkValue: '',
            ishigh: false,
            list: [],
            form: {},
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
    watch: {
        clumns() {
            if(this.dataNumber<=1){
                this.init();
            }
        },
    },
    computed: {
        checkTypeLookup(){
            return this.checkType&&this.checkType.lookup||{}
        },
        typeList() {
            return this.clumns.filter(val => {
                return !val.noSearch
            })
        },
        searchList() {
            return [this.checkType].concat(this.list)
        },
        noList() {
            return this.typeList.filter(val => {
                return this.colKeyList.indexOf(val.colkey) === -1
            })
        },
        colKeyList(){
            return this.list.map(val=>val.colkey)
        },
    },
    methods: {
        searchChange(){
            return this.typeList.map(val=>{
                this.toggleList(val)
            })
        },
        checkKey(key) {
            if (!(key in this.form)) {
                this.$set(this.form, key, '');
            }
        },
        disabled(item) {
            return this.colKeyList.indexOf(item.colkey) + 1
        },
        toggleList(item) {
            let index = this.disabled(item);
            if (!index) {
                /*if (this.noList.length === 1) {
                    this.$message.error('必须保留一个字段')
                } else {
                    this.checkKey(item.colkey);
                    if (this.checkType.colkey === item.colkey) {
                        this.$nextTick(() => {
                            this.checkType = this.noList[0];
                        })
                    }
                    this.list.push(item);
                    this.lookupTypeChange(item);
                }*/
                this.checkKey(item.colkey);
                if (this.checkType.colkey === item.colkey) {
                    this.$nextTick(() => {
                        this.checkType = this.noList[0];
                    })
                }
                this.list.push(item);
                this.lookupTypeChange(item);
            } else {
                this.$delete(this.form, item.colkey);
                this.list.splice(index - 1, 1);
            }
        },
        onSearch() {
            let data = JSON.parse(JSON.stringify(this.form));
            data[this.checkType.colkey] = this.checkValue;
            for (let i in data) {
                if (/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,3})Z$/.test(data[i])) {
                    data[i] = +new Date()
                }
                if(!data[i] && data[i]!==0&&data[i]!==false){
                    delete data[i]
                }
            }
            this.$emit('search', data)
        },
        async lookupTypeChange(val) {
            this.checkKey(val.colkey);
            let lookup = (val || this.checkType).lookup;
            if (lookup && lookup.remote && !(lookup.option && lookup.option.length)) {
                let data = await this.$fetch('post', lookup.remote, lookup.data ||{"params":{"pagination":{"pagenum":1,"pagesize":"999"}}});
                let list = data.data.records || data.data;
                let label = lookup.replaceLabel || 'label';
                let value = lookup.replaceValue || 'value';
                let groupKey = lookup.groupKey;
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
                    lookup.option=Object.values(optionsObj);
                }else{
                    lookup.option=list;
                }
            }

            this.checkValue = '';
        },
        btnClick(btn) {
            this.$emit('btnClick', btn)
        },
        reset() {
            for (let i in this.form) {
                this.$set(this.form, i, '')
            }
            this.checkValue='';//清空搜索框
        },
        init() {
            this.checkType = this.typeList[0];
            this.checkValue = '';
            this.list = [];
            this.form = {};
        }
    },
    created() {
        this.init();
    },
}
</script>