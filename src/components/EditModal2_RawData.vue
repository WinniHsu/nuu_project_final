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
                        <div class="input-group mb-3" v-if="selectedDetailData_copy!==null && item.label!==''" v-for="(item,index) in selectedColumns" :key="index">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">{{item.label}}</span>
                            </div>
                            <input v-if="item.datatype!==undefined&&item.datatype!=='DATE'" type="text"  class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"  v-model="selectedDetailData_copy[item.name]">
                            <date-range-picker v-if="item.datatype!==undefined&&item.datatype==='DATE'"
                                        ref="picker"
                                        :locale-data="localeData"
                                        v-model="selectedDetailData_copy[item.name]"
                                        
                                        :singleDatePicker="singleDatePicker" 
                                        :timePicker="timePicker"
                                        :ranges='false'
                                        :autoApply="true"
                                        :linkedCalendars="true"
                                        @update="updateValues"
                                    >

                                    <template v-slot:input="picker" style="min-width: 600px;">
                                        <span v-if="picker.startDate">{{ $moment(picker.startDate).format('YYYY-MM-DD')  }}</span>
                                        <span v-if="!picker.startDate">請選擇日期</span> 
                                    </template>
                            </date-range-picker>
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
import DateRangePicker from 'vue2-daterange-picker'
export default {
    name: "EditModal2_RawData",
    components: {
          VueBootstrap4Table,
          DateRangePicker
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
            localeData:{
                direction: 'ltr',
                format: 'mm/dd/yyyy',
                separator: ' - ',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                firstDay: 0
            },
            singleDatePicker:true,
            timePicker:false,
            dateRange:{
                startDate: null,
                endDate: null
            },
        }
    },
    mounted: function () { 

    },
    computed: {
    },
    methods:{
         updateValues(json){
            console.log(json)
            // let startDate=this.$moment(json.startDate).format('MM-DD-YYYY');
            // this.dateRange.startDate=startDate;
            // console.log(startDate);
        },
        // 關掉編輯Modal
        closeModel:function(){
             $('#EditModal2_RawData').modal('hide');
        },
        //儲存編輯後的Modal資料
        saveEditedData:function(){
            let sendParams={}
            for(let item2 of this.selectedColumns){
                if(item2.label!==''&&item2.datatype!=='DATE'){
                    this.$set(sendParams,item2.name,this.selectedDetailData_copy[item2.name]);
                }else if(item2.datatype==='DATE'){
                    this.$set(sendParams,item2.name,this.selectedDetailData_copy[item2.name].startDate!==''?this.$moment(this.selectedDetailData_copy[item2.name].startDate).format('YYYY-MM-DD'):'' );
                }
            }
            console.log('sendParams----->',sendParams)
            this.getUpdateTableColumns(sendParams);
            $('#EditModal2_RawData').modal('hide');
        },
        sortnum() {
            return function(a,b){
               return parseInt(a.sort) > parseInt(b.sort) ? 1 : -1;
            }
        },
        // 修改單筆資料
        getUpdateTableColumns(sendParams){
            apiUpdateTableColumns({
                // columnvalue: encodeURIComponent(JSON.stringify(this.selectedDetailData_copy)),
                columnvalue: encodeURIComponent(JSON.stringify(sendParams)),
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
            
                for(let item2 of this.selectedColumns){
                   
                    if(item2.datatype!==undefined&&item2.datatype==='DATE'){
                         console.log(this.selectedDetailData_copy[item2.name])
                        let obj={
                            endDate:this.selectedDetailData_copy[item2.name],
                            startDate:this.selectedDetailData_copy[item2.name]
                        }
                        // console.log(this.selectedDetailData_copy[item2])
                       this.$set(this.selectedDetailData_copy,item2.name,obj)
      
                    }

                }
       
//      endDate:Thu Mar 19 2020 12:00:00 GMT+0800 (台北標準時間)
// startDate:
            
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
