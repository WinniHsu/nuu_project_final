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
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="1" >
                                        <!-- v-model="selectedData_copy.cleanyn" checked="selectedData_copy.cleanyn" -->
                                        <!-- <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" v-model="radioGroup1" checked> -->
                                        <label class="form-check-label" for="exampleRadios1">
                                            表單異動時發送通知給倉儲管理者
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <!-- 20200318改為複選 -->
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="1" >
                                        <!-- v-model="selectedData_copy.cleanyn" checked="selectedData_copy.cleanyn" -->
                                        <!-- <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" v-model="radioGroup1"> -->
                                        <label class="form-check-label" for="exampleRadios2">
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
                                                   
                                                    @update="updateValues"
                                                >
                                                <!--  :disabled="selectedData_copy.cleanyn===0" -->
                                                <template v-slot:input="picker" style="min-width: 600px;">
                                                    <span v-if="picker.startDate">{{ $moment(picker.startDate).format('MM-DD-YYYY')  }}-</span>  <span v-if="picker.endDate">{{ $moment(picker.endDate).format('MM-DD-YYYY') }}</span>
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
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="1" >
                                        <!-- <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" :disabled="radioGroup1==='option1'"> -->
                                        <label class="form-check-label" for="exampleRadios3">
                                            開始當日00:00自動提醒倉儲管理者、管理單位
                                        </label>
                                    </div>
                                    <div class="form-check mb-2">
                                        <!-- 20200318改為複選 -->
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="1" >
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
        selectedData:{
            type:Object
        },
    },
    data() {
        return{
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
             $('#ScheduleModal_RawData').modal('hide');
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
        selectedData:{
            handler(newValue, oldValue) {
                this.selectedData_copy=Object.assign({}, this.selectedData);
                // this.dateRange.startDate=this.selectedData_copy.cleandatefirst;
                // this.dateRange.endDate=this.selectedData_copy.cleandatefirst;
                  
            },
            immediate: true,
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
