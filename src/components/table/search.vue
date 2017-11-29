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
    .fix{
        vertical-align: bottom;
    }
    .el-input,.el-select {
        width: 200px;
    }
    &:after {
        content: ' ';
        clear: both;
        display: block;
    }
    .top {
        display: inline-block;
        line-height: 60px;
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

<template>
    <div class="searchForm" >
        <div class="top">
            <slot></slot>
            <!--<el-form v-if="!hide" class="topSearch" :inline="true" :label-position="labelPosition" size="mini">
                &lt;!&ndash;<el-form-item>
                    <el-select class="typeSelect" v-model="checkType" value-key="colkey" size="small" placeholder="请选择" @change="lookupTypeChange">
                        <el-option v-for="item in typeList" :label="item.name" :value="item" :disabled="!!disabled(item)">
                            <span class="label">{{ item.name }}</span>
                            <span class="btn" @click.stop="toggleList(item)">
                                <i :class="{'el-icon-minus':disabled(item),'el-icon-plus':!disabled(item)}"></i>
                            </span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="fix" v-for="search in [checkType||{}]">
                    <div @keyup.enter="onSearch">

                        <el-select v-if="search.lookup&&search.lookup.type.toLocaleLowerCase()==='select'"
                                   :placeholder="search.name"
                                   :clearable="true"
                                   :filterable="search.lookup.props&&search.lookup.props.filterable"
                                   v-model="checkValue"
                                   size="small">
                            <el-option-group v-if="search.lookup.groupKey"
                                             v-for="item in search.lookup.option"
                                             :label="item.label">
                                <el-option v-for="i in item.children" :value="i.value" :label="i.label"></el-option>
                            </el-option-group>
                            <el-option v-if="!search.lookup.groupKey" v-for="i in search.lookup.option" :value="i.value" :label="i.label"></el-option>
                        </el-select>

                        <el-date-picker
                                v-else-if="search.lookup&&search.lookup.type==='DateTime'"
                                size="small"
                                v-model="checkValue"
                                type="datetime"
                                placeholder="选择日期时间"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                        <el-input :placeholder="search.name" v-else size="small" v-model="checkValue"></el-input>
                    </div>
                </el-form-item>
    &ndash;&gt;

    
            </el-form>-->
        </div>
        <el-form class="bottom" v-show="list&&list.length" :inline="true" label-position="top" size="mini">
            <el-form-item v-for="search in list" :label="search.name">
                <div @keyup.enter="onSearch">
                    <el-select v-if="search.lookup&&search.lookup.type.toLocaleLowerCase()==='select'"
                               :placeholder="search.name"
                               :clearable="true"
                               :filterable="search.lookup.props&&search.lookup.props.filterable"
                               v-model="form[search.colkey]"
                               size="small">
                        <el-option-group v-if="search.lookup.groupKey"
                                         v-for="item in search.lookup.option"
                                         :label="item.label">
                            <el-option v-for="i in item.children" :value="i.value" :label="i.label"></el-option>
                        </el-option-group>
                        <el-option v-if="!search.lookup.groupKey" v-for="i in search.lookup.option" :value="i.value" :label="i.label"></el-option>
                    </el-select>

                    <el-date-picker v-else-if="search.lookup&&search.lookup.type==='DateTime'" size="small"
                                    v-model="form[search.colkey]" type="datetime" placeholder="选择日期时间"
                                    :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-input :placeholder="search.name" v-else @keyup.enter="onSearch" size="small"
                              v-model="form[search.colkey]"></el-input>
                </div>
            </el-form-item>
            <el-form-item class="searchBtn">
                <!--此处el-button元素头尾相连不格式化是为了解决换行符会在浏览器渲染成一个空格的问题-->
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
</template>

<script>

import _ from 'underscore'

export default {
    props: ['clumns','hide', 'btns','dataNumber'],
    data() {
        return {
            checkType: '',
            checkValue: '',
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
        }
    },
    computed: {
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
//            data[this.checkType.colkey] = this.checkValue;
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
            this.typeList.map(val=>{
                this.toggleList(val)
            })
        }
    },
    created() {
        this.init();
    },
}
</script>