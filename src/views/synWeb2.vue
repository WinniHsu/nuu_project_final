<template>
  <div class="second-home">
        <div class="row p-5" v-if="columns.length>0">
            <div class="col-12">    
                <div class="title  mb-3">
                    <button type="button" class="btn btn-primary mr-2"  @click="BackToSynWebList()"><i class="fas fa-arrow-left mr-3"></i>BACK</button>
                    同義詞管理 - {{$route.params.tableName}}
                </div>
                <!-- <button type="button" class="btn btn-primary mb-3"  @click="BackToSynWebList()"><i class="fas fa-arrow-left mr-3"></i>BACK</button> -->
                <vue-bootstrap4-table  :rows="rows" :columns="columns" :config="config" :actions="actions" @add-data="addData"  @downloadPart-data='downloadPartData' @downloadAll-data='downloadAllData'>
                    <!--  @downloadform='downloadForm' 下載範例檔-->
                    <template slot="global-search-clear-icon" >
                        <i class="fas fa-times-circle"></i>
                    </template>
                    <template slot="simple-filter-clear-icon">
                        <i class="fas fa-times-circle"></i>
                    </template>
                    <template slot="open" slot-scope="props">
                    <button
                        type="button"
                        class="btn btn-info"
               
                        @click="trace(props.row)"
                    >編輯</button>
                    <!--          data-toggle="modal"
                        data-target="#myModal" -->
                    </template>
                    <template slot="delete" slot-scope="props">
                    <button
                        type="button"
                        class="btn btn-danger"
                        @click="traceDelete(props.row)"
                    >刪除</button>
                    </template>
                </vue-bootstrap4-table>
            </div>
          
            <detail-modal :tempid="tempID" :choosedData="choosedData" :columns="columns"  @sendeditdata='getsendEditData' :params="$route.params.params"></detail-modal>
             <detail-modal1 :tempid="tempID" :choosedData="choosedData" :columns="columns"  @sendeditdata='getsendEditData' :params="$route.params.params"></detail-modal1>
            <insert-modal  :columns="columns" :optionList="option"  @sendeditdata='getsendEditData'></insert-modal>
            <insert-modal1  :columns="columns" :optionList="option"  @sendeditdata='getsendEditData'></insert-modal1>
        </div>
  </div>
</template>

<script>

import sidebar from '../components/sidebar'
import VueBootstrap4Table from 'vue-bootstrap4-table';
import detailModal from '../components/detailModal';
import detailModal1 from '../components/detailModal1';
import insertModal from '../components/insertModal';
import insertModal1 from '../components/insertModal1';
import upload from '../components/upload'
import {apiQueryColumn} from '@/apis/syn.js';
import {apiQueryAllData} from '@/apis/syn.js';
import {apiDeleteMaster} from '@/apis/syn.js';
export default {
  name: "synTemplate",
  components: {
     "sidebar":sidebar,
     VueBootstrap4Table,
     "detail-modal":detailModal,
     "detail-modal1":detailModal1,
     "insert-modal":insertModal,
     "insert-modal1":insertModal1,
     "upload":upload
  },
  props:{
  },
  data: function() {
        return {
            // 儲存所有的資料
            rows: [],
            columns:[
                // {
                //         label: "graduateSchoolCode",
                //         name: "",
                //         filter: {
                //             type: "simple",
                //             placeholder: ""
                //         },
                //         sort: true,
                // },
                // {
                //   label: "",
                //   name: "open",
                //   slot_name: "open"
                // }
            ],
            printColumns:[],
            option:{},
            config: {
                checkbox_rows: true,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
                global_search: {
                     visibility: false,
                }
                // card_title: "Vue Bootsrap 4 advanced table"
            },
            actions: [
                {
                    btn_text: "新增",
                    event_name: "add-data",
                    // event_name: "on-download",
                    class: "btn btn-success my-custom-class ",
                    event_payload: {
                        msg: "新增"
                    }
                },
                {
                    btn_text: "下載部分資料",
                    event_name: "downloadPart-data",
                    // event_name: "on-download",
                    class: "btn btn-info my-custom-class",
                    event_payload: {
                        msg: "下載部分資料"
                    }
                },
                {
                    btn_text: "下載全部資料",
                    event_name: "downloadAll-data",
                    // event_name: "on-download",
                    class: "btn btn-danger my-custom-class",
                    event_payload: {
                        msg: "下載全部資料"
                    }
                },
                // {
                //     btn_text: "下載範例資料表",
                //     event_name: "downloadform",
                //     // event_name: "on-download",
                //     class: "btn btn-secondary my-custom-class",
                //     event_payload: {
                //         msg: "下載範例資料表"
                //     }
                // }
            ],
            // 選取的資料
            choosedData:{},
            // 主表的key
            tempID:''
        }
  },
  mounted: function () { 

    //先取得欄位
    this.getQueryColumn(this.$route.params.params);
  },
  computed: {

  },
  watch:{
    '$route.params.params':function(){
         this.getQueryColumn(this.$route.params.params);
    }
 
  },
  methods: {
    BackToSynWebList(){
        this.$router.push({name:'synWeb-1'});
    },
    getchangepage(value){
        
    },
    getQueryColumn(tableName){
        apiQueryColumn({tableengname:tableName}).then((response)=>{
            console.log(response);
            let _this=this;
             _this.columns=[];
            let arrayList=[];
            for(let item in response.data){
                if(response.data[item].type==='title'){
                    var obj= {
                        label: "",
                        name: "",
                        filter: {
                            type: "simple",
                            placeholder: ""
                        },
                        sort: true,
                    };
        
                    obj.label=response.data[item].chtname;
                    obj.name=response.data[item].engname;
                    obj.filter.placeholder=response.data[item].chtname;
                    _this.columns.push(obj);
                }else{
                    if(arrayList.indexOf(response.data[item].type)<0){
                         arrayList.push(response.data[item].type);
                    };
                };
            };

            for(let item in _this.columns){
                if(_this.columns[item].label!==''){
                    _this.printColumns.push(_this.columns[item].label);
                }
            };

            _this.option={};
            for(let val in arrayList){
                // console.log(arrayList[val]);
                _this.$set(_this.option,arrayList[val],[]);

            };
            for(let item in response.data){
                for(let val in arrayList){
                    if(response.data[item].type===arrayList[val]){
                        // console.log(data[item].type,arrayList[val],data[item].chtname)
                        _this.option[arrayList[val]].push(response.data[item].chtname)
                    }
                }
            }
            //  console.log(arrayList)
            var obj2= {
                  label: "",
                  name: "open",
                  slot_name: "open"
            };
            var obj3= {
                label: "",
                name: "delete",
                slot_name: "delete"
            };
            _this.columns.push(obj2);
            _this.columns.push(obj3);

        })
        .then(()=>{
            this.getQueryAllData(this.$route.params.params);
        })
    },
    getQueryAllData(SynonymType){
        apiQueryAllData({SynonymType:SynonymType}).then((response)=>{
            let _this=this;
            _this.rows.length=0;
            for(let item in response.data){
                _this.$set(_this.rows,item,response.data[item])
            }
        });
        
    },
    getDeleteMaster(schoolCode,SynonymType){
        apiDeleteMaster({SynonymType:SynonymType,schoolCode:schoolCode}).then((response)=>{
            this.getQueryAllData(this.$route.params.params);
        }).then(()=>{
            this.$swal({
                title: '刪除成功',
                text: "",
                type: 'success'
            })    
        })
    },
    addData(payload) {
        // console.log(this.$route.params.params)
        if(this.$route.params.params==='Dropstu'||this.$route.params.params==='Suspend'){
              $('#insertModal1').modal('show');     
        }else{
            $('#insertModal').modal('show');     
        }
      
    },
    downloadPartData(payload){
        this.onExportExcel(payload.selectedItems);
    },
    downloadAllData(payload){
        // console.log(payload);
        this.onExportExcel(this.rows);
    },
    downloadForm(payload){
        var arrayList=[];
        this.onExportExcel(arrayList);
    },
    onExportExcel: function(data) {
        console.log(data)
            var xls= [
                ["同意詞表"],[]
                // ["學校代碼","校名","體系","公私立","都會型高中","學校區域","學校縣市","學校市區","詳細地址","緯度","經度"]
            ];
            let arrayList=[];
            // let arrayList=['graduateSchoolCode','graduateSchoolName','graduateSchoolSystem','graduateSchoolPublicPrivate',
            // 'graduateSchoolCityMarked','graduateSchoolRegion','graduateSchoolCity','graduateSchoolDistrict',
            // 'graduateSchoolAddress','lat','lng']
            for(let item in this.columns){
                if(this.columns[item].label!==''){
                    xls[1].push(this.columns[item].label);
                    arrayList.push(this.columns[item].name)
                }
            }
            

            // xls.push(arow);
            
            for(let item in data){
                var arow=[];
                for(let a=0;a<arrayList.length;a++){
                    arow.push(data[item][arrayList[a]]);
                }
                xls.push(arow)
                 
            }
        
            //設定格式
            var sheet = XLSX2.utils.aoa_to_sheet(xls);
            sheet["!merges"] = []; //宣告需要合併cell
            sheet["!cols"] = [ {wpx: 80}, { wpx: 120}, {wpx: 90}, {wpx: 80}, {wpx: 80}   ];  //設定 column 寬度
            sheet["A1"].s = {  //設定 A1 格式
                font: {
                    name: "Microsoft JhengHei",
                    sz: 30,
                    bold: true,
                    underline: true,
                    color: { rgb: "FFFFAA" }
                },
                alignment: { horizontal: "center", vertical: "center", wrap_text: true },
                fill: {
                    type: "pattern",
                    pattern:"solid",  // none / solid
                    fgColor:{rgb:"ac4587"},
                    //bgColor:{rgb:"ac4587"} //可不用
                }
            };
            sheet["!merges"].push(  //合併cell
                { s: { c: 0, r: 0 }, //start c=column,r=row
                e: { c: 4, r: 0 }  //end
                }
            );
            //console.log(sheet);
            openDownloadDialog(sheet2blob(sheet), "同義詞資料表.xlsx");
    },
    //已選資料
    trace:function(value){
        console.log(value)
        if(this.$route.params.params==="Dropstu"){
            $('#myModal1').modal('show')
            var obj={};
            for(let item in value){
                if(item!=='vbt_id'){
                    this.$set(obj,item,value[item])
                }
            }
            this.choosedData=obj;
        }else{
             $('#myModal').modal('show')
            var obj={};
            for(let item in value){
                if(item!=='vbt_id'){
                    this.$set(obj,item,value[item])
                }
            }
            this.tempID=value.graduateSchoolCode;
            this.choosedData=obj;
        }
       
    },
    // trace刪除哪一筆
    traceDelete(value){
        console.log(value)
         this.$swal({
            title: '刪除該筆資料',
            text: "是否確認刪除該筆資料",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '取消',
            confirmButtonText: '確定'
        })         
        .then((result)=>{ 
            if(result.value===true){
                if(this.$route.params.params==='Dropstu'){
                      this.getDeleteMaster(value.dropremarkid,this.$route.params.params);
                }else{
                      this.getDeleteMaster(value.graduateSchoolCode,this.$route.params.params);
                }
              
            }else if(result.dismiss==='cancel'){

            }
           
        });

    },
    // 當詳細資料更新成功後，重新request全部學校資料
    getsendEditData:function(value){
        this.getQueryAllData(this.$route.params.params);
    },
    // 上傳資料成功後，request全部學校資料
    requestData(){
        this.getQueryAllData(this.$route.params.params);
    },





  },

};
</script>
<style scoped>
.second-home{
    width:100%;
    height:79%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
}
.title{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-size: 1.3rem;
    font-weight: 900;
}
.home{
    height:100vh;
    overflow-y: scroll;
}
.card {
    border: 0px ;
    /* background-color: var(--light-blue-border); */
    background-color:transparent;
    /* box-shadow: 0px 0px 7px 2px rgba(255,255,255,0.5); */
    background-color:rgba(255,255,255,0.1);
    /* min-width: 300px; */
    width: 100%;
    /* height:100%; */
    border-radius: 20px;
}
.card{
   /* background: #77A88D; */
    /* background: rgb(208, 212, 210); */
    box-shadow: 3px 3px 8px 2px rgb(128, 127, 127,0.7);
    border:10px solid #17a2b8 !important;
}
.table {
    /* color: #fff; */
    /* background: #77A88D; */
     /* background: #FF6670; */
    
}

.table tbody tr:hover {
    background:transparent !important;
}

.table thead th,
.table td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
/* 20190918 add */
.table-active>td{
    /* background: transparent; */
}

.table thead td,
.table th {
    border-top: 0px solid #dee2e6;
}

.form-group .form-control {
    /* background:#1576a788  !important; */
    /* 20190918 add */
    /* border: 1px solid #2198d4 !important; */
    /* color: #fff; */
}
</style>
