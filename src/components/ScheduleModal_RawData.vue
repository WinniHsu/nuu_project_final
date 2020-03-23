<template>
<div class="modal fade  bd-example-modal-lgl" id="ScheduleModal_RawData" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLongTitle">排程與通知設定</h1>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form>
                        <fieldset class="form-group">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check mb-2" disabled>
                                        <!-- 20200318改為複選 -->
 

                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1"   v-model="selectedData_copy.ischange" true-value="1" false-value="0">
                                        <!-- v-model="selectedData_copy.ischange" -->
                                        <!-- <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" v-model="radioGroup1" checked> -->
                                        <label class="form-check-label" for="inlineCheckbox1">
                                            表單異動時發送通知給倉儲管理者
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <!-- 20200318改為複選 -->
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2"  v-model="selectedData_copy.startupload" true-value="1" false-value="0">
                                        <!-- v-model="selectedData_copy.startupload" checked="selectedData_copy.startupload" -->
                                        <!-- <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" v-model="radioGroup1"> -->
                                        <label class="form-check-label" for="inlineCheckbox2">
                                        開放管理單位上傳編輯日程
                                        </label>
                                        <date-range-picker
                                                    ref="picker"
                                                    :locale-data="localeData"
                                                    v-model="dateRange"
                                                    :dateFormat="dateFormat"
                                                    :singleDatePicker="singleDatePicker" 
                                                    :timePicker="timePicker"
                                                    :ranges='false'
                                                    :autoApply="true"
                                                    :linkedCalendars="true"
                                                    :disabled="!selectedData_copy.startupload"
                                                    @update="updateValues"
                                                >
                                                <!--  :disabled="selectedData_copy.cleanyn===0" -->
                                                <template v-slot:input="picker" style="min-width: 600px;">
                                                    <span v-if="picker.startDate">{{ $moment(picker.startDate).format('YYYY-MM-DD')  }}-</span>  <span v-if="picker.endDate">{{ $moment(picker.endDate).format('YYYY-MM-DD') }}</span>
                                                    <span v-if="!picker.startDate">請選擇起始/結束</span> 
                                                </template>
                                        </date-range-picker>
                                    </div> 
                                </div>
                            </div>
                         </fieldset>
                    </form>
                    <form style="margin-left:200px">
                        <fieldset class="form-group">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check mb-2">
                                        <!-- 20200318改為複選 -->
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1"  v-model="selectedData_copy.startsend" true-value="1" false-value="0">
                                        <!-- <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" :disabled="radioGroup1==='option1'"> -->
                                        <label class="form-check-label" for="exampleRadios3">
                                            開始當日00:00自動提醒倉儲管理者、管理單位
                                        </label>
                                    </div>
                                    <div class="form-check mb-2">
                                        <!-- 20200318改為複選 -->
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1"  v-model="selectedData_copy.endsend" true-value="1" false-value="0">
                                        <!-- <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4" :disabled="radioGroup1==='option1'"> -->
                                        <label class="form-check-label" for="exampleRadios4">
                                            結束當日00:00自動提醒倉儲管理者、管理單位
                                        </label>
                                    </div>
                                    </div>
                            </div>
                        </fieldset>
                    </form>
                 
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
// import Datepicker from 'vuejs-datepicker';
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import {apiUpdateTable} from '@/apis/rawData.js';
export default {
    name: "ScheduleModal_RawData",
    components: {
        // Datepicker
        DateRangePicker
    },
    props: {
        selectedColumns:{
            type:Array
        },
        selectedDetailData:{
            type:Object
        },
    },
    data() {
        return{
            aa:null,
            radioGroup1:'option1',
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
            singleDatePicker:false,
            timePicker:false,
            dateRange:{
                startDate: null,
                endDate: null
            },
            selectedData_copy:{}

        }
    },
    mounted: function () { 

    },
    computed: {
    },
    methods:{
        closeModel:function(){
             $('#ScheduleModal_RawData').modal('hide');
            // this.$emit("closeSecondModel");
        },
        saveEditedData:function(){
            apiUpdateTable({
                authName: this.selectedData_copy.authName,
                fileextension:this.selectedData_copy.fileextension,
                filepath:this.selectedData_copy.filepath,
                ischange:this.selectedData_copy.ischange,
                modifyUser:this.selectedData_copy.modifyUser,
                startdate: this.dateRange.startDate===null?null:this.$moment(this.dateRange.startDate).format('x'),
                enddate: this.dateRange.endDate===null?null:this.$moment(this.dateRange.endDate).format('x'),
                endsend: this.selectedData_copy.endsend,
                startsend:this.selectedData_copy.startsend, 
                startupload: this.selectedData_copy.startupload,
                tablecode:this.selectedData_copy.tablecode,
                tablename: this.selectedData_copy.tablename,
                tableuuid: this.selectedData_copy.tableuuid,
                version:this.selectedData_copy.version,
            }).then((response)=>{
                console.log(response)
                if(response.status===200){
                     this.$swal({
                            title: '成功修改編輯開放設定',
                            text: "",
                            type: 'success',
                     })
                     .then((result)=>{
                          if(result.value){
                            this.$emit('changeUnit');
                            $('#ScheduleModal_RawData').modal('hide');
                            this.dateRange.startDate=null;
                            this.dateRange.endDate=null;

                         }
                     });
                   
                }
               
            })
            



            // 1.儲存修改資料
            // 2.重新request欄位資料
        },
        updateValues(json){
            
            let startDate=this.$moment(json.startDate).format('MM-DD-YYYY');
            // this.dateRange.startDate=startDate;
            // console.log(startDate);
        },
        dateFormat(classes, date){
            // console.log(classes, date)
            return {"classes":classes,"date":"A"}
        }

    },
    watch: {
        'selectedDetailData.enddate':function(){

        },
        selectedDetailData:{
            handler(newValue, oldValue) {
                console.log("AA")
                this.selectedData_copy=Object.assign({}, this.selectedDetailData);
                let auth=this.selectedData_copy.authName.split(',')
                this.selectedData_copy.authName=[];
                for(let item of auth){
                    this.selectedData_copy.authName.push(item);
                }
                // this.selectedData_copy.ischange=1;
                // this.selectedData_copy.startupload=1;

                this.$set(this.dateRange,'startDate',this.selectedData_copy.startdate);
                this.$set(this.dateRange,'endDate',this.selectedData_copy.enddate);


                // this.dateRange.startDate= this.selectedData_copy.startdate;
                // this.dateRange.endDate= this.selectedData_copy.enddate;
                

                // this.dateRange.startDate=this.selectedData_copy.cleandatefirst;
                // this.dateRange.endDate=this.selectedData_copy.cleandatefirst;
                // authName:"倉儲資料管理者,院助,測試用群組01,系統管理者"
                // enddate:null(表單結束日期)
                // endsend:null(表單結束提醒)
                // ischange:null(表單異動通知)
                // startdate:null(表單開始日期)
                // startsend:null(表單開始提醒)
                // startupload:null(是否開啟管理單位上傳編輯)
                // fileextension:null
                // filepath:null
                // modifyDate:null
                // modifyUser:null
                // tablecode:"RAW001"
                // tablename:"僑生獨招(名冊+成績)"
                // tableuuid:"1120BF2D-2FA3-4DD4-9545-C9755DD061A3"
                // vbt_id:1
                // version:5
            },
            // immediate: true,
            deep: true
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
