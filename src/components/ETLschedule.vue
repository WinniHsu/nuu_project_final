<template>
<div class="modal fade  bd-example-modal-lgl" id="ETLSchedule" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLongTitle">排成與通知設定</h1>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form>
                        <fieldset class="form-group">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-check form-check-inline mb-2" >
                                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" v-model="radioGroup1" checked>
                                        <label class="form-check-label" for="exampleRadios1">
                                            清洗執行日
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
                                                    :disabled="radioGroup1==='option2'"
                                                    @update="updateValues"
                                                >

                                                <template v-slot:input="picker" style="min-width: 600px;">
                                                    <span v-if="picker.startDate">{{ $moment(picker.startDate).format('MM-DD-YYYY')  }}</span>
                                                    <span v-if="!picker.startDate">請選擇起始/結束</span> 
                                                </template>
                                        </date-range-picker>
                                    </div>
                                    <form style="margin-left:100px">
                                        <fieldset class="form-group">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-check form-check-inline mb-2">
                                                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option1" v-model="radioGroup1" :disabled="radioGroup1==='option2'">
                                                        <label class="form-check-label form-check-inline" style="white-space:nowrap" for="exampleRadios3">
                                                            重複間隔 
                                                            <select  class="form-control mx-3" id="exampleFormControlSelect1" :disabled="radioGroup1==='option2'">
                                                                <option>天</option>
                                                                <option>週</option>
                                                                <option>個月</option>
                                                                <option>年</option>
                                                            </select>
                                                            重複日期
                                                            <select  class="form-control mx-3" id="exampleFormControlSelect2" :disabled="radioGroup1==='option2'">
                                                                <option>mon</option>
                                                                <option>tue</option>
                                                                <option>wed</option>
                                                                <option>thu</option>
                                                                <option>fri</option>
                                                                <option>sat</option>
                                                                <option>sun</option>
                                                            </select>
                                                        </label>
                                                    </div>

                                                    </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                    <div class="form-check ">
                                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" v-model="radioGroup1" >
                                        <label class="form-check-label" for="exampleRadios2">
                                        結束提醒倉儲管理者
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
    name: "ETLSchedule",
    components: {
        // Datepicker
        DateRangePicker
    },
    props: {
        selectedColumns:{
            type:Array
        }
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
        closeModel:function(){
             $('#ETLSchedule').modal('hide');
            // this.$emit("closeSecondModel");
        },
        saveEditedData:function(){
             $('#ETLSchedule').modal('hide');
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
