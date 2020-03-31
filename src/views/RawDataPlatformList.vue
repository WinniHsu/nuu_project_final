<template>
  <div class="home">
        <sidebar @changepage="getchangepage" :type="'RawDataPlatformList'" ></sidebar>
        <!-- <div class="row" > -->
            <router-view>
            </router-view>

        <!-- </div> -->
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
export default {
  name: "RawDataPlatform",
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
                {
                    id:'0001',
                    tableName:'學期開課清單',
                    unit:'課務組',
                    datetime:'yyyy/mm/dd-hh:mm',
                },
                {
                    id:'0002',
                    tableName:'學生基本資料',
                    unit:'註冊組',
                    datetime:'yyyy/mm/dd-hh:mm',
                }
            ],
            columns:[
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
                    name: "unit",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "最近更新日期",
                    name: "creationDate",
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
                checkbox_rows: false,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
            },
            selecteduuid:'',
            //紀錄需要修改的單筆資料
            selectedDetailData:{}
        }
  },
  mounted: function () { 
    this.getQueryAllTable();
  },
  computed: {

  },
  watch:{
        
 
  },
  methods: {
    getQueryAllTable(){
        apiQueryAllTable({}).then((response)=>{
            // console.log(response);
            this.rows=[];
            this.rows=response.data;
            // creationDate: null
            // creationUser: null
            // modifyDate: null
            // modifyUser: null
            // version: 1
            // tableuuid: "107D366D-02A7-4EC3-88C4-9A22234C0B56"
            // tablecode: "RAW012F"
            // tablename: "國內交換生"
        })
    },
    getchangepage(value){

    },
    // 進入編輯頁面
    traceDetailColumns(value){
        this.$router.push({name:'RawDataPlatform'});
    },
    // 抓到改變單位的那筆資料
    traceUnit(value){
            this.selecteduuid=value.tableuuid;
            let value_cpoy=Object.assign({}, value);
            this.selectedDetailData={};
            this.selectedDetailData=value_cpoy;
    },
    traceSchedule(value){

    },
    // 接收修改單位的資料
    getchangeUnit(unit,id){
        // console.log(unit,id);
        // 重新request API
        for(let item in this.rows){
            if(this.rows[item].id===id){
                this.rows[item].unit=unit;
            };
        };
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
.outer-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
