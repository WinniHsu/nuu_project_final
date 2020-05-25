<template>
  <div class="home">
        <loading v-if="loadingShow"></loading>
        <sidebar @changepage="getchangepage" :type="'ETLPlatform'"></sidebar>
        <div class="second-home">
            <div class="row p-5" >
                <div class="col-12">
                    <vue-bootstrap4-table  :rows="rows" :columns="columns" :config="config" >
                        <template slot="global-search-clear-icon" >
                            <i class="fas fa-times-circle"></i>
                        </template>
                        <template slot="simple-filter-clear-icon">
                            <i class="fas fa-times-circle"></i>
                        </template>
                        <template slot="status" slot-scope="props">
                            <div  class="outer-wrapper">
                                <div  class="outer-wrapper">
                                    <i v-if="props.row.status.status=='清洗程式啟動中'" class="fas fa-circle text-danger mr-1"></i>
                                    <i v-if="props.row.status.status=='清洗完成'" class="fas fa-circle text-success mr-1"></i>
                                    <div  class="inner-wrapper">
                                        <div>{{props.row.status.status}}</div>
                                        <div>{{props.row.status.lastdate}}</div>
                                    </div>
                                </div>
                            </div>

                        </template>
                        <template v-if="$store.state.auth.web_auth!==null&&$store.state.auth.web_auth['倉儲資料管理']['執行清洗程式'].open!==undefined && $store.state.auth.web_auth['倉儲資料管理']['執行清洗程式'].open" slot="clear" slot-scope="props">
                        <!-- <template  slot="clear" slot-scope="props"> -->
                            <!-- v-if="$store.state.auth.web_auth['倉儲資料管理']['執行清洗程式'].open!==undefined && $store.state.auth.web_auth['倉儲資料管理']['執行清洗程式'].open" -->
                            <button 
                                style="white-space:nowrap"
                                type="button"
                                :class="['btn',props.row.button===true?' btn-secondary':'btn-info']"
                                data-toggle="modal"
                                data-target="#myModal"
                                :disabled="props.row.button"
                                @click="startClear(props.row)"
                            >執行清洗程式</button>
                        </template>
                        <template slot="export-data" slot-scope="props">
                            <button
                                style="white-space:nowrap"
                                type="button"
                                class="btn btn-success"
                                data-toggle="modal"
                                data-target="#exportModal"
                                @click="traceExport(props.row)"
                            >匯出資料</button>
                        </template>
                        <template v-if="$store.state.auth.web_auth!==null&&$store.state.auth.web_auth['倉儲資料管理']['匯出權限編輯'].open!==undefined && $store.state.auth.web_auth['倉儲資料管理']['匯出權限編輯'].open" slot="export-auth" slot-scope="props">
                        <!-- <template  slot="export-auth" slot-scope="props"> -->
                            <!-- v-if="$store.state.auth.web_auth['倉儲資料管理']['匯出權限編輯'].open!==undefined && $store.state.auth.web_auth['倉儲資料管理']['匯出權限編輯'].open" -->
                            <button
                                style="white-space:nowrap"
                                type="button"
                                class="btn btn-success"
                                data-toggle="modal"
                                data-target="#exportAuth"
                                @click="traceExportAuth(props.row)"
                            >匯出權限編輯</button>
                        </template>
                        <template v-if="$store.state.auth.web_auth!==null&&$store.state.auth.web_auth['倉儲資料管理']['排程與通知設定'].open!==undefined && $store.state.auth.web_auth['倉儲資料管理']['排程與通知設定'].open" slot="schedule" slot-scope="props" >
                        <!-- <template  slot="schedule" slot-scope="props" > -->
                            <!-- v-if="$store.state.auth.web_auth['倉儲資料管理']['排程與通知設定'].open!==undefined && $store.state.auth.web_auth['倉儲資料管理']['排程與通知設定'].open" -->
                            <button
                                style="white-space:nowrap"
                                type="button"
                                class="btn btn-danger"
                                 data-toggle="modal"
                                data-target="#ETLSchedule"
                                :disabled='props.row.status.status=="清洗程式啟動中"'
                                @click="traceETLSchedule(props.row)"
                            >排程與通知設定</button>
                        </template>
                    </vue-bootstrap4-table>
                </div>
                <export-modal :tableName="tableName" :tableengname="tableengname"></export-modal>
                <export-auth :tableName="tableName" :id="id"></export-auth>
                <etl-schedule :selectedData="selectedData" :selectedData_original="selectedData_original" @getAllData="getAllData"></etl-schedule>
            </div>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import sidebar from '../components/sidebar'
import VueBootstrap4Table from 'vue-bootstrap4-table';
import exportModal from '../components/exportModal';
import exportAuth from '../components/exportAuth';
import loading from '../components/loading';
import ETLSchedule from '../components/ETLschedule';
import {apiQueryAllTable} from '@/apis/etl';
import {dataclean} from '@/apis/etl';
import {apiDataclean} from '@/apis/etl';
export default {
  name: "ETLPlatform",
  components: {
    "sidebar":sidebar,
    VueBootstrap4Table,
    "export-modal":exportModal,
    "export-auth":exportAuth,
    "loading":loading,
    'etl-schedule':ETLSchedule
  },
  props:{
  },
  data: function() {
        return {
            loadingShow:false,
            tableName:'',
            tableengname:'',
            id:0,
            selectedData:{},
            selectedData_original:[],
            rows: [
                // {
                //     tableName:'課程學期資料',
                //     tabletype:'課程',
                //     status:{
                //         "status": "清洗程式啟動中...",
                //         "lastdate": "yyyy/mm/dd hh:mm:ss"
                //     },
                //     count:'12,345',

                // },
                // {
                //     tableName:'課程學期資料',
                //     tabletype:'課程',
                //     status:{
                //         "status": "清洗程式啟動中...",
                //         "lastdate": "yyyy/mm/dd hh:mm:ss"
                //     },
                //     count:'12,345',

                // }
            ],
            rows_original:[],
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
                // {
                //     label: "類型",
                //     name: "tabletype",
                //     filter: {
                //         type: "simple",
                //         placeholder: ""
                //     },
                //     sort: true,
                // },
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
                    name: "export-data",
                    slot_name: "export-data"
                },
                {
                    label: "",
                    name: "export-auth",
                    slot_name: "export-auth"
                },
                {
                    label: "",
                    name: "schedule",
                    slot_name: "schedule"
                }
            ],
            config: {
                checkbox_rows: false,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
                global_search: {
                     visibility: false,
                }
                // card_title: "Vue Bootsrap 4 advanced table"
            },
        }
  },
  mounted: function () { 
    this.getQueryAllTabl();
    this.connect();
    

  },
  computed: {

  },
  watch:{
        
 
  },
  methods: {
    getAllData(){
        this.getQueryAllTabl();
    },
    getQueryAllTabl(){
        apiQueryAllTable({}).then((response)=>{
            console.log('apiQueryAllTable--->',response);

            this.rows.length=0;
            this.rows_original.length=0;
            var dataList=response.data.map((item)=>{
                var obj={
                    tableName:'',
                    tableengname:'',
                    tabletype:'',
                    status:{
                        "status":"",
                        "lastdate": ""
                    },
                    count:'',
                    id:0,
                    cleanyn: "",//執行清洗日是否勾選
                    cleandatefirst: null, //起始日期
                    redaytype: "", //單位
                    reday: 0, //頻率
                    endsend: "" //結束提醒

                }


                obj.tableName=item.tablename;
                obj.tabletype=item.tabletype;
                obj.count=this.toCurrency(item.tablecount);
                obj.id=item.id;
                obj.status.status="清洗完成";
                // obj.status.status=item.status;
                // obj.status.lastdate=item.cleandatefirst;
                obj.status.lastdate='最後更新日期:'+this.$moment(item.cleandatecal).format('YYYY-MM-DD h:mm:ss a');
                obj.cleanyn=item.cleanyn;
                obj.cleandatefirst=item.cleandatefirst;
                obj.redaytype=item.redaytype;
                obj.reday=item.reday;
                obj.endsend=item.endsend;
                obj.tableengname=item.tableengname;
                return obj
            });
            // PM說要照這個順序
            const sortBy=['學生學籍資料','學生學期資料','學生課程資料','課程列表與核心能力','學生運動競賽清單'];
            const customSort = ({ data, sortBy, sortField }) => {
                const sortByObject = sortBy.reduce(
                    (obj, item, index) => ({
                    ...obj,
                    [item]: index
                    }),
                    {}
                );
                return data.sort(
                    (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
                );
            };

            const tasksWithDefault = dataList.map(item => ({
            ...item,
            sortStatus: sortBy.includes(item.tableName) ? item.tableName : "other"
            }));
       
            let dataList2=customSort({
                data: tasksWithDefault,
                sortBy: [...sortBy, "other"],
                sortField: "tableName"
            })
            this.rows=dataList2;
            this.rows_original=response.data;
        })
    },
    toCurrency(num){
        var parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    },
    getchangepage(value){

    },
    startClear(value){
         this.$swal({
                title: '執行資料清洗',
                text: "執行資料清洗可能耗費大量時間，清洗過程畫面將被凍結，是否決定執行資料清洗程式?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '取消',
                confirmButtonText: '確認'
        }) .then((result)=>{
            if(result.value){
                this.connect().then((res)=>{
                    this.ajax(value.tableName);
                }); 
            }
        });
       
    },
    connect() {
        return  new Promise((resolve, reject)=>{
            this.loadingShow=true;
            let _this = this;
            let stompClient = null;
            this.socket = new SockJS("http://203.64.173.63:9019/api/etlcontroller");//如果前後端分離專案需要拼接具體地址，前後端分離index.html可放在
            // http://bigdata02.leadtek.com.tw:9019/api/etlcontroller
            stompClient = Stomp.over(this.socket);
            stompClient.connect({}, function (frame) {
                console.log('frame-------->',frame);
                //  stompClient.subscribe('/topic/ip', function (body) {
                stompClient.subscribe('/topic/db', function (body) {
                    _this.loadingShow=false;
                    console.log('subscribe-------->',JSON.parse(body.body));
                    let bodyJSON=JSON.parse(body.body);
                    //先去掃描回傳過來的訊息，確認哪個table在執行ETL
                    let clearingNowTableName='';
                    let tableCount=0;
                    for(let value in bodyJSON){
                        if(bodyJSON[value].status===1){
                            clearingNowTableName=bodyJSON[value].tablename;
                            tableCount=bodyJSON[value].tablecount;
                            break;
                        }
                    };
                    // console.log(clearingNowTableName);

                     for(let item in _this.rows){
                        if(clearingNowTableName.length>0){
                            _this.rows[item].button=true;
                        }else{
                            _this.rows[item].button=false;
                        };

                        if(_this.rows[item].tableName === clearingNowTableName){
                            _this.rows[item].status.status='清洗程式啟動中';
                            // _this.rows[item].count=tableCount;
                        }else{
                            _this.rows[item].status.status='清洗完成';
                            //  _this.rows[item].count=tableCount;
                        };
                        if(_this.rows[item].tableName === clearingNowTableName){
                            _this.rows[item].count=tableCount;
                        };
                     };

                    // if(clearingNowTableName.length>0){
                    //     let item = _this.rows.find((item)=>{
                    //         return item.tableName === clearingNowTableName;
                    //     });
                    //     item.status.status='清洗程式啟動中';
                    // }

                    // for(let item in _this.rows){
                    //     // 正在執行ETL的table status要修改狀態，
                    //     if(_this.rows[item].tableName===clearingNowTableName ){
                    //         _this.rows[item].status.status='清洗程式啟動中';
                    //         // for(let item2 in _this.rows){
                    //         //     _this.rows[item2].button=true;
                    //         // }
                    //         break;
                    //     }else{
                    //         _this.rows[item].status.status='清洗完成';
                    //         // for(let item2 in _this.rows){
                    //         //     _this.rows[item2].button=false;
                    //         // }
                    //     }   
                        
                    // };   
                });
                resolve("connect over");
            });
        })
    },
    ajax(tableName) {
            apiDataclean({},tableName).then((result)=>{
                        console.log('post------->',result);
            })
            // this.$axios.post('http://203.64.173.63:9019/api/etlcontroller/dataclean/'+tableName)
            // // http://203.64.173.63:9019/api/etlcontroller
            // // this.$js.baseURL+"/api/etlcontroller/dataclean/"
            //             .then((result)=>{
            //                 console.log('post------->',result);
            // });
    },
    traceExport(value){
        // console.log("AA",value.tableengname);
        this.tableName=value.tableName;
        this.tableengname=value.tableengname;
        // this.init_export_params(value.tableName);
    },
    traceExportAuth(value){
        console.log(value);
        this.tableName=value.tableName;
        this.id=value.id;
    },
    traceETLSchedule(value){
        this.selectedData=value;
        this.selectedData_original=this.rows_original.filter((item)=>{
            return item.id===value.id
        })

    }


  },

};
</script>
<style scoped>
.home{
    height:100vh;
    width:100vw;
    /* overflow-y: scroll; */
}
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
