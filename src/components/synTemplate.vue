<template>
  <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <upload @requestdata="requestData"></upload>
        <!-- <button type="button" class="btn btn-danger mb-5" @click="show()">刪除學校</button> -->
        <div class="row p-5" v-if="columns.length>0">
                <!-- <button type="button" class="btn btn-success mb-5 mr-3"  data-toggle="modal" data-target="#insertModal" >新增學校</button> -->
                
            
                <vue-bootstrap4-table  :rows="rows" :columns="columns" :config="config" :actions="actions" @add-data="addData"  @downloadPart-data='downloadPartData' @downloadAll-data='downloadAllData' @downloadform='downloadForm'>
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
                        data-toggle="modal"
                        data-target="#myModal"
                        @click="trace(props.row)"
                    >編輯</button>
                    </template>
                    <template slot="delete" slot-scope="props">
                    <button
                        type="button"
                        class="btn btn-danger"
                        @click="traceDelete(props.row)"
                    >刪除</button>
                    </template>
                </vue-bootstrap4-table>

                <detail-modal :tempid="tempID" :choosedData="choosedData" :columns="columns" @sendeditdata='getsendEditData' :params="params"></detail-modal>
                <insert-modal  @sendeditdata='getsendEditData'></insert-modal>
                <!-- <alert-modal></alert-modal> -->
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import VueBootstrap4Table from 'vue-bootstrap4-table';
import detailModal from '../components/detailModal';
import insertModal from '../components/insertModal';
import upload from '../components/upload'
// import alertModal from '../components/alertModal';
export default {
  name: "synTemplate",
  components: {
    // HelloWorld
     VueBootstrap4Table,
     "detail-modal":detailModal,
     "insert-modal":insertModal,
     "upload":upload
    //  "alert-modal":alertModal
  },
  props:{
      columns:{
        type: Array
      },   
      params:{
        //選擇哪張表單的參數
        type:String
      }
  },
  data: function() {
        return {
            // 儲存所有的資料
            rows: [],
            config: {
                checkbox_rows: true,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false
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
                {
                    btn_text: "下載範例資料表",
                    event_name: "downloadform",
                    // event_name: "on-download",
                    class: "btn btn-secondary my-custom-class",
                    event_payload: {
                        msg: "下載範例資料表"
                    }
                }
            ],
            // 選取的資料
            choosedData:{},
            // 主表的key
            tempID:''
        }
  },
  mounted: function () { 
      this.init_queryAllSchool_params(this.params);
  },
  computed: {

  },
  watch:{
        
 
  },
  methods: {
    addData(payload) {
        $('#insertModal').modal('show');     
        // console.log(payload);
    },
    downloadPartData(payload){
        // console.log(payload);
        this.onExportExcel(payload.selectedItems);
    },
    downloadAllData(payload){
        // console.log(payload);
        this.onExportExcel(this.rows);
    },
    downloadForm(payload){
        // console.log(payload);
        var arrayList=[];
        this.onExportExcel(arrayList);
    },
    onExportExcel: function(data) {
            var xls= [
                ["學校同意詞表"],
                ["學校代碼","校名","體系","公私立","都會型高中","學校區域","學校縣市","學校市區","詳細地址","緯度","經度"]
            ];
            let arrayList=['graduateSchoolCode','graduateSchoolName','graduateSchoolSystem','graduateSchoolPublicPrivate',
            'graduateSchoolCityMarked','graduateSchoolRegion','graduateSchoolCity','graduateSchoolDistrict',
            'graduateSchoolAddress','lat','lng']
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
        this.tempID=value.graduateSchoolCode;
        this.choosedData=value;
    },
    traceDelete(value){
        //  console.log(value.graduateSchoolCode);
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
                 this.init_deleteSchoolSynoymMaster_params(value.graduateSchoolCode,this.params);
            }else if(result.dismiss==='cancel'){

            }
           
        });

    },
    // 當詳細資料更新成功後，重新request全部學校資料
    getsendEditData:function(value){
        this.init_queryAllSchool_params(this.params);
    },
    // 上傳資料成功後，request全部學校資料
    requestData(){
        this.init_queryAllSchool_params(this.params);
    },
    //刪除主表學校資料
    init_deleteSchoolSynoymMaster_params:function(schoolCode,SynonymType){
        
        let init_deleteSchoolSynoymMaster_params={url: this.$js.baseURL+"/api/schoolSynony/deleteSchoolSynoymMaster", 
                                        params:{schoolCode:schoolCode,SynonymType:SynonymType},
                                        method:"POST"};

        let _this=this;
        var p=this.$js.ajaxPromise200(init_deleteSchoolSynoymMaster_params).then(function(data) {
                // console.log(data)
                _this.init_queryAllSchool_params(_this.params);
        });
        p.then(()=>{
            this.$swal({
                title: '刪除成功',
                text: "",
                type: 'success'
            })         
        });
    },
    // request全部學校資料
    init_queryAllSchool_params:function(SynonymType){
        
        let init_queryAllSchool_params={url: this.$js.baseURL+"/api/schoolSynony/queryAllSchool", 
                                        params:{SynonymType:SynonymType},
                                        method:"POST"};

        let _this=this;
        var p=this.$js.ajaxPromise200(init_queryAllSchool_params).then(function(data) {
            // console.log(data)
            _this.rows.length=0;
            for(let item in data){
                _this.$set(_this.rows,item,data[item])
            }

        });
        p.then(()=>{
        })
    },



  },

};
</script>
<style scoped>
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
