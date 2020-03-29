<template>
<div class="modal fade bd-example-modal-lg" id="InsertModal_RawData" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLongTitle">新增資料</h1>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row mb-3" v-if="item.label!==''&&item.name!=='ExchangeCollege'&&item.name!=='ExchangeDept'" v-for="(item,index) in selectedColumns" :key="index">
                        <div class="col-12">
                            <div class="input-group mb-1" >
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">{{item.label}}</span>
                                </div>
                                <input type="text" v-if="inputValue[item.name].type!=='DATE'&& item.name!=='LicenseID'&&item.name!=='ExchangeSchool'&&item.note===undefined"  class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"  v-model="inputValue[item.name].value">
                                <date-range-picker v-if="inputValue[item.name].type==='DATE'"
                                            ref="picker"
                                            :locale-data="localeData"
                                            v-model="inputValue[item.name].value"
                                            :dateFormat="dateFormat"
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
                                <select :disabled="item.note!==undefined"  v-if="item.name==='LicenseID'||item.note!==undefined" class="form-control" id="exampleFormControlSelect1" v-model="inputValue[item.name].value" @change='autoOPtion(item.name,inputValue[item.name].value)'>
                                    <option v-for="(op,index) in item.option" :key='index'>{{op}}</option>
                                </select>
                                 <el-cascader v-if="item.name==='ExchangeSchool'"
                                    :options="item.option"
                                    :props="props"
                                    v-model="inputValue[item.name].value"
                                    clearable></el-cascader>
                                <!-- <el-cascader v-if="item.name==='ExchangeSchool'"
                                :options="options"
                                :props="{ checkStrictly: true }"
                                clearable></el-cascader> -->
                            </div>
                            <div class="hint-des" v-if="inputValue[item.name].check===1">***{{inputValue[item.name].message}}***</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModel()">取消</button>
                    <button type="button" class="btn btn-primary" @click="saveEditedData()">新增</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import {apiInsertTableColumns} from '@/apis/rawData.js';
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
export default {
    name: "InsertModal_RawData",
    components: {
        DateRangePicker
    },
    props: {
        selectedColumns:{
            type:Array
        }
       
    },
    data() {
        return{
             inputValue:{},
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
            props: { multiple: false },
            options: []
        }
    },
    mounted: function () { 
            for(let item in this.selectedColumns){
                if(this.selectedColumns[item].label!==''){
                    this.$set(this.inputValue,this.selectedColumns[item].name,null);
                }    
            };
    },
    computed: {
    },
    methods:{
        autoOPtion(level1,level1Option){
            let level1low=level1.toLowerCase();
            if(level1low==='licenseid'){
                for(let item in this.selectedColumns){
                    if(this.selectedColumns[item].note!==undefined){
                        if(this.selectedColumns[item].note.toLowerCase().indexOf('licenseid')>=0){
                            this.inputValue[this.selectedColumns[item].name].value=this.selectedColumns[item].option[level1Option];
                        }
                    }
                }
            }
        },
        updateValues(json){
            
            let startDate=this.$moment(json.startDate).format('MM-DD-YYYY');
            // this.dateRange.startDate=startDate;
            // console.log(startDate);
        },
        dateFormat(classes, date){
            // console.log(classes, date)
            return {"classes":classes,"date":"A"}
        },
        closeModel:function(){
             $('#InsertModal_RawData').modal('hide');
            //  this.inputValue={};

        },
        saveEditedData:function(){
            // 先驗證輸入的資料
            let errorList=[];
            for(let item in this.inputValue){
                if(this.inputValue[item].type==='INT'){
                    var regex = /^[0-9\s]*$/;
                    if (regex.test(this.inputValue[item].value)){
                        //console.log('這是數字')
                        this.inputValue[item].check=0;
                        this.inputValue[item].message="";
                    }else{
                        //console.log('這不是數字')
                        this.inputValue[item].check=1;
                        this.inputValue[item].message="資料型態錯誤";
                        errorList.push(item);
                    } 

                }
            };
            console.log(errorList);
            if(!errorList.length){
                let sendData={}
                for(let item in this.inputValue){
                    if(this.inputValue[item].type==='DATE'){
                         this.$set(sendData,item,this.inputValue[item].value.startDate!==null?this.$moment(this.inputValue[item].value.startDate).format('YYYY-MM-DD'):null);
                    }else{
                        this.$set(sendData,item,this.inputValue[item].value);
                    }

                    setTimeout(()=>{

                   
                        if(item==='ExchangeSchool'){
                    
                        // ['exchangeSchool','exchangeCollege','exchangeDept'];
                        let aa=JSON.parse(JSON.stringify(this.inputValue[item].value));
                        this.$set(sendData,'ExchangeSchool', aa[0]);
                        this.$set(sendData,'ExchangeCollege', aa[1]);
                        this.$set(sendData,'ExchangeDept',  aa[2]);
                        
                        }
                },300)
                   
                   
                }
                console.log('新增資料---->',sendData)
                setTimeout(()=>{
                     this.getInsertTableColumns(sendData);
                },500)
               

            }else{
                    this.$swal({
                            title: '輸入資料錯誤',
                            text: "",
                            type: 'warning',
                     }); 
            }

        },
        getInsertTableColumns:function(sendData){
            apiInsertTableColumns({
                columnvalue: encodeURIComponent(JSON.stringify(sendData)),
                tableuuid: this.$route.params.uuid,
            }).then((response)=>{
                console.log(response);
                 this.$swal({
                    title: '成功新增',
                    text: "",
                    icon: 'success',
                })
                .then((result)=>{
                    if(result.value){
                        $('#InsertModal_RawData').modal('hide'); 
                        this.copyColumns();
                    }
                })
                .then(()=>{
                     this.$emit('requestdata');
                });
            })
        },
        copyColumns(){
            for(let item in this.selectedColumns){
               if(this.selectedColumns[item].datatype==='DATE'){
                    let obj={
                        value:{
                            startDate: null,
                            endDate: null
                        },
                        type:'',
                        message:'',
                        check:0
                    };
                    obj.type=this.selectedColumns[item].datatype;
                    this.$set(this.inputValue,this.selectedColumns[item].name,obj);
                }else if(this.selectedColumns[item].label!==''){
                    let obj={
                        value:'',
                        type:'',
                        message:'',
                        check:0
                    };
                    obj.type=this.selectedColumns[item].datatype;
                    this.$set(this.inputValue,this.selectedColumns[item].name,obj);
                }   


            }
        }

    },
    watch: {
        selectedColumns:function(){
            this.copyColumns();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-group-text{
    white-space: initial;
}
.vue-daterange-picker{
    flex: 1 1 0%;
}

.hint-des{
    color:red;
    font-weight:600;
}
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
