<template>
<div>
    
    <div class="modal fade bd-example-modal-xl search_model" id="EditModal_RawData" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title" id="exampleModalLongTitle">上傳編輯</h1>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <vue-bootstrap4-table  :rows="selectedRows" :columns="selectedColumns" :config="config" :actions="actions" @add-data="addData" @update-data="updateData">
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
                                        class="btn btn-success"
                                        data-toggle="modal"
                                        data-target="#EditModal2_RawData"
                                        @click="traceEditedData(props.row)"
                                    >編輯</button>
                                </template>
                                <template slot="editUnit" slot-scope="props" >
                                    <button
                                    style="white-space:nowrap"
                                        type="button"
                                        class="btn btn-danger"
                                        @click="traceDelete(props.row)"
                                    >刪除</button>
                                </template>
                            </vue-bootstrap4-table>
                            <!-- <table class="table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th v-for="item in rawData.columnName" scope="col">{{item.name}}</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in rawData.data">
                                        <th scope="row">{{index+1}}</th>
                                        <td  v-for="columns in rawData.columnName"><input  type="text" v-model="item[columns.id]" class="form-control"  placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"></td>
                                        <td><button type="button" class="btn btn-success">修改</button></td>
                                        <td><button type="button" class="btn btn-danger">刪除</button></td>
                                    </tr>
                                </tbody>
                            </table> -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
                    <!-- <button type="button" class="btn btn-secondary" >關閉</button> -->
                </div>
            </div>
        </div>
    </div>
    <editmodal2-rawdata :selectedDetailData="selectedDetailData" :selectedColumns="selectedColumns" @closeSecondModel="getcloseSecondModel"></editmodal2-rawdata>
    <insertmodal-rawdata :selectedColumns="selectedColumns" @closeSecondModel="getcloseSecondModel"></insertmodal-rawdata>
</div>
</template>

<script>
import VueBootstrap4Table from 'vue-bootstrap4-table';
import EditModal2_RawData from '../components/EditModal2_RawData';
import InsertModal_RawData from '../components/InsertModal_RawData';
export default {
    name: "EditModal_RawData",
    components: {
        VueBootstrap4Table,
        "editmodal2-rawdata":EditModal2_RawData,
        "insertmodal-rawdata":InsertModal_RawData
    },
    props: {

    },
    data() {
        return{
            selectedRows:[
                {id:'0001',year:'106',semester:'1',courseID:'1234567',courseName:'網頁程式設計(I)'},
                {id:'0002',year:'106',semester:'2',courseID:'3453453',courseName:'網頁程式設計(II)'},
            ],
            selectedColumns:[
                {
                    label: "學年度",
                    name: "year",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "學期",
                    name: "semester",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "課程代號",
                    name: "courseID",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "課程名稱",
                    slot_name:"courseName",
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
                    name: "editUnit",
                    slot_name: "editUnit"
                },
            ],
            config: {
                checkbox_rows: true,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
            },
            actions: [
            {
                btn_text: "新增",
                event_name: "add-data",
                class: "btn btn-info my-custom-class ",
                event_payload: {
                    msg: "新增"
                }
            },
            {
                btn_text: "匯入Excel",
                event_name: "update-data",
                class: "btn btn-secondary my-custom-class ",
                event_payload: {
                    msg: "匯入Excel"
                }
            }],
            selectedDetailData:{}
        }
    },
    mounted: function () { 

    },
    computed: {
    },
    methods:{
        // 紀錄選擇的那筆資料
        traceEditedData:function(value){
            $('#EditModal_RawData').modal('hide');
            // console.log(value);
            this.selectedDetailData={};
            this.selectedDetailData=value;
        },
        // 關掉第二層的Model，顯示第一層
        getcloseSecondModel:function(){
            $('#EditModal_RawData').modal('show');
        },
        traceDelete:function(value){
            // Call 刪除API
        },
        addData(payload) {
            $('#InsertModal_RawData').modal('show');
             $('#EditModal_RawData').modal('hide');     
        // console.log(payload);
        },
        updateData(payload){

        }

    },
    watch: {


    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add_describe{
    font-weight:600;
}
.syn_wrapper{
    height:100vh;
    overflow-y: scroll;
}
.modify_wrapper{
    height:100%;
    width:100%;
    display: flex;
    flex:1;
    justify-content: center;
    align-items: center;
}
.text-des{
   font-family: "Microsoft JhengHei";
}
.modify_btn{
    color: #FFF;
    height: 30px;
    text-align: center;
    padding: 3px;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(46, 164, 219);
    transition: all .2s ease-in-out;
}

.modify_btn:hover{
    transform: scale(1.05);
}
/* .fa-plus{
    background: cadetblue;
   
} */
.fa-minus{
    background: rgb(219, 62, 34);  
}
.fa-plus{
    background: cadetblue;
}
.modify_btn_change {
    color: #FFF;
    height: 30px;
    text-align: center;
    padding: 3px;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .2s ease-in-out;
    background: cadetblue;
}
</style>
