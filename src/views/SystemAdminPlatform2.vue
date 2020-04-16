<template>
  <div class="second-home">
    <div class="row p-5" >
        <div class="col-12">
            <div class="title mb-3">
            單位管理
            <button type="button" class="btn btn-primary mx-2"  @click="addData()">新增</button>
            </div>
            <vue-bootstrap4-table  :rows="rows.sort()" :columns="columns" :config="config" >
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
                        data-target="#insertModal_SystemAdmin2"
                        v-text="props.row.authName==='倉儲資料管理者'||props.row.authName==='系統管理者'?'瀏覽':'修改'"
                        @click="traceDetailData(props.row)"
                    ></button>
                </template>
                
                <template slot="delete" slot-scope="props" >
                    <button 
                        v-if="props.row.authName!=='倉儲資料管理者'&&props.row.authName!=='系統管理者'"
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
        <insertModal-SystemAdmin2 @updatedata="getUpdatedata" :modeltype="modeltype" :checkOption="checkOption"></insertModal-SystemAdmin2>
    </div>
  </div>
</template>

<script>
import VueBootstrap4Table from 'vue-bootstrap4-table';
import insertModalSystemAdmin2 from '../components/insertModal_SystemAdmin2';
import {apiFindUnit} from '@/apis/adminGroup.js';
import {apiFindOneUnitAuth} from '@/apis/adminGroup.js';
import {apiDeleteRole} from '@/apis/adminGroup.js';
export default {
  name: "RawDataPlatform1",
  components: {
       VueBootstrap4Table,
       "insertModal-SystemAdmin2":insertModalSystemAdmin2
  },
  props:{
  },
  data: function() {
        return {
            rows: [],
            columns:[
                {
                    label: "單位名稱",
                    name: "authName",
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
            // actions:[
            //     {
            //         btn_text: "新增",
            //         event_name: "add-data",
            //         // event_name: "on-download",
            //         class: "btn btn-info my-custom-class ",
            //         event_payload: {
            //             msg: "新增"
            //         }
            //     }
            // ],
            modeltype:'',
            checkOption:{
              authName:'',
              auth:[],
              code:null,
              version:null
            }
        }
  },
  mounted: function () { 
    this.getFindUnit();
  },
  computed: {

  },
  watch:{
        
 
  },
  methods: {
    getFindUnit(){
      apiFindUnit({}).then((response)=>{
        console.log('getFindUnit---->',response.data);
        this.rows=[];
        for(let item of response.data){
          if(item.authName==='系統管理者'||item.authName==='倉儲資料管理者'){
            this.rows.unshift(item)
          }else{
            this.rows.push(item)
          }

        }
        // this.rows=response.data;
        // this.rows.unshift(
        //   {
        //         creationDate:null,
        //         creationUser: null,
        //         modifyDate: null,
        //         modifyUser: null,
        //         version: 0,
        //         code: 10000,
        //         authName: "倉儲資料管理者",
        //         auth:['1','2','3','4','5','6','7','8','9','10','11','12'],
  
        //   }
        // );
        
        // this.rows.unshift(
        //   {
        //         creationDate:null,
        //         creationUser: null,
        //         modifyDate: null,
        //         modifyUser: null,
        //         version: 0,
        //         code: 10000,
        //         authName: "系統管理者",
        //         auth:['1','2','3','4','5','6','7','8','9','10','11','12'],
  
        //   }
        // )


      })
    },
    // 新增資料啟動modal
    addData(payload){
        $('#insertModal_SystemAdmin2').modal('show');
        this.modeltype='insert';
    },
    //刪除group
    getDeleteRole(code,version){
        apiDeleteRole({
          code:code,
          version:version
        }).then((response)=>{
          // console.log(response);
              this.$swal({
                          title: '刪除成功',
                          text: "",
                          type: 'success',
                      })
                      .then((result)=>{   
                        if(result.value){
                            this.getFindUnit();
                        }
   
              });
 
        })
    },
    getUpdatedata(){
      this.getFindUnit();
    },
    getFindOneUnitAuth(code){

      apiFindOneUnitAuth({
        code:code
      }).then((response)=>{
        console.log('getFindOneUnitAuth----->',response);
        this.checkOption.authName=response.data[0].authName;
        this.checkOption.auth=response.data[0].auth;
        this.checkOption.code=response.data[0].code;
        this.checkOption.version=response.data[0].version;
      })
    },
    traceDelete(vlaue){
      this.getDeleteRole(vlaue.code,vlaue.version)
    },
    // 偵測點選哪一筆
    traceDetailData(vlaue){
      console.log(vlaue)
     
      if(vlaue.authName==="倉儲資料管理者"){
        this.checkOption.authName='倉儲資料管理者';
        this.checkOption.auth=['1','2','3','4','5','6','7','8','9','10','11','12'];
        this.checkOption.code=0;
        this.checkOption.version=0;
      }else if(vlaue.authName==="系統管理者"){
        this.checkOption.authName='系統管理者';
        this.checkOption.auth=['1','2','3','4','5','6','7','8','9','10','11','12'];
        this.checkOption.code=0;
        this.checkOption.version=0;
      }else{
         this.getFindOneUnitAuth(vlaue.code);
      }
      this.modeltype='update';
      // console.log(vlaue.code)
        // 取得該單位權限
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
.title{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-size: 1.3rem;
    font-weight: 900;
}
</style>
