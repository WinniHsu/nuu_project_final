<template>
<div class="modal fade" id="EditModal2_RawData" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLongTitle">修改資料</h1>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="input-group mb-3" v-if="selectedDetailData_copy!==null&&item.label!==''" v-for="(item,index) in selectedColumns" :key="index">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">{{item.label}}</span>
                            </div>
                            <input type="text"  class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"  v-model="selectedDetailData_copy[item.name]">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModel()">取消</button>
                    <button type="button" class="btn btn-primary" @click="saveEditedData()">儲存</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import VueBootstrap4Table from 'vue-bootstrap4-table';
import {apiUpdateTableColumns} from '@/apis/rawData.js';
export default {
    name: "EditModal2_RawData",
    components: {
          VueBootstrap4Table,
    },
    props: {
        selectedDetailData:{
            type:Object
        },
        selectedColumns:{
            type:Array
        }
    },
    data() {
        return{
            // 複製一份傳進來的資料
            selectedDetailData_copy:null,
            config: {
                checkbox_rows: true,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
            },
        }
    },
    mounted: function () { 

    },
    computed: {
    },
    methods:{
        // 關掉編輯Modal
        closeModel:function(){
             $('#EditModal2_RawData').modal('hide');
        },
        //儲存編輯後的Modal資料
        saveEditedData:function(){
            this.getUpdateTableColumns();
            $('#EditModal2_RawData').modal('hide');
        },
        sortnum() {
            return function(a,b){
               return parseInt(a.sort) > parseInt(b.sort) ? 1 : -1;
            }
        },
        // 修改單筆資料
        getUpdateTableColumns(){
            apiUpdateTableColumns({
                columnvalue: encodeURIComponent(JSON.stringify(this.selectedDetailData_copy)),
                tableuuid: this.$route.params.uuid,
                valueuuid: this.selectedDetailData_copy.valueuuid,
                id:this.selectedDetailData_copy.id
            }).then((response)=>{
                console.log(response);
                // 1.儲存修改資料
                // 2.重新request欄位資料
                this.$emit("requestdata");
            })
        },

    },
    watch: {
        selectedDetailData:function(){
            this.selectedDetailData_copy=Object.assign({}, this.selectedDetailData);
        }

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
