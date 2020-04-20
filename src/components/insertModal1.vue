
<template>
<!-- 退學資料表 新增資料 -->
<div class="modal fade bd-example-modal-xl search_model" id="insertModal1" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		            <div class="modal-content">
                        <div class="modal-header">
		                    <h1 class="modal-title" id="exampleModalLongTitle">修改資料(退學)</h1>
		                </div>
		                <div class="modal-body">
		                    <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span class="badge badge-primary mb-2">詳細資料</span>
                                        <div class="input-group mb-3" v-for="(item,index) in titleDetail" :key="index">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">{{item.title}}</span>
                                            </div>
                                            <input type="text"  v-if="option[item.id]==undefined" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" v-model="item.value">
                                            <select  v-if="option[item.id]!==undefined" class="form-control" id="exampleFormControlSelect1" v-model="item.value">
                                                <option v-for="option in option[item.id]">{{option}}</option>
                                             
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 syn_wrapper">
                                        <span class="badge badge-primary mb-2">同義詞清單</span>
                                        <div class="input-group mb-2" v-for="(item,index) in synonymList" :key="item.graduateSchoolC">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">{{index}}.</span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="Text input with dropdown button" v-if="$route.params.params!=='Language'&&$route.params.params!=='Oversea'" v-model="item.nuucode">
                                            <input type="text" class="form-control" aria-label="Text input with dropdown button"  v-model="item.nuuname">
                                            <i class="modify_btn fas fa-minus mr-2" @click="syn_delete(index)"><span class="ml-2 text-des"  >刪除</span></i>
                                        </div>
                                        <i  class="modify_btn fas fa-plus  mr-2"  @click="syn_add()">
                                            <span  class="ml-2 text-des">新增</span>
                                        </i>
                                    </div>
                                </div>
		
		       
		                    </div>
		                </div>
		                <div class="modal-footer">
		                    <button type="button" class="btn btn-success"  @click="insertData()">新增資料</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal()">關閉</button>
                            <!-- <alert-modal :safeBtn="Toggle.safeBtn" :check_syn_disabled="Toggle.check_syn_disabled" @updatedata='getupdatedata' ></alert-modal> -->
                            <!-- data-dismiss="modal" -->
		         
		                </div>
		            </div>
		        </div>
		    </div>

</template>

<script>
import alertModal from '../components/alertModal';
import {apiInsertSchoolSynoymMaster} from '@/apis/syn.js';
export default {
    name: "insertModal1",
    components: {
        "alert-modal":alertModal
    },
    props: {
        msg: String,
        columns:{
            type:Array
        },
        optionList:{
            type:Object
        }

    },
    data() {
        return{
            titleDetail:[
                // {id:'graduateSchoolCode',title:'學校代碼',value:""},
                // {id:'graduateSchoolName',title:'校名',value:""},
                // {id:'graduateSchoolSystem',title:'體系',value:""},
                // {id:'graduateSchoolPublicPrivate',title:'公私立',value:""},
                // {id:'graduateSchoolCityMarked',title:'都會型高中',value:""},
                // {id:'graduateSchoolRegion',title:'學校區域',value:""},
                // {id:'graduateSchoolCity',title:'學校縣市',value:""},
                // {id:'graduateSchoolDistrict',title:'學校市區',value:""},
                // {id:'graduateSchoolAddress',title:'詳細地址',value:""},
                // {id:'lat',title:'緯度',value:""},
                // {id:'lng',title:'經度',value:""}
            ],
            option:{
                // graduateSchoolSystem:['技職','一般','師範','特教','進修學校','海外台灣學校','軍警','無'],
                // graduateSchoolPublicPrivate:['私立','公立','無'],
                // graduateSchoolCityMarked:['都會型高中','非高中','非都會型','都會型'],
                // graduateSchoolRegion:['南部','北部','中部','東部','離島','海外','無'],
                // graduateSchoolCity:['基隆市','臺北市','新北市', '桃園市','新竹市','新竹縣','苗栗縣','臺中市','南投縣','彰化縣','雲林縣','嘉義縣','嘉義市',
                // '臺南市','台南市','高雄市','宜蘭縣','花蓮縣','屏東縣','臺東縣','澎湖縣','金門縣']
            },
            syn_count:1,
            synonymList:[
                {
                    id:'0',
                    nuucode:"",
                    nuuname:"",
                }
            ],
            successCount:0,
            failureCount:0
        }
    },
    mounted: function () { 
            for(let item in this.columns){
                if(this.columns[item].label!==''){
                    let obj={id:'',title:'',value:""}
                    obj.id=this.columns[item].name;
                    obj.title=this.columns[item].label;
                    this.titleDetail.push(obj);
                }

            };
    },
    computed: {
 
    },
    methods:{
        closeModal(){
                //  把輸入的資料洗掉
                this.synonymList.length=0;
                let obj={ id:0,nuucode:"",nuuname:""}
                this.synonymList.push(obj);
                for(let item in this.titleDetail){
                    this.titleDetail[item].value='';
                };
        },
        syn_add(){
          if(this.$route.params.params==='Dropstu'||this.$route.params.params==='Suspend'||this.$route.params.params==='Enrolltype'){
            let obj={
                id:'',
                nuuname:"",
                nuucode:"",
            };
            obj.id=this.syn_count.toString();
            this.syn_count++;
            this.synonymList.push(obj);
          }else if(this.$route.params.params==='Language'||this.$route.params.params==='Oversea'){
            let obj={
                id:'',
                nuuname:"",
            };
            obj.id=this.syn_count.toString();
            this.syn_count++;
            this.synonymList.push(obj);
          }


            // dropremark:"因學業成績winnie333333"
            // dropremarkid:"B01"
            // version:16
            // codename:[
            //     {
            //          id:"0"
            //          nuucode:"5"
            //          nuuname:"因學業成績"

            //     }
            // ]

        },
        syn_delete(index){
             this.synonymList.splice(index,1);
        },
        insertData(){
            var obj={};

            for(let item in this.titleDetail){
                if(this.titleDetail[item].title!==''){
                     this.$set(obj,this.titleDetail[item].id,this.titleDetail[item].value);
                }
            };

            this.$set(obj,'codename',this.synonymList);

            this.checkInsert().then(()=>{
                this.getInsertSchoolSynoymMaster(obj,this.$route.params.params);
            })
         


            
        },
        checkInsert:function(){
            return new Promise((resolve, reject) => {
                for(let item in this.titleDetail){
                    if(this.titleDetail[item].value==''){
                        this.$swal({
                            title: '資料未填齊全',
                            text: "",
                            type: 'warning',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '確定'
                        });
                        break;
                    }else{
                        resolve();
                    }
                }
               
            });
        },
        getInsertSchoolSynoymMaster:function(obj,SynonymType){
            // return new Promise((resolve, reject) => {
                apiInsertSchoolSynoymMaster(
                    SynonymType,obj
                ).then((response)=>{
                    console.log('getInsertSchoolSynoymMaster---->',response);
                       // console.log('success',data)
                        let success = this.successCount;
                        let failure = this.failureCount;
                        if(response.data.res==='存檔失敗，因資料庫已有相同的值'){
                            this.$swal({
                                title: '存檔失敗，因資料庫已有相同的值',
                                type: 'error',
                                confirmButtonText: '確認'
                                }).then((result)=>{
                                
                                });
                        }else{
                            this.$swal({
                                title: '新增報告',
                                text: '同義詞成功新增'+success+"筆，失敗"+failure+"筆",
                                type: 'success',
                                confirmButtonText: '確認'
                            }).then((result)=>{
                                this.$emit('sendeditdata');
                                this.synonymList.length=0;
                                let obj={ id:0,nuucode:"",nuuname:""}
                                this.synonymList.push(obj);
                                for(let item in this.titleDetail){
                                    this.titleDetail[item].value='';
                                };
                                this.successCount=0;
                                this.failureCount=0;
                                $('#insertModal1').modal('hide');               
                            });
                        };



           
            });
        },

    },
    watch: {
        columns:function(){
            // console.log("columns")
            this.titleDetail.length=0;
            for(let item in this.columns){
                let obj={id:'',title:'',value:""}
                obj.id=this.columns[item].name;
                obj.title=this.columns[item].label;
                this.titleDetail.push(obj);
            };
        
        },
        optionList:{
            handler(newValue, oldValue) {
                // console.log(newValue)
                this.option={};
                this.option= this.optionList;

            },
             immediate: true,
            deep: true
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
