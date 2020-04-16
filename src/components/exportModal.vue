<template>
<div class="modal fade bd-example-modal-xl search_model" id="exportModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <loading v-if="loadingShow"></loading>
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLongTitle">倉儲資料管理-匯出設定</h1>
            </div>
            <div class="modal-body">
                 <div class="container-fluid">
                    <div class="row outer-wrapper">
                        <div class="year-wrapper mb-3">
                            <span class="mr-3">{{title}}:</span>
                            <el-select v-model="value" :multiple="tableengname!=='stuscore'" placeholder="請選擇">
                                <el-option
                                v-for="item in years"
                                :key="item"
                                :label="item"
                                :value="item">
                                </el-option>
                            </el-select>
                            <button type="button" class="btn btn-success ml-3" @click="downloadColumns()">下載</button>
                        </div>
                       <el-collapse v-model="activeNames" @change="handleChange" v-for="(groups,index) in optionsRaw" :key="index">
                            <el-collapse-item :title="index" :name="index">
                                <el-checkbox :disabled="index==='固定帶出'" :indeterminate="optionSetting[index].isIndeterminate" v-model="optionSetting[index].checkAll" @change="handleCheckAllChange=>handleCheckAll(handleCheckAllChange,index)">全選</el-checkbox>
                                <div style="margin: 15px 0;"></div>
                            
                                <el-checkbox-group :disabled="index==='固定帶出'" v-model="optionSetting[index].checkedOptions" @change="handleCheckedCitiesChange=>handleCheckedChange(handleCheckedCitiesChange,index)">
                                    <el-checkbox class="col-md-2 mb-3" v-for="column in groups" :label="column" :key="column.id">{{column.columnname}}</el-checkbox>
                                </el-checkbox-group>
                             </el-collapse-item>
                        </el-collapse>
                       
                    </div>
                     
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal()">Close</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { saveAs } from 'file-saver';
import loading from '../components/loading';
import store from '../store/modules/auth'
import VueBootstrap4Table from 'vue-bootstrap4-table';
import {apiQueryTableColumn} from '@/apis/etl';
// import exportModal from '../components/exportModal';
export default {
    name: "exportModal",
    components: {
         VueBootstrap4Table,
         "loading":loading,
        // "export-modal":exportModal
    },
    props: {
        tableName:{
            type:String
        },
        tableengname:{
            type:String
        }
    },
    data() {
        return{
            yearOptions: ['98','99','100','101','102','103','104','105','106','107','108'],
            value:[],
            title:'入學年',
            activeNames: ['1'],
            staticOption:['StuCode','StuID','StuNameC','EnrollSYear'],
            currentStaticOption:[],
            loadingShow:false,
            checkAll: false,
            checkedOptions: [],
            checkedOptionsid:[],
            optionsRaw:{}, //原始group columns資料
            optionSetting:{},
            options:[],
            optionsid:[],
            isIndeterminate: true,
            rows: [
                {
                    tableName:'課程學期資料',
                    type:'課程',
                    status:{
                        "status_name": "清洗程式啟動中...",
                        "status_time": "yyyy/mm/dd hh:mm:ss"
                    },
                    count:'12,345',

                },
                {
                    tableName:'課程學期資料',
                    type:'課程',
                    status:{
                        "status_name": "清洗程式啟動中...",
                        "status_time": "yyyy/mm/dd hh:mm:ss"
                    },
                    count:'12,345',

                }
            ],
            columns:[
                {
                    label: "表單名稱",
                    name: "tableName",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "類型",
                    name: "type",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "狀態",
                    name: "",
                    slot_name:"status",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "資料筆數",
                    name: "count",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "",
                    name: "clear",
                    slot_name: "clear"
                },
                {
                    label: "",
                    name: "export",
                    slot_name: "export"
                },
                {
                    label: "",
                    name: "schedule",
                    slot_name: "schedule"
                }
            ],
            config: {
                checkbox_rows: true,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
                // card_title: "Vue Bootsrap 4 advanced table"
            },
        }
    },
    mounted: function () { 
        
    },
    computed: {
         years(){
            let days = new Date();
            let Year=days.getFullYear()-1911;
            let Month=days.getMonth();
            let yearList=[];
            let end=null;
            if(this.tableengname!=='stusportlist'){
                if( Month>=2 && Month<=7){
                    end=Year-1;
                }else{
                    end=Year;
                }
                for(let i = 98; i <= end; i++){
                    yearList.push(i);
                };
            }else{
                yearList=['106','107']
            }
            return yearList;
        },
    },
    methods:{
        closeModal(){
            this.getQueryTableColumn(this.tableName);
            this.value=this.tableengname==='stuscore'?null:[];
         
        },
        handleChange(val) {
            console.log(val);
        },
        // 處理全選
        handleCheckAll(val,index) {
            console.log('handleCheckAllChange',val,index);
            if(val==true){
                this.optionSetting[index].checkedOptions.length=0;
                this.optionSetting[index].checkedOptions=this.optionSetting[index].OptionsName;
                 this.optionSetting[index].isIndeterminate = false;
                
            }else{
                this.optionSetting[index].checkedOptions=[];
                this.optionSetting[index].isIndeterminate = true;
            }
            // this.checkedOptions = val ? this.options : [];
            // this.checkedOptionsid = val ? this.optionsid : [];

          
        },
        // 處理單選
        handleCheckedChange(value,index) {
            console.log('handleCheckedChange',value,index);
            let checkedCount = value.length;//目前勾選選項的長度
            this.optionSetting[index].checkAll = checkedCount === this.optionSetting[index].OptionsName.length;//目前勾選的長度===總長度
            this.optionSetting[index].isIndeterminate = checkedCount > 0 && checkedCount < this.optionSetting[index].OptionsName.length;
        },
        // 查找群組和欄位
        getQueryTableColumn(tableName){
             apiQueryTableColumn({},tableName)
            .then((response)=>{
                console.log('exportModal查找群組和欄位----->',response.data);
                this.optionsRaw={};
                // this.optionsRaw=response.data;
                this.$set(this.optionsRaw,'固定帶出',response.data['固定帶出']);
                for(let item in response.data){
                    if(item!=='固定帶出'){
                         this.$set(this.optionsRaw,item,response.data[item]);
                    }
                }
               

               
                for(let item in response.data){
                    let obj={
                        checkAll: false,
                        isIndeterminate: true,
                        checkedOptions: [],
                        OptionsName:[],

                    };
                    this.$set(this.optionSetting,item,obj);
                    for(let item2 of response.data[item]){
                        this.optionSetting[item].OptionsName.push(item2);
                        
                    }
                    if(item==='固定帶出'){
                        this.optionSetting[item].checkedOptions=[];
                        for(let item3 of response.data[item]){
                            this.currentStaticOption.push(item3.columnengname);
                             this.optionSetting[item].checkedOptions.push(item3);
                        };
                       
                       
                    }
                }
                

            })
        },
        // 已廢
        init_export_params:function(tableName){
        
            let init_export_params={url: this.$js.baseURL+"/api/etlcontroller/queryTableColumn/"+tableName, 
                                            params:{},
                                            method:"POST"};

            let _this=this;
            var p=this.$js.ajaxPromise200(init_export_params).then(function(data) {
                console.log("匯出表單資料",data);
                // debugger;
                _this.optionsRaw.length=0;
                _this.optionsRaw=data;
                _this.options.length=0;
                for(let item in data){
                    _this.options.push(data[item].columnengname);
                    _this.optionsid.push(data[item].columnname);
                }
            
            });
            p.then(()=>{
            
            });
        },
        downloadColumns(){
            
            let flag=true;
            let params= new Promise((resolve, reject)=>{
                let obj={
                    columns:[],
                    tablename:'',
                    // year:''
                };
     
                obj.tablename=this.tableengname;
                if(this.tableengname==='stuscore'){
                    if(this.value.length===0){
                        flag=false;
                        this.$swal({
                                title: '請選擇學年度',
                                text: "",
                                type: 'warning',
                                confirmButtonText: '確認'
                        }) .then((result)=>{
                            
                        });
                     }else{
                         this.loadingShow=true;
                        this.$set(obj,'alldatayear','')
                        obj.alldatayear= this.value.toString();
                     }
                   
                }else{
                    this.loadingShow=true;
                    this.$set(obj,'year','')
                    obj.year= (this.value && this.value.length > 0) ? this.value : null;
                }
               
                // for(let value of this.currentStaticOption){
                //      obj.columns.push(value);
                // }
                // obj.columns=json.parse(json.stringify(this.currentStaticOption));
                if(flag){
                    for(let item in this.optionSetting){
                        if(this.optionSetting[item].checkedOptions.length>0){
                            for(let item1 of this.optionSetting[item].checkedOptions){
                                    obj.columns.push(item1.columnengname);
                            }

                        }
                        resolve(obj);
                    }
                }
            });
            params.then((res)=>{
                console.log('匯出資料API參數--->',res)
                  console.log('init_downloadColumns_params',this.$store.state.auth.token)
                this. init_downloadColumns_params(res);
            })
            
        },
        init_downloadColumns_params: async function(res) {
            console.log('res',res)
            console.log('init_downloadColumns_params',this.$store.state.auth.token)
            const fileName='Output.xlsx'
            // this.$js.baseURL+ "/api/etlcontroller/export"
            // const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJOREV4ZEdWemRERXciLCJyb2xlcyI6IjVyaXM2S21tNWJpejZKbWYiLCJyb2xlbmFtZSI6IjU3Tzc1N1d4NTY2aDU1Q0c2SUNGIiwiZXhwIjoxNTg2MTQxODY1LCJjcmVhdGVkIjoxNTg2MTQwMDY1MDU3LCJhdXRocyI6Ik1URXNNU3d4TWl3eUxETXNOQ3cxTERZc055dzRMRGtzTVRBPSJ9.eqd73HeHCLoQY8YP4v4Xrphw4m0Nh4CxYH-YyrAWOpIdKu0Ff7fEdkkqNSlMI3ofdGYggz-4iO7-Z0LDZVXe0A'
            const token=this.$store.state.auth.token;
          
            const response = await this.$axios.post(
                `${this.$js.baseURL}/api/etlcontroller/export`,
                res,
                {
                    responseType: 'arraybuffer',
                    headers: {
                        'content-Type': 'application/json;charset=UTF-8',
                        'cache-control': 'no-cache',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = objectUrl;
            a.download = '資料匯出檔.xlsx';
            a.click();
            document.body.removeChild(a);
            this.loadingShow=false;
        },
    },
    watch: {
        tableName:function(val){
            
            // this.init_export_params(this.tableName);
            this.getQueryTableColumn(this.tableName);
        },
        tableengname:function(val){
            if(val==='stuscore'){
                this.value=null
            }else{
                this.value=[]
            }
           
            console.log("tableengname",val);
            if(val==='stuinfo'){
                this.title='入學年'
            }else{
                this.title='學年度'
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer-wrapper{
    display: flex;
    flex-direction: column;
}
.load-wrapp{
    /* float: left; */
    position: fixed;
}
.year-wrapper{
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;   
}
</style>
