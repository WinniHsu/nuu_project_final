<template>
<div class="modal fade  bd-example-modal-lgl" id="ETLSchedule" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                    <div class="form-check form-check-inline mb-2" >
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="1" v-model="selectedData_copy.cleanyn" checked="selectedData_copy.cleanyn">
                                            <label class="form-check-label" for="inlineCheckbox1">清洗執行日</label>
                                        <!-- <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" v-model="radioGroup1" checked> -->
                                        <!-- <label class="form-check-label" for="exampleRadios1">
                                            清洗執行日
                                        </label> -->
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
                                                    <span v-if="picker.startDate">{{ $moment(picker.startDate).format('YYYY-MM-DD')  }}</span>
                                                     <!-- <span v-if="picker.startDate">{{ picker.startDate}}</span> -->
                                                    <span v-if="!picker.startDate">請選擇起始日期</span> 
                                                </template>
                                        </date-range-picker>
                                         <!-- <span>{{ $moment(dateRange.startDate).format('YYYY-MM-DD')}}</span>  -->
                                    </div>
                                    <form style="margin-left:100px">
                                        <fieldset class="form-group">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-check form-check-inline mb-2">
                                                        <!-- <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option1" v-model="radioGroup1" > -->
                                                        <label class="form-check-label form-check-inline" style="white-space:nowrap" for="exampleRadios3">
                                                            重複間隔 
                                                            
                                                            <input type="text" class="form-control" aria-label="Text input with dropdown button" v-model="selectedData_copy.reday">
                                                            <select  class="form-control mx-3" id="exampleFormControlSelect1" v-model="selectedData_copy.redaytype" >
                                                                <option value='day'>天</option>
                                                                <option value='month'>月</option>
                                                                <option value='year'>年</option>
                                                            </select>
                                                            <!-- 重複日期
                                                            <select  class="form-control mx-3" id="exampleFormControlSelect2" :disabled="radioGroup1==='option2'">
                                                                <option>mon</option>
                                                                <option>tue</option>
                                                                <option>wed</option>
                                                                <option>thu</option>
                                                                <option>fri</option>
                                                                <option>sat</option>
                                                                <option>sun</option>
                                                            </select> -->
                                                        </label>
                                                    </div>

                                                    </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                    <div class="form-check ">
                                        <!-- value="1" v-model="selectedData_copy.cleanyn" checked="selectedData_copy.cleanyn" -->
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="1" v-model="selectedData_copy.endsend" checked="selectedData_copy.endsend">
                                        <label class="form-check-label" for="inlineCheckbox2">資料清洗程式執行結束提醒倉儲管理者</label>
                                        <!-- <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" v-model="radioGroup1" > -->
                                        <!-- <label class="form-check-label" for="exampleRadios2"> -->
                                        <!-- 資料清洗程式執行結束提醒倉儲管理者 -->
                                        <!-- </label> -->

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
import {apiUpdateTime} from'@/apis/etl';
export default {
    name: "ETLSchedule",
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
        selectedData_original:{
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
                // startDate:this.selectedData_copy!==undefined||null?this.selectedData_copy.cleandatefirst:null,
                // startDate:this.selectedData_copy!==undefined?this.selectedData_copy.cleandatefirst:null,
                startDate:null,
                endDate: null
            },
            selectedData_copy:{}

        }
    },
    mounted: function () { 

    },
    computed: {
        cleandatefirst(){
            console.log(this.selectedData_copy)
            return this.selectedData_copy.cleandatefirst
        }
        // SelectedData(){
        //     return this.selectedData_copy=Object.assign({}, this.selectedData);
        // },

    },
    methods:{
        // {
        // "cleandatecal": "2020-03-17T03:09:32.193Z",
        // "cleandatefirst": "2020-03-17T03:09:32.193Z",
        // "endsend": "string",
        // "id": 0,
        // "reday": 0,
        // "redaytype": "string",
        // "startcount": 0,
        // "status": 0,
        // "tablecount": 0,
        // "tableengname": "string",
        // "tablename": "string"
        // }
        
        getApiUpdateTime:function(){
            // $moment(picker.startDate).format('YYYY-MM-DD')

            apiUpdateTime({
                version:this.selectedData_original[0].version,
                id:this.selectedData_copy.id,
                tablename:this.selectedData_original[0].tablename,
                tableengname:this.selectedData_original[0].tableengname,
                status:this.selectedData_original[0].status,
                tablecount:this.selectedData_original[0].tablecount,
                cleanyn:this.selectedData_copy.cleanyn===true||this.selectedData_copy.cleanyn==='1'?'1':'0',
                cleandatefirst:this.dateRange.startDate===null?null:this.$moment(this.dateRange.startDate).format('x'),
                redaytype:this.selectedData_copy.redaytype,
                reday:this.selectedData_copy.reday,
                cleandatecal:this.selectedData_original[0].cleandatecal,
                endsend:this.selectedData_copy.endsend,
                startcount:this.selectedData_original[0].startcount,
            
            }).then((response)=>{
                console.log(response.data)
                  this.$emit('getAllData');
            })
        },
        closeModel:function(){
             $('#ETLSchedule').modal('hide');
            // this.$emit("closeSecondModel");
        },
        saveEditedData:function(){
            this.getApiUpdateTime();
          
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
        selectedData:{
            handler(newValue, oldValue) {
                this.selectedData_copy=Object.assign({}, this.selectedData);
                this.$set(this.dateRange,'startDate',this.selectedData_copy.cleandatefirst);
                // this.dateRange.startDate=this.selectedData_copy.cleandatefirst;
                //  this.dateRange.startDate=123;
                // this.$forceUpdate()
                  
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
