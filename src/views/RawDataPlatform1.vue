<template>
  <div class="second-home">
    <div class="row p-5" >
        <div class="col-12">
            <vue-bootstrap4-table  :rows="rows" :columns="columns" :config="config" @on-change-query="onChangeQuery" :total-rows="total_rows">
                <template slot="global-search-clear-icon" >
                    <i class="fas fa-times-circle"></i>
                </template>
                <template slot="simple-filter-clear-icon">
                    <i class="fas fa-times-circle"></i>
                </template>
                <template slot="status" slot-scope="props">
                    <div  class="outer-wrapper">
                        <div  class="outer-wrapper">
                            <i class="fas fa-circle text-danger mr-1"></i>
                            <i class="fas fa-circle text-success mr-1"></i>
                            <div  class="inner-wrapper">
                                <div>{{props.row.status.status_name}}</div>
                                <div>{{props.row.status.status_time}}</div>
                            </div>
                        </div>
                    </div>

                </template>
                <template slot="example" slot-scope="props">
                    <button
                        style="white-space:nowrap"
                        type="button"
                        class="btn btn-info"
                        @click="traceDownload(props.row)"
                    >空白格式下載</button>
                </template>
                <template  v-if="$store.state.auth.web_auth!==null&&$store.state.auth.web_auth['原始資料管理']['編輯'].open!==undefined && $store.state.auth.web_auth['原始資料管理']['編輯'].open" slot="edit" slot-scope="props">
                <!-- <template  slot="edit" slot-scope="props" > -->
                    <button
                        style="white-space:nowrap"
                        type="button"
                        class="btn btn-info"
                        :disabled="timeRange(props.row.startdate,props.row.enddate)"
                       
                        @click="traceDetailColumns(props.row)"
                    >編輯</button>
                </template>
                <template v-if="$store.state.auth.web_auth!==null&&$store.state.auth.web_auth['原始資料管理']['修改管理單位'].open!==undefined && $store.state.auth.web_auth['原始資料管理']['修改管理單位'].open" slot="editUnit" slot-scope="props" >
                <!-- <template slot="editUnit" slot-scope="props" > -->
                    <button
                        style="white-space:nowrap"
                        type="button"
                        class="btn btn-info"
                        data-toggle="modal"
                        data-target="#UpdateUnitModal_RawData "
                        @click="traceUnit(props.row)"
                    >修改管理單位</button>
                </template>
                <template v-if="$store.state.auth.web_auth!==null&&$store.state.auth.web_auth['原始資料管理']['編輯開放設定'].open!==undefined && $store.state.auth.web_auth['原始資料管理']['編輯開放設定'].open" slot="schedule" slot-scope="props" >
                <!-- <template  slot="schedule" slot-scope="props" > -->
                    <button
                        style="white-space:nowrap"
                        type="button"
                        class="btn btn-info"
                        data-toggle="modal"
                        data-target="#ScheduleModal_RawData "
                        @click="traceSchedule(props.row)"
                    >編輯開放設定</button>
                </template>
            </vue-bootstrap4-table>
        </div>
        <!-- <edit-modal></edit-modal> -->
        <insert-modal></insert-modal>
        <updateunit-modal :selectedDetailData="selectedDetailData" @changeUnit="getchangeUnit"></updateunit-modal>
        <schedule-modal :selectedDetailData="selectedDetailData" @changeUnit="getchangeUnit"></schedule-modal> 
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import sidebar from '../components/sidebar'
import VueBootstrap4Table from 'vue-bootstrap4-table';
// import EditModal from '../components/EditModal_RawData';
import InsertModal from '../components/InsertModal_RawData'
import UpdateUnitModal from '../components/UpdateUnitModal_RawData'
import ScheduleModal from '../components/ScheduleModal_RawData'
import {apiQueryAllTable} from '@/apis/rawData.js'
import {apiQueryTableColumn} from '@/apis/rawData.js';
import {apiTableDownload} from '@/apis/rawData.js';

export default {
  name: "RawDataPlatform1",
  components: {
     "sidebar":sidebar,
     VueBootstrap4Table,
    //  "edit-modal":EditModal,
     "insert-modal":InsertModal,
     "updateunit-modal":UpdateUnitModal,
     "schedule-modal":ScheduleModal
  },
  props:{
  },
  data: function() {
        return {
            rows: [
                // {
                //     tablecode:'AA',
                // }
             
            ],
            columns:[
                {
                    label: "表單編號",
                    name: "tablecode",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "表單名稱",
                    name: "tablename",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "管理單位",
                    name: "authName",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "最近更新日期",
                    name: "lastchange",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "開放時間",
                    name: "startdate",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "結束時間",
                    name: "enddate",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "",
                    name: "example",
                    slot_name: "example"
                },
                {
                    label: "",
                    name: "edit",
                    slot_name: "edit"
                },
                {
                    label: "",
                    name: "editUnit",
                    slot_name: "editUnit"
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
                global_search: {
                     visibility: false,
                },
                // server_mode:  true,
                server_mode:  false
            },
            selecteduuid:'',
            //紀錄需要修改的單筆資料
            selectedDetailData:{},
            now:null ,
            queryParams:{
                sort: [],
                filters: [],
                global_search: "",
                per_page: 10,
                page: 1
            },
            total_rows:0
            
            
        }
  },
  mounted: function () { 
    this.getQueryAllTable();
    // this.onChangeQuery();
    setInterval(() => {
        this.now=new Date().getTime() 
                    //  回傳目前時間的日期物件
    },1000);
  },
  computed: {
      timeRange(){
        return function (startdate,enddate) {
            if(this.$store.state.auth.tokenInfo.rolename==='倉儲資料管理者'||this.$store.state.auth.tokenInfo.rolename==='系統管理者'){
                // 在區間內
                // console.log(startdate,enddate,"在區間內",'打開')
                return false
            }else if(startdate===null&&enddate===null){
                // console.log(startdate,enddate,"null",'打開')
                return false
            }else if((startdate<this.now)&&(this.now<enddate)){
                return false
            }else{
                 return true
            }

        }
      }
  },
  watch:{
        
 
  },
  methods: {
    onChangeQuery(queryParams) {
        console.log('onChangeQuery>1',queryParams);
        this.queryParams = queryParams;

        this.getQueryAllTable();

    },
    getQueryAllTable(){
         console.log('getQueryAllTable>2');
        apiQueryAllTable({
            // queryParams:this.queryParams
        }).then((response)=>{
            // console.log('apiQueryAllTable----->',response);
            response.data.forEach((item)=>{
                if(item.lastchange!==null){
                    item.lastchange=this.$moment(item.lastchange).format('YYYY-MM-DD');

                }
                if(item.startdate!==null){
                    item.startdate=this.$moment(item.startdate).format('YYYY-MM-DD');

                }
                if(item.enddate!==null){
                    item.enddate=this.$moment(item.enddate).format('YYYY-MM-DD');

                }
                if(item.authName.length>0){
                    // console.log(item)
                    let str=''
                    for(let value of item.authName){
                        // console.log(value)
                        if( item.authName.indexOf(value)===item.authName.length-1){
                            str=str+value
                        }else{
                            str=str+value+','
                        }
                       
                    };
                    console.log(str)
                    item.authName=str;
                }else{
                     item.authName='';
                }
                
              
                
            })
            this.rows=[];
            this.rows=response.data.sort(function(a,b) {
            return a.tablecode > b.tablecode ? 1 : -1;
            });
        })
    },
    sortnum() {
        return function(a,b){
            return parseInt(a.sort) > parseInt(b.sort) ? 1 : -1;
        }
    },
    traceDownload(row){
        // this.init_downloadColumns_params(row.tableuuid,row.tablename,row.fileextension);
        // this.getTableDownload(row.tableuuid,row.tablename,row.fileextension);
        this.getQueryTableColumn(row.tableuuid,row.tablename);
    },
    getTableDownload(tableuuid,tablename,fileextension){
        const fileName=tablename+'.'+fileextension;
        apiTableDownload({
            tableuuid:tableuuid
        }).then((response)=>{
            // console.log(response);
            const url = URL.createObjectURL(new Blob([response.data], {
                    type: 'application/vnd.ms-excel'
            }));
            // console.log(url);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        })
    },
    init_downloadColumns_params:function(tableuuid,tablename,fileextension){
            const fileName=tablename+'.'+fileextension;
            // this.$js.baseURL+ "/api/etlcontroller/export"
            this.$axios.post(this.$js.baseURL+ "/api/rawdataUpload/download",
                            {tableuuid:tableuuid},
                            {responseType: 'blob'})
            .then((response) => {
                const url = URL.createObjectURL(new Blob([response.data], {
                        type: 'application/vnd.ms-excel'
                }));
                console.log(url);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            });
    },
    // 取得該table的欄位
    getQueryTableColumn(tableuuid,tablename){
        apiQueryTableColumn({
            tableuuid:tableuuid
        }).then((response)=>{

            // console.log('getQueryTableColumn----->',response.data.sort(this.sortnum()));
            let arrayList=[];
            for(let item in response.data.sort(this.sortnum())){
                if( response.data.sort(this.sortnum())[item].note!=='指定'){
                     arrayList.push( response.data.sort(this.sortnum())[item].columncname);
                }
              
            };
            // console.log(arrayList);
            
            this.onExportExcel(arrayList,tablename);
            
        })
    },

    getchangepage(value){

    },

    onExportExcel: function(arrayList,tablename) {
            // console.log(arrayList)
                var xls= [
                    arrayList
                    // ["學校代碼","校名","體系","公私立","都會型高中","學校區域","學校縣市","學校市區","詳細地址","緯度","經度"]
                ];
             
                //設定格式
                var sheet = XLSX2.utils.aoa_to_sheet(xls);
                // sheet["!merges"] = []; //宣告需要合併cell
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
                // sheet["!merges"].push(  //合併cell
                //     { s: { c: 0, r: 0 }, //start c=column,r=row
                //     e: { c: 4, r: 0 }  //end
                //     }
                // );
                //console.log(sheet);
                openDownloadDialog(sheet2blob(sheet), tablename+".xlsx");
    },
    // 進入編輯頁面
    traceDetailColumns(value){
        console.log(value)
        this.$router.push({name:'RawDataPlatform-2',params:{uuid:value.tableuuid,tablename:value.tablename}});
    },
    // 抓到改變單位的那筆資料
    traceUnit(value){
            this.selecteduuid=value.tableuuid;
            let value_cpoy=Object.assign({}, value);
            this.selectedDetailData={};
            this.selectedDetailData=value_cpoy;
    },
    traceSchedule(value){
            let value_cpoy=Object.assign({}, value);
            this.selectedDetailData={};
            this.selectedDetailData=value_cpoy;
    },
    // 接收修改單位的資料
    getchangeUnit(){
        this.getQueryAllTable();
        // console.log(unit,id);
        // 重新request API
        // for(let item in this.rows){
        //     if(this.rows[item].id===id){
        //         this.rows[item].unit=unit;
        //     };
        // };
    }

  },

};
</script>
<style scoped>
.second-home{
    width:100%;
    height:80%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
}

.outer-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
