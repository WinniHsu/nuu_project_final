<template>
<div class="modal fade bd-example-modal-lg search_model" id="exportAuth" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLongTitle">倉儲資料管理-匯出權限</h1>
            </div>
            <div class="modal-body">
                 <div class="container-fluid">
                    <div class="row outer-wrapper">
                        <div class="outer-wrapper2 mb-3">
                            <select class="form-control mr-2" style="flex:3" id="exampleFormControlSelect1" @change="changeAuthGroup">
                                <option v-if="authGroup.length>0 " v-for="(auth,index) in authGroup" :key="index" >{{auth}}</option>
                
                            </select>
                             <!-- <button style="flex:1" type="button" class="btn btn-success" @click="updateAuthGroup()">更新</button> -->
                        </div>
                       
                        <table class="table">
                            <tbody>
                                <tr v-for="row in this.rows" :key='row.id'>
                                    <th scope="row">{{row.columngroup}}</th>
                                    <td :class="[row.etlauth!=='0'?'style-color':'']"><i class="fas fa-eye" @click="changeAuth(row.id,'0')"></i></td>
                                    <td :class="[row.etlauth!=='1'?'style-color':'']"><i class="fas fa-eye-slash" @click="changeAuth(row.id,'1')"></i></td>
                                    <td :class="[row.etlauth!=='2'?'style-color':'']"><i class="fas fa-times" @click="changeAuth(row.id,'2')"></i></td>
                                </tr>
                             
                            </tbody>
                        </table>

                      
                       
                    </div>
                     
                </div>

            </div>
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import {apiFindUnit} from '@/apis/adminGroup';
import {apiQueryAuthGroup}  from '@/apis/etl';
import {apiUpdateAuthGroup} from '@/apis/etl';
import VueBootstrap4Table from 'vue-bootstrap4-table';
// import exportModal from '../components/exportModal';
export default {
    name: "exportAuth",
    components: {
         VueBootstrap4Table,
        // "export-modal":exportModal
    },
    props: {
        tableName:{
            type:String
        },
        id:{
            type:Number
        }
    },
    data() {
        return{
            authGroup:[],
            currentAuthGroup:'',
            rows_copy:[],
            rows: [
                {
                    creationDate: null,
                    creationUser: null,
                    modifyDate: null,
                    modifyUser: null,
                    version: 0,
                    id: 7,
                    tablename: "學生學籍維度",
                    authName: "Test1",
                    columngroup: "個人資料",
                    etlauth: "2"
                }
            ],
        }
    },
    mounted: function () { 
        this.getFindUnit();
    },
    computed: {

    },
    methods:{
        // 單位變動
        changeAuthGroup(e){
            this.currentAuthGroup=e.target.value;
            this.getQueryAuthGroup();
        },
        // 權限變動
        changeAuth(id,type){
            var updateData = new Promise((resolve, reject)=>{
                for(let item in this.rows){
                    if(this.rows[item].id===id){   
                        this.rows[item].etlauth=type;
                    }
                };
                 resolve();
            })
            updateData.then((res)=>{
                 this.getUpdateAuthGroup();
            })
           

        },
        getUpdateAuthGroup(){
            apiUpdateAuthGroup(
                this.rows
            ).then((response)=>{
                console.log(response);
                if(response.status===200){
                    this.getQueryAuthGroup();
                }
            });
            
        },
        // 確定更新資料
        updateAuthGroup(){
            this.getUpdateAuthGroup();
        },
        // 查找所有單位
        getFindUnit(){
            apiFindUnit({})
            .then((response)=>{
                this.authGroup=[];
                for(let item in response.data){
                    this.authGroup.push(response.data[item].authName);
                }
            })
            .then(()=>{
                this.currentAuthGroup=this.authGroup[0];
            })
            .then(()=>{
                this.getQueryAuthGroup();
            })
        },
        // 查找特定單位權限
        getQueryAuthGroup(){
            apiQueryAuthGroup({
                authName:this.currentAuthGroup,
                tablename:this.tableName
            }).then((response)=>{
                this.rows=[];
                this.rows=response.data;
                this.rows_copy=[];
                this.rows_copy=  JSON.parse(JSON.stringify(this.rows));

              
                console.log(response);
            })
        },
   

    },
    watch: {
        tableName:function(val){
            // console.log("AA")
             this.getFindUnit();
            // this.init_export_params(this.tableName)
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
.outer-wrapper2{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.style-color{
    color:rgb(184, 177, 177);
}
</style>
