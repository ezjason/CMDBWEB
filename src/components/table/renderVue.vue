<style lang="less">
	@import "./table.less";
</style>

<template>
<div id="tableList" v-loading="loading">
    <transition-group name="table" tag="div">
        <div class="main-page" :key="1" v-show="!isShowMinorPage">
            <search :hide="table.prop.hideSearch" :clumns="searchColumn" :btns="btnList" @search="onSearch" @btnClick="onFuncBtns">
                <span v-if="public.showTitle">{{public.title}}</span>
            </search>
            <div class="tableList">
                <el-table
                        v-if="showTable"
                        ref="table"
                        :data="table.data"
                        :stripe="table.prop.stripe"
                        border="true"
                        style="width: 100%"
                        :max-height="table.prop.height"
                        fit
                        highlight-current-row
                        :show-header="table.prop.showTableTop"
                        @row-click="rowClick"
                        @filter-change="filterChange"
                        @sort-change="sortChange"
                        @selection-change="handleSelectionChange">
                    <el-table-column v-if="table.prop.checkbox" type="selection" 	 :selectable="isSelectable" width="31" :fixed="table.data.length > 0&&'left'"></el-table-column>
                    <el-table-column v-if="table.prop.index" type="index" label="序号" width="31"></el-table-column>
                    <el-table-column resizable="true"
                                     v-for="column in data.grid.column"
                                     :key="column.colkey"
                                     v-if="!column.hide"
                                     :label="column.name"
                                     :min-width="topTableWidth(column,data.grid.column)"
                                     :sortable="column.sort&&'custom'"
                                     :width="column.$width"
                                     :fixed="table.data.length > 0&&column.fixed"
                                     :prop="column.colkey"
                                     :column-key="column.colkey"
                                     :filters="getFilterItem(column)"
                                     :filter-multiple="getFilterMultiple(column)"
                                     show-overflow-tooltip="true">
                        <template scope="scope">
                            <a v-if="column.link" @click.stop="linkClick(scope,column)" v-html='formatterCol(scope,column)'></a>
                            <component v-else-if="column.vue"
                                       :is="column.vue"
                                       @update="getList()"
                                       :data="scope.row"
                                       :vueData="column.vueData"
                                       :value="formatterCol(scope,column)"></component>
                            <span v-else v-html='formatterCol(scope,column)'></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"
                                     v-if="lineBtn.length"
                                     :width="width"
                                     :fixed="isFixedBtn">
                        <template scope="scope">
                            <el-tooltip v-for="btn in lineBtn"
                                        :key="btn.text"
                                        :content="btn.text"
                                        :enterable="false"
                                        placement="top"
                                        hide-after="2000">
                                <el-button size="mini"
                                           @click.stop="onFuncBtns(btn,scope.row)"
                                           :disabled="btn.disabled&&btn.disabled(scope.row,scope.$index,table.data)"
                                           :type="btnIcon[btn.text]?'text':btn.style" v-html="textToIcon(btn.text)">
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <br>
            <el-pagination
                    v-if="public.showPage"
                    style="float: right"
                    :current-page="pagination.pagenum"
                    :page-size="pagination.pagesize"
                    :total="pagination.rowCount"
                    @current-change="pagenumChaneg"
                    @size-change="pagesizeChange"
                    :page-sizes="[10, 20, 30, 40,100]"
                    layout="total, sizes, prev, pager, next, jumper"></el-pagination>
            <el-row style="float: left" v-if="bottomBtn.length">
                <el-button v-for="btn in bottomBtn"
                           @click="onFuncBtns(btn)"
                           size="small"
                           :type="btn.style||'primary'"
                >{{btn.text}}</el-button>
            </el-row>
            <br>
        </div>
        <div class="main-page" :key="2" v-show="isShowMinorPage">
            <component ref="pageOpen" @close="close('isShowMinorPage')" @update="update('isShowMinorPage')" :is="getComponent" :data="getData" :param="getData"></component>
        </div>
    </transition-group>

	<el-dialog
			:title="dialogData.title"
			v-model="dialogModel">
		<component ref="windowOpen" @close="close('dialogModel')"  @update="update('dialogModel')" :is="dialogComponent" :data="dialogData" :param="dialogData"></component>
	</el-dialog>
</div>
</template>

<script type="es6">
import filter from '../../config/filter';
import search from './search.vue';

import _ from 'underscore'
export default {
	props: ['data', 'param'],
    components:{
        search
    },
	data() {
		return {
            appendParam: {},
            isShowMinorPage: false,
            getComponent: false,
			boxTimer:'',
            filterParam:{},
            sortParam:{},
            searchParam: '',
            loading:false,
            a:false,

            btnIcon:{
                '编辑':'icon-edit',
                '删除':'icon-delete',
                '暂停':'icon-pause',
                '继续':'icon-continue',
                '启用':'icon-enable',
                '禁用':'icon-disable',
                '执行':'icon-play',
                '终止':'icon-end',
                '克隆':'icon-clone',
                '开启':'icon-open',
                '查看':'icon-see',
                '关闭':'icon-close2',
                '授权':'icon-accept',
                '审核':'icon-check',
                '提交':'icon-submit',
                '撤回':'icon-back',
                '查看凭证':'icon-voucher',
                '分配资源组':'icon-resources',
                '分配用户':'icon-user',
                '分配角色':'icon-user',
                '查看报告':'icon-text',
                '重置密码':'icon-password',
                '上移':'icon-moveup',
                '下移':'icon-movedown',
                '分发':'icon-distribute',
                '下载':'icon-xiazai',
            },
            dialogComponent: false,
            dialogModel: false,
            dialogData: '',
            showTable: false,

            choiceRecord: [],
            getData: null,
            public: {
                name: '',
                url: '',
                isNew: false,
                showPage: true,
                showTitle: true,
                title: ''
            },
			getSearch:'',
            table: {
                columns: [],
                data: [],
                prop: {
                    header: {
                        isFixed: true,
                    },
                    border: true,
                    stripe: true,
                    height: 350,
                    showTableTop: false,
                    checkbox: false,
                    index:false,
                    hideSearch:false
                }
            },
            pagination: {
                pagenum: 1,
                pagesize: 10,
                rowCount: 0
            }
        };
	},
	computed: {
	    isFixedBtn(){
	        return this.table.data.length > 0&&'right'
		},
	    lineBtn(){
	      	let self=this;
	      	return self.data.btn?self.data.btn.filter(btn=>btn.position==='line'):[]
		},
        bottomBtn(){
	      	let self=this;
	      	return self.data.btn?self.data.btn.filter(btn=>btn.position==='bottom'):[]
		},
        btnList(){
            let self=this;
            return self.data.btn?self.data.btn.filter(btn=>!btn.position):[]
		},
		width(){
	        let width=36;
	        for(let i of this.lineBtn){
	            if(i.text){
	                if(this.btnIcon[i.text]){
                        width+=16+5
					}else{
                        width+=10+i.text.length*12+5
					}
				}
			}
	        return width<61?61:width
		},
		id() {
			let self = this;
			return self.data.code;
		},
		code(){
		    return this.$store.state.authorityKey
		},
		linkBox(){
		    return this.$store.state.linkBoxs
		},
        searchColumn() {
            return this.data.grid.column.filter(val => {
                return this.filterColumn.indexOf(val)===-1&&!val.noSearch
            })
        },
		filterColumn(){
		    return this.data.grid.column.filter(column=>{
                let lookup=column.lookup;
                if(lookup
                    &&lookup.actionType
                    &&lookup.actionType==='filter'
                ){
                    return true
                }
			})
		},
	},
	watch: {
		data() {
		    this.rest();
		}
	},
	methods: {
	    /*******luozheao20171027,拓展,start********/
	    //设置是否可选
        isSelectable(row,index){
            //可以在外面进行拓展
            return true;
		},
		//表格渲染完后执行的事件
		afterRenderTableCallback(){

		},
        filterChange(filters){
		    let colkey=Object.keys(filters)[0];
		    let column=this.filterColumn.find(val=>colkey===val.colkey);
		    let multiple=column.lookup &&column.lookup.props &&column.lookup.props.multiple;
		    let val=Object.values(filters)[0];
            val=multiple?val:val[0];
		    this.filterParam={...this.filterParam,[colkey]:val};
		    this.getList();
		},
        sortChange({ column, prop, order }){
            let sort={name:'',type:''};
            sort.name=prop;
			switch (order){
				case 'ascending'://升序
					sort.type='asc';
				    break;
				case 'descending'://降序
                    sort.type='desc';
                    break;
			}
			this.sortParam=sort;
            this.getList();
		},
        getFilterItem(column){
            if(this.filterColumn.indexOf(column)>=0){
                return column.lookup.option
			}
		},
        getFilterMultiple(column){
            if(column
				&&column.lookup
				&&column.lookup.props
				&&column.lookup.props.multiple
			){
                return column.lookup.props.multiple
            }else{
                return false
			}
		},
        filterFormat(data,label,value){
            return data.map(obj => {
                obj.value = obj[value];
                obj.text = obj[label];
                obj.disabled = false;
                return obj
            });
        },
		async getFilters(){
            for(let column of this.filterColumn){
                let lookup=column.lookup;
                let label = lookup.replaceLabel || 'label';
                let value = lookup.replaceValue || 'value';
                if (lookup.remote && !(lookup.option && lookup.option.length)) {
                    this.$sendJson(lookup.remote,
                        lookup.data ||{"params":{"pagination":{"pagenum":1,"pagesize":"999"}}},
                        data=>{
                            let list = data.data.records || data.data;
                            lookup.option=this.filterFormat(list,label,value);
                        }
                    );
                }
			}
		},
	    textToIcon(text){
	        let icon=this.btnIcon;
	        let result=text;
	        if(icon[text]){
                result=`<i class="iconfont ${icon[text]}"></i>`
			}
			return result
		},
	    close(model){
	        this.$set(this,model,false);
            this.pageOpen(false);
		},
		update(model){
            this.getList();
//            this.close(model);
            this.$emit('update')
		},
	    linkClick(scope,column){
	        switch(column.link.type){
				case 'pageOpen':
                    let label=scope.row[column.colkey];
                    let selfVue=column.link.vue;
                    if(selfVue instanceof Function){
                        selfVue=selfVue.call(this,scope.row)
					}
					if(selfVue){
                        let data={...scope,selfVue,data:column.link.data};
                        this.pageOpen(true,{label,click:()=>{
                            this.getComponent=false;
                            this.getData=data;
                            this.$nextTick(()=>{
                                this.getComponent=selfVue;
                            })
                        }});
                        this.isShowMinorPage = true;
                        this.getData=data;
                        this.getComponent = selfVue;
					}
				    break;
				default:
				    let vue=column.link.vue;
				    if(vue instanceof Function){
                        vue=vue(scope.row)
					}
					if(vue){
                        this.linkBox.toggle({
                            title: scope.row[column.colkey],
                            data: {
                                ...scope,
                                selfVue:vue,
                                data:column.link.data
                            },
                            vue:vue,
                        });
					}
				    break;
			}
		},
	    topTableWidth(column,columns){
	        let width=column.width;
	        if(!column.width){
                width=column.name.length*13+36
			}
	        return width
		},
        rowClick(row,e){
            if(['TD','DIV'].indexOf(e.target.nodeName)>-1){
                this.$refs.table.toggleRowSelection(row)
			}
			this.$emit('rowClick',row)
		},
		async confirm( title = '提示', message = '您确定要删除此条信息吗？', confirmButtonText = '确定', cancelButtonText = '取消', type = 'warning') {
			let self = this;
            let result=await new Promise(function (resolve) {
//                this.$sendJson(url,data,d=>resolve(d),e=>resolve(e))
                self.$confirm(message, title, {
                    confirmButtonText,
                    cancelButtonText,
                    type
                }).then(() => {
                    resolve(true);
                }).catch(() => {
                    resolve(false);
                });
            });
            return result
		},
		async onFuncBtns(param,row) {
			let self = this;
			let types=[];
            this.linkBox.allHide();
            if(typeof param.type === 'string'){
                types=[param.type]
            }else if(param.type instanceof Array){
                types=param.type
			}
			let action={};
			for(let type of types){
                let result;
                switch (type){
                    case 'onlyRequest':
                        result=await self.onOnlyRequest({...param,action},row);
                        break;
                    case 'pageOpen':
                        result=self.onPageOpen({...param,action},row);
                        break;
                    case 'windowOpen':
                        result=self.onWindowOpen({...param,action},row);
                        break;
                    case 'blank':
                        result=self.onBlank({...param,action},row);
                        break;
                    case 'custom':
                        result=self.onCustom({...param,action},row);
                        break;
                }
                action[type]=result;
                if(param.stepAction){
                    result=param.stepAction(result)
				}
                if(!result){
                    break;
				}
			}
		},
		paramParse(param,row,type){
            let result = row||{};
            let paramFn;
            if(typeof param === 'object'){
                paramFn=param[type]
			}else{
                paramFn=param
			}
            if(paramFn instanceof Function){
                result= paramFn.call(this,row?[row]:this.choiceRecord,{sortParam:this.sortParam,appendParam:this.appendParam,filterParam:this.filterParam,searchParam:this.searchParam});
            }
            return JSON.parse(JSON.stringify(result))
		},
		pageOpen(bool,path){
		    let self=this;
		    let appendPath={...path,
                click(){
                    let x=self.getComponent;
                    self.getComponent=false;
                    self.getData.refresh=true;
                    self.$nextTick(()=>{
                        self.getComponent=x;
                    })
                },
                back(){
                    self.isShowMinorPage=false;
                    self.dialogModel=false;
                    self.$emit('onPageOpen',false);
                }
            };
            this.$emit('onPageOpen',bool);
            if(bool){
                this.$store.commit('pushAppendPath',{data:appendPath})
			}else{
                this.$store.commit('popAppendPath');
			}
//            this.$store.commit('setAppendPath',{data:bool?[]:[]})
        },
        async onOnlyRequest(param,row) {
			let self = this,params,isConfirm;
			let url = param.url;
			if (!url) {
				return;
			}
            params = self.paramParse(param.param,row,'onlyRequest');
            if(!params){
                return
            }
			if (param.text.indexOf('删除') > -1||param.alert) {
				isConfirm = await self.confirm('提示',param.alert);
			}
			if(isConfirm!==false){
                let r = await this.$fetch('POST', url, {params});
                if (r.msgCode === 200) {
                    if(param.type&&!(param.type instanceof Array)){
                        self.$message.success(param.text+'成功');
                        self.getList();
                        self.$emit('update')
					}
                }
                return r
			}
		},
		onPageOpen(param,row) {
			let self = this;
			let data=self.paramParse(param.param,row,'pageOpen');
			let option=param.data&&JSON.parse(JSON.stringify(param.data));
			if (!param.vue) {
				return
			}
            if(!data){
                return
            }
            let label=this.getTitle(param.text);
            this.pageOpen(true,{label});

            self.isShowMinorPage = true;
            self.getData={data,option,action:param.action};

            self.getComponent = typeof param.vue=='function'?param.vue(row):param.vue;//luozheao20171109拓展
        },
		getTitle(text){
            let label=(this.public.title||'').replace(new RegExp("(管理|列表|我的|"+text+")",'g'),'');
            if(text.length===2){
                label=text+label;
            }else{
                label=text;
			}
            return label
		},
		onWindowOpen(param,row) {
			let self = this;
            let data,option=param.data&&JSON.parse(JSON.stringify(param.data));
            if (!param.vue) {
                return
            }
            data = self.paramParse(param.param,row,'windowOpen');
            if(!data){
                return
            }
			let title = this.getTitle(param.text);
			self.dialogData={data,option,title,action:param.action};
            self.dialogComponent=param.vue;
			self.dialogModel=true;
		},
		onBlank(param,row) {
			let self = this;
			let data=self.paramParse(param.param,row,'blank');
			data['snc-token']=this.$storage.get('loginKey')['snc-token'];
			if (!param.url) {
				return;
			}
			let url =  param.url;
			if (typeof data == 'object') {
				let paramArr = [];
				for (let key in data) {
					let paramItem = key + '=' + encodeURIComponent(data[key]);
					paramArr.push(paramItem);
				}
				let urlParam = paramArr.join('&');
				url =  url + '?' + urlParam;
			}
			window.open(url, '_blank');
		},
		onCustom(param,row) {
            let data,option=param.data&&JSON.parse(JSON.stringify(param.data));
            data = this.paramParse(param.param,row);
            param&&param.action&&param.action.call(this,data,param)
		},
		async getList() {
			let self = this;
			let table_url = self.public.url;
			let table_param;
			if(!table_url){return}
            this.loading=true;
            table_param={
                params: {
                    pagination: {
                        pagenum: self.pagination.pagenum,
                        pagesize: self.pagination.pagesize,
                        sort:self.sortParam,
                    },
                    condition:{
                        ...self.filterParam,
                        ...self.searchParam,
                    }
                }
            };
            if(this.data.onSearch){
                table_param.params.condition=this.data.onSearch(table_param.params.condition);
            }
            if (self.appendParam) {
                Object.assign(table_param.params.condition,self.appendParam);
            }
            let table_data = await this.$fetch('POST', table_url, table_param);
			if (!table_data||table_data.msgCode != 200) {
                this.loading=false;
                return;
			}
			if(this.data.onDataLoad){
                table_data=this.data.onDataLoad(table_data,this.data.grid.column,this);
			}
			self.table.data = [];
			self.table.data = table_data.data.records||table_data.data.dataList||table_data.data;
			self.setPagination(table_data.data);

			this.$nextTick(()=>{
                this.loading=false;
                //回调方法,可以在外面覆盖
                self.afterRenderTableCallback();
			})
		},
		onSearch(data) {
			let self = this;
			self.getSearch = data;
			if(self.public.url){
                self.searchParam = data;
                self.getList();
			}else{
                self.table.data=this.data.records.filter(v=>{
                    let result=true;
                    for(let i in data){
                        if(v[i].indexOf(data[i])<0){
                            result=false
							break;
						}
					}
					return result;
				})
            }

		},
		setPagination(obj) {
			let self = this;
			for (let key in obj) {
			    if(key in self.pagination){
                    self.pagination[key] = obj[key];
				}
			}
		},
		onDelRecord(index, rows) {
			rows.splice(index, 1);
		},
		rest() {

			let self = this;
            this.showTable=false;
            self.$nextTick(function(){
                self.showTable=true;
			});
			self.appendParam = {};
			self.isShow = false;
			self.isShowMinorPage = false;
			self.dialogComponent = false;
			self.getComponent = false;
			self.dialogModel = false;
			self.choiceRecord = [];
			self.showTable =false;
			self.getData = null;
			self.public = {
				name: '',
				url: '',
				isNew: false,
				showPage: true,
				showTitle: true,
				title: ''
			};
			self.searchParam = '';
			self.table = {
				columns: [],
				data: [],
				prop: {
					header: {
						isFixed: true,
					},
					border: true,
					stripe: true,
					height: 350,
					showTableTop: false,
					index: false,
					checkbox: false,
                    hideSearch: false
				}
			};
			self.pagination = {
				pagenum: 1,
				pagesize: 10,
				totalPage: 1,
                rowCount: 0
			};

			// 权限开关
            self.authorization();

			self.getModule();

			self.getFilters()
		},
		async getModule() {
			let self = this;
			let model=self.data;
			for (let key in self.public) {
				self.public[key] = model[key];
			}
			self.pagination.pagesize = model.grid.pageSize;
			self.table.prop.showTableTop = model.grid.showTableTop;
			self.table.prop.checkbox = model.grid.checkbox;
			self.table.prop.index = model.index;
			self.table.prop.hideSearch = model.hideSearch;
			self.table.data = model.records||[];
            let appendParam = {};
            if (self.data.paramData) {
                if (typeof self.data.paramData === 'string') {
                    appendParam = JSON.parse(decodeURIComponent(self.data.paramData));
                } else if (typeof self.data.paramData === 'object') {
                    appendParam = self.data.paramData;
                }
            }
            self.appendParam=appendParam;
            self.getList();
        },
        authValid(data){
            /*let code=this.code;
            let isAuth=true;
            if(data.authorityCode&&data.authorityCode.length){
                for(let item of data.authorityCode){
                    if(code.indexOf(item.code)===-1){
                        isAuth=false;
                        break;
                    }
                }
            }*/
            return data.btnAuthorityCode?this.code.indexOf(data.btnAuthorityCode)>=0:true;
		},
        authorization(){
		    let data=this.data;
		    let newBtn=[];

			this.authValid(data)||(data.url='');
			for(let item of data.btn){
		        this.authValid(item)&&(newBtn.push(item))
			}
			data.btn=newBtn;
		},
		pagenumChaneg(pagenum) {
			let self = this;
			self.pagination.pagenum = pagenum;
			self.getList();
		},
        pagesizeChange(pagesize) {
			let self = this;
			self.pagination.pagesize = pagesize;
			self.getList();
		},
		//勾选事件
		handleSelectionChange(val) {
			let self = this;
			self.choiceRecord = val;
		},
		formatterCol(scope,currColumn) {
			let self = this;
			let row = scope.row;
			let column = scope.column;
			let columnVal = row[column.property];
            if (currColumn&&currColumn.filter) {
                columnVal = filter[currColumn.filter](columnVal, row,currColumn);
            }
			return columnVal;
		},
		//清空所有勾选
        clearSelection(){
            this.$refs['table'].clearSelection();
		},
	},
	created() {
		let self = this;
        self.rest();
	},
}
</script>
