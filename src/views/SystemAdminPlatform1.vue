<template>
  <div class="second-home">
    
    <div class="row p-5" >
        <div class="col-12">
            <div class="title mb-3">
                帳號管理
                <button type="button" class="btn btn-primary mx-2"  @click="addData()">新增</button>
            </div>
            <!-- <div class="title  mb-3">
                <button type="button" class="btn btn-primary mr-2"  @click="BackToRawDataPlatformList()"><i class="fas fa-arrow-left mr-3"></i>BACK</button>
                原始資料管理 - {{$route.params.tablename}}

            </div> -->



            <vue-bootstrap4-table  :rows="rows" :columns="columns" :config="config" >
                <!-- :actions="actions"  @add-data="addData" -->
                <template slot="global-search-clear-icon" >
                    <i class="fas fa-times-circle"></i>
                </template>
                <template slot="simple-filter-clear-icon">
                    <i class="fas fa-times-circle"></i>
                </template>

                <template slot="edit" slot-scope="props">
                    <button
                        style="white-space:nowrap"
                        type="button"
                        class="btn btn-info"
                        data-toggle="modal"
                        data-target="#UpdateUnitModal_SysyemAdmin"
                        @click="traceDetailData(props.row)"
                    >修改</button>
                </template>
                <template slot="delete" slot-scope="props" >
                    <button
                        style="white-space:nowrap"
                        type="button"
                        class="btn btn-info"
                        data-toggle="modal"
                        data-target="#ScheduleModal_RawData "
                        @click="traceDelete(props.row)"
                    >移除</button>
                </template>
            </vue-bootstrap4-table>
        </div>
        <insertModal-SystemAdmin @recallUserList="getrecallUserList"></insertModal-SystemAdmin>
        <updateModal-SystemAdmin :selectedDetailData="selectedDetailData" @updatedata="getrecallUserList"></updateModal-SystemAdmin>
    </div>
  </div>
</template>

<script>
import VueBootstrap4Table from 'vue-bootstrap4-table';
import insertModal_SystemAdmin from '../components/insertModal_SystemAdmin'
import updateModal_SystemAdmin from '../components/UpdateUnitModal_SystemAdmin'
import {apiFindUser} from '@/apis/adminUser.js'
import {apiDeleteUser} from '@/apis/adminUser.js'

export default {
  name: "SystemAdminPlatform1",
  components: {
        VueBootstrap4Table,
        'insertModal-SystemAdmin':insertModal_SystemAdmin,
        'updateModal-SystemAdmin':updateModal_SystemAdmin
  },
  props:{
  },
  data: function() {
        return {
            rows: [
                // {
                //     roleName:'系統管理',
                //     userAccount:'admin',
                //     userName:'admin',
                // },
                // {
                //     roleName:'倉儲管理',
                //     userAccount:'wing',
                //     userName:'admin',
                // },
                // {
                //     roleName:'註冊組',
                //     userAccount:'jason',
                //     userName:'招聯窗口',
                // },
                // {
                //     roleName:'語文中心',
                //     userAccount:'mark',
                //     userName:'畢業門檻負責人',
                // }
            ],
            columns:[
                {
                    label: "單位名稱",
                    name: "role",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "用戶帳號",
                    name: "account",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "用戶名稱",
                    name: "name",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "",
                    name: "edit",
                    slot_name: "edit"
                },
                {
                    label: "",
                    name: "delete",
                    slot_name: "delete"
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
            },
            actions:[
                {
                    btn_text: "新增",
                    event_name: "add-data",
                    // event_name: "on-download",
                    class: "btn btn-info my-custom-class ",
                    event_payload: {
                        msg: "新增"
                    }
                }
            ],
            selectedDetailData:{}
        }
  },
  mounted: function () { 
    this.getFindUser();
  },
  computed: {

  },
  watch:{
        
 
  },
  methods: {
    //查詢使用者列表
    getFindUser(){
        apiFindUser({}).then((response)=>{
            console.log("apiFindUser",response);
            this.rows=[];

         
            // this.rows=response.data;
            // 先把'系統管理者','倉儲資料管理者'排前面


            response.data.sort(function(a,b){
                var value1 = a.role,
                    value2 = b.role;
                    // account
                if(value1 === value2){
                    return b.account.localeCompare(a.account,"zh-Hant");
                }
                return a.role.localeCompare(b.role,"zh-Hant");
            });
            for(let item of response.data) {
                if(item.role!=='倉儲資料管理者'&&item.role!=='系統管理者'){
                    this.rows.push(item)
                }
            }
            for(let item of response.data) {
                if(item.role==='倉儲資料管理者'){
                    this.rows.unshift(item)
                }
            }
            for(let item of response.data) {
                if(item.role==='系統管理者'){
                    this.rows.unshift(item)
                }
            }

            // this.rows=response.data;

        })
    },
    // 刪除使用者
    getDeleteUser(obj){
        apiDeleteUser({
            creationDate: obj.creationDate,
            creationUser: obj.creationUser,
            modifyDate: obj.modifyDate,
            modifyUser: obj.modifyUser,
            version: obj.version,
            usersSeq: obj.usersSeq,
            account: obj.account,
            name: obj.name,
            department: obj.department,
            role: obj.role,
            email: obj.email,
            status: obj.status,
        }).then((response)=>{
            if(response.status===200){
                this.$swal({
                    title: '刪除成功',
                    text: "",
                    type: 'success',
                })
                .then((result)=>{   
                    if(result.value){
                        this.getFindUser();
                    }
                });
            }else{
                this.$swal({
                    title: '刪除失敗',
                    text: "",
                    type: 'success',
                })
            }
            
        })
    },
    // reload所有資料
    getrecallUserList(){
       this.getFindUser();
    },
    // 新增資料啟動modal
    addData(payload){
        $('#insertModal_SystemAdmin').modal('show');
    },
    // 偵測點擊哪筆
    traceDetailData(value){
        this.selectedDetailData={};
        this.selectedDetailData=value;
    },
    traceDelete(value){
        this.getDeleteUser(value);
    },
    getchangepage(value){

    },

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
.title{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-size: 1.3rem;
    font-weight: 900;
}
</style>
