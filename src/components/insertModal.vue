<template>
<div class="modal fade bd-example-modal-xl search_model" id="insertModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		            <div class="modal-content">
                        <div class="modal-header">
		                    <h1 class="modal-title" id="exampleModalLongTitle">修改資料</h1>
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
                                    <div class="col-md-6 syn_wrapper" v-if="$route.params.params==='Schoolsynonym'">
                                        <span class="badge badge-primary mb-2">同義詞清單</span>
                                        <div class="input-group mb-2" v-for="(item,index) in synonymList" :key="item.graduateSchoolC">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">{{index}}.</span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="Text input with dropdown button"  v-model="item.graduateSchoolSynonymsNames">
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
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
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
import {apiInsertSchoolSynoymDetail} from '@/apis/syn.js';
export default {
    name: "insertModal",
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
            synonymList:[
                {
                    id:null,
                    graduateSchoolSynonymsNames:''
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
        syn_add(){
            let obj={
                id:null,
                graduateSchoolSynonymsNames:"",
            };
            this.synonymList.push(obj);
        },
        syn_delete(index){
             this.synonymList.splice(index,1);
        },
        insertData(){
            var obj={};
            var obj2={
                creationDate: "",
                creationUser: "",
                modifyDate: "",
                modifyUser: "",
                mergeflag:0,
                version:0
            };
            for(let item in this.titleDetail){
                if(this.titleDetail[item].title!==''){
                     this.$set(obj,this.titleDetail[item].id,this.titleDetail[item].value);
                }
            };
            for(let item in obj2){
               this.$set(obj,item,obj2[item]);
            }

            // console.log(obj);
            this.checkInsert().then(()=>{
                this.init_insertSchoolSynoymMaster_params(obj,this.$route.params.params).then(data=>{
                        // console.log('success',data)
                        let success = this.successCount;
                        let failure = this.failureCount;
                        this.$swal({
                            title: '新增報告',
                            text: '同義詞成功新增'+success+"筆，失敗"+failure+"筆",
                            type: 'success',
                            confirmButtonText: '確認'
                        }).then((result)=>{
                            this.$emit('sendeditdata');
                            this.synonymList.length=0;
                            let obj={id:null,graduateSchoolSynonymsNames:''}
                            this.synonymList.push(obj);
                            for(let item in this.titleDetail){
                                this.titleDetail[item].value='';
                            };
                            this.successCount=0;
                            this.failureCount=0;
                            $('#insertModal').modal('hide');               
                        });
                });
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
        
        // 新增詳細資料
        init_insertSchoolSynoymMaster_params:function(obj,SynonymType){
            return new Promise((resolve, reject) => {
                let promisList=[];

                let init_insertSchoolSynoymMaster_params={url: this.$js.baseURL+"/api/schoolSynony/insertSchoolSynoymMaster/"+SynonymType, 
                                                params:JSON.stringify(obj),
                                                method:"POST"};

                let _this=this;
                var p=this.$js.ajaxPromise200(init_insertSchoolSynoymMaster_params).then(function(data) {
      
                });
                p.then(()=>{
                    // 單筆新增同義詞
                    for(let item in this.synonymList){
                        let a;
                        if(this.synonymList[item].graduateSchoolSynonymsNames!==''){
                            a=this.init_insertSchoolSynoymDetail_params(this.synonymList[item].graduateSchoolSynonymsNames,this.titleDetail[0].value,this.$route.params.params);
                            promisList.push(a)
                          
                        }
                    };
                    Promise.all(promisList).then(values => { 
                        resolve(values.length);
                        // {success:this.successCount,failure:this.failureCount}
                    }).catch(reason => { 
                        // console.log(reason)
                    });

                });
            });
        },

        // 新增/修改同義詞API
        init_insertSchoolSynoymDetail_params:function(synonymData,graduateSchoolCode,SynonymType){
            return new Promise((resolve, reject) => {
                let init_insertSchoolSynoymDetail_params={url: this.$js.baseURL+"/api/schoolSynony/insertSchoolSynoymDetail/"+SynonymType, 
                                                params:JSON.stringify({
                                                        creationDate: "",
                                                        creationUser: "",
                                                        graduateSchoolCode: graduateSchoolCode,
                                                        graduateSchoolSynonymsNames:synonymData,
                                                        id: 0,
                                                        modifyDate: "",
                                                        modifyUser: "",
                                                        version:0
                                                }),
                                                method:"POST"};

                let _this=this;
                var p=this.$js.ajaxPromise200(init_insertSchoolSynoymDetail_params).then(function(data) {
                    if(data.status=='success'){
                        _this.successCount=_this.successCount+1;
                    }else{
                        _this.failureCount=_this.failureCount+1;
                    }
                    resolve(0);
                })
        
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
