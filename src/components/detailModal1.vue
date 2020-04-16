<template>
<div class="modal fade bd-example-modal-xl search_model" id="myModal1" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div class="title">同義詞管理 - 上傳編輯 - 修改資料(休退學)</div>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12 col-md-6 ">
                            <span class="badge badge-primary mb-2">詳細資料</span>
                            <div class="input-group mb-3" v-for="(item,index) in columns" :key="index" v-if="item.label!==''&& columns.length>0">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">{{item.label}}</span>
                                </div>
                                <input type="text" :disabled="Toggle.check_disabled||item.label=='退學代碼'||item.label=='休學代碼'" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" v-if="choosedData_copy!=null" v-model="choosedData_copy[item.name]">
                            </div>
                            <button type="button" class="btn btn-danger mr-3" @click="startEdit()" :disabled="Toggle.editBtn">編輯</button>
                            <button type="button" class="btn btn-success" @click="safeEdit()" :disabled="Toggle.safeBtn">儲存</button>
                        </div>
                        <div class="col-sm-12 col-md-6 syn_wrapper" >
                            <span class="badge badge-primary mb-2">同義詞清單</span>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1" >搜尋</span>
                                </div>
                                <input type="text"  v-model="search" class="form-control"  placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                                <!-- <input type="text"  v-model="search2" class="form-control"  placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"> -->
                            </div>
                           <!-- <div><input type="text" v-model="search" placeholder="Search title.."/></div> -->
                            <div class="input-group mb-2" v-for="(item,index) in filteredList" :key="index">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">{{index}}.</span>
                                </div>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button" :disabled="Toggle.check_syn_disabled.indexOf(index)>=0?false:true" v-model="item.nuucode">
                                <input type="text" class="form-control" aria-label="Text input with dropdown button" :disabled="Toggle.check_syn_disabled.indexOf(index)>=0?false:true" v-model="item.nuuname">
                                <span class="modify_wrapper">
                                    <i  v-if="Toggle.check_syn_disabled.indexOf(index)<0" class="modify_btn fas fa-eraser  mr-2" @click="syn_startEdit(index)">
                                        <span  class="ml-2 text-des">編輯</span>
                                    </i>
                                    <i v-if="Toggle.check_syn_disabled.indexOf(index)>=0" class=" modify_btn_change fas fa-check mr-2" @click="syn_endEdit(index)">
                                        <span class="ml-2 text-des">確認</span>
                                    </i>
                                  
                                    <i class="modify_btn fas fa-minus mr-2"><span class="ml-2 text-des"  @click="syn_delete(item.id)">刪除</span></i>
                                    
                                </span>
                            </div>
                            <i  class="modify_btn fas fa-plus  mr-2 mb-1"  @click="syn_add()">
                                <span  class="ml-2 text-des">新增(一次僅能新增一筆資料)</span>
                            </i>
                            <!-- <span class='add_describe '></span> -->
                        </div>
                    </div>

    
                </div>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-secondary"  @click="closeModal()">關閉</button> -->
                <alert-modal :safeBtn="Toggle.safeBtn" :check_syn_disabled="Toggle.check_syn_disabled" @updatedata='getupdatedata' @checkadd='checkadd'></alert-modal>
                <!-- data-dismiss="modal" -->
        
            </div>
        </div>
    </div>
</div>

</template>

<script>
import alertModal from '../components/alertModal';
import {apiDeleteDetail} from '@/apis/syn.js';
import {apiQuerySchoolDetail} from '@/apis/syn.js';
import {apiInsertSchoolSynoymMaster} from '@/apis/syn.js';
import {apiInsertSchoolSynoymDetail} from '@/apis/syn.js';
export default {
    name: "detailModal1",
    components: {
        "alert-modal":alertModal
    },
    props: {
        msg: String,
        // 學校詳細資料
        choosedData:{
            type:Object
        },
        // 學校代碼
        tempid:{
            type:String
        },
        // 表單類型
        params:{
            type:String
        },
        // 欄位名稱
        columns:{
            type:Array
        }
    },
    data() {
        return{
            search: '',
            cols:this.columns,
            titleDetail:[],
            Toggle:{
                check_disabled:true,
                editBtn:false,
                safeBtn:true,
                check_syn_disabled:[],
            },
            choosedData_up:null,//不會變動的值
            choosedData_copy:null,//儲存變動但還未送到資料庫的值
            synonymList:[],
            synonymList_copy:null, //可以變動的
            flag:true
        }
    },
    mounted: function () { 

    },
    computed: {

        filteredList(){
            if(this.synonymList_copy!==null){
                return this.synonymList_copy.filter(syn => {
                    return syn.nuuname.toLowerCase().includes(this.search.toLowerCase())||syn.nuucode.toLowerCase().includes(this.search.toLowerCase())
                })
            }
           
        }
    },
    methods:{
        //開始編輯【詳細資料】 
        startEdit(){
            this.Toggle.check_disabled=false;
            this.Toggle.editBtn=true;
            this.Toggle.safeBtn=false;
        },
        // 確認儲存修改【詳細資料】
        safeEdit(){
            this.Toggle.check_disabled=true;
            this.Toggle.editBtn=false;
            this.Toggle.safeBtn=true;
            // 儲存之前要先做資料比對
            var arrayList=[];
            for(let value in this.choosedData_up){
                // 除了version的值，其他都要比對
                if(value!=='version'){
                    arrayList.push(value);
                }
            };
            for(let a=0;a<arrayList.length;a++){
                if(this.choosedData_up[arrayList[a]]===this.choosedData_copy[arrayList[a]]){
                    //  console.log(this.choosedData_up[arrayList[a]],this.choosedData_copy[arrayList[a]]);
                    //  console.log('長一樣');
                }else{
                    // console.log(this.choosedData_up[arrayList[a]],this.choosedData_copy[arrayList[a]]);
                    // console.log('有長不一樣');
                    if(this.Toggle.safeBtn){
                        //1.送資料到後端，傳到後端的API***************************
                        if(this.$route.params.params==='Dropstu'){
                            // mergeflag=1修改；mergeflag=0新增
                            // this.choosedData_copy.mergeflag=1;
                        };
                        let send_choosedData_copy={};
                        for(let value in this.choosedData_copy){
                            if(value!=='codename'){
                                this.$set(send_choosedData_copy,value,this.choosedData_copy[value])
                            }   
                        }
                        this.$set(send_choosedData_copy,'codename',this.synonymList_copy)
                        setTimeout(()=>{
                             this.getInsertSchoolSynoymMaster(send_choosedData_copy,this.$route.params.params)
                        },500)
                       
                        // this.init_insertSchoolSynoymMaster_params(this.choosedData_copy,this.$route.params.params);
                        //2.把choosedData_copy資料存到choosedData_up
                        this.choosedData_up=Object.assign({},this.choosedData_copy); 
                    }
                    break;
                };
            };

        },
        // 開始編輯同義詞
        syn_startEdit(index){
            // 開始編輯的清單
            this.Toggle.check_syn_disabled.push(index);  
        },
        // 【儲存】【修改】該筆同義詞
        syn_endEdit(index){
            // 1.關掉編輯的清單
            this.Toggle.check_syn_disabled.splice(this.Toggle.check_syn_disabled.indexOf(index),1);
      
            //******************************************************************************
            // 2.最後要送到後端
            let send_choosedData_copy={};
            for(let value in this.choosedData_copy){
                // 新增同意詞不需要給version
                if(value!=='codename'){
                    this.$set(send_choosedData_copy,value,this.choosedData_copy[value])
                }   
            }
            this.$set(send_choosedData_copy,'codename',this.synonymList_copy);
            console.log(send_choosedData_copy);
            // 如果編輯完的這筆資料沒有id，代表【新增】
            console.log(this.synonymList_copy[index])
            if(this.synonymList_copy[index].id===''){

                setTimeout(()=>{
                    this.getInsertSchoolSynoymMaster(send_choosedData_copy,this.$route.params.params,'新增同義詞')
                },500)       

            }
            else{
                setTimeout(()=>{
                    this.getInsertSchoolSynoymMaster(send_choosedData_copy,this.$route.params.params,'修改同義詞')
                },500) 
            };


        },
        // 刪除該筆同義詞
        syn_delete(itemID){
                console.log(itemID)
                this.$swal({
                    title: '是否刪除該筆資料?',
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: '取消',
                    confirmButtonText: '確認'
                })
                .then((result)=>{
                    // console.log(result);
                    // 如果要刪除的是【已存在資料庫】的資料
                    if(result.value&&itemID!==null){
                        // this.getDeleteDetail(itemID,this.$route.params.params);
                        // this.init_deleteSchoolSynoymDetail_params(itemID,this.$route.params.params);
                        for(let item in this.synonymList_copy){
                            if(this.synonymList_copy[item].id===itemID){
                                 this.synonymList_copy.splice(item,1);
                            }
                        }
                        // 2.最後要送到後端
                        let send_choosedData_copy={};
                        for(let value in this.choosedData_copy){
                            // 新增同意詞不需要給version
                            if(value!=='codename'){
                                this.$set(send_choosedData_copy,value,this.choosedData_copy[value])
                            }   
                        }
                        this.$set(send_choosedData_copy,'codename',this.synonymList_copy);
                        setTimeout(()=>{
                            this.getInsertSchoolSynoymMaster(send_choosedData_copy,this.$route.params.params,'刪除同意詞')
                        },500)  

                       
                
                    }else if(result.value&&itemID==null){
                        // console.log(itemID)
                        // 如果要刪除的是【尚未存在資料庫】的資料
                        for(let item in this.synonymList_copy){
                            if(this.synonymList_copy[item].id===itemID){
                                 this.synonymList_copy.splice(item,1);
                            }
                        }
                        // this.filteredList.splice(index,1);
                        this.flag=true;
                    }else if(result.dismiss=='cancel'){
                      
                    }
                         
                });
            // 送到後端處理
            //******************************************************************************

        },
        //新增一筆同義詞(並未送出)
        syn_add(){
            if(this.$route.params.params==='Dropstu'||this.$route.params.params==='Suspend'){
                let obj={
                    id:'',
                    nuucode:'',
                    nuuname:''
                };
                if(this.flag){
                    this.synonymList_copy.push(obj);
                    this.flag=false;
                };
            }else{
                let obj={
                    id:null,
                    graduateSchoolSynonymsNames:"",
                };
                if(this.flag){
                    this.synonymList_copy.push(obj);
                    this.flag=false;
                };
            }
           

          
        },
        // 自動儲存
        getupdatedata(){
            // 自動儲存左邊詳細資料
            // this.safeEdit();
            let send_choosedData_copy={};
            for(let value in this.choosedData_copy){
                if(value!=='codename'){
                    this.$set(send_choosedData_copy,value,this.choosedData_copy[value])
                }   
            }
            this.$set(send_choosedData_copy,'codename',this.synonymList_copy)
            setTimeout(()=>{
                    this.getInsertSchoolSynoymMaster(send_choosedData_copy,this.$route.params.params)
            },500)
            this.Toggle.check_syn_disabled=[];
            this.flag=true;
            this.Toggle.editBtn=false;
            this.Toggle.safeBtn=true;
            this.Toggle.check_disabled=true;
         
            
        },
        checkadd(){
            if(this.$route.params.params==='Schoolsynonym'){
                this.init_querySchoolDetailBySchoolCode_params(this.choosedData.graduateSchoolCode,this.$route.params.params);
                this.flag=true;
            }
        },
        // 回傳詳細資料(左邊)
        getInsertSchoolSynoymMaster:function(obj,SynonymType,type){
            apiInsertSchoolSynoymMaster(SynonymType,
               obj
            ).then((response)=>{
                console.log(response);
                if(type==='新增同義詞'){
                    this.$swal({
                        title: '成功新增',
                        text: "",
                        type: 'success',
                    })
                    .then((result)=>{
                        if(result.value){
                            this.flag=true;
                            this.choosedData_copy.version=response.data.newvalue[0].version;

                        }
                    });
                }else if(type==='刪除同意詞'){
                     this.$swal({
                        title: '成功刪除',
                        text: "",
                        type: 'success',
                    })
                    .then((result)=>{
                        if(result.value){
                            this.flag=true;
                            this.choosedData_copy.version=response.data.newvalue[0].version;

                        }
                    });
                }
                else{
                    
                    this.$swal({
                            title: '修改成功',
                            text: "",
                            type: 'success',
                            confirmButtonText: '確認'
                     }) .then((result)=>{
                          if(result.value){
                                 this.choosedData_copy.version=response.data.newvalue[0].version;
                                 //2.前面總表重新request資料
                                this.$emit('sendeditdata');
                          }
                     });
                   
                   
                    //3.version+1
                //    this.choosedData_copy.version=this.choosedData_copy.version+1;

                }

            })
            .catch((err)=> {
                    this.$swal({
                            title: '修改失敗',
                            text: "",
                            type: 'error',
                            confirmButtonText: '確認'
                     });
                    
            });
        },

        // 請求同義詞資料
        getQuerySchoolDetail(code,SynonymType){
            apiQuerySchoolDetail({
                "graduateSchoolCode":code,
                "SynonymType":SynonymType
            }).then((response)=>{
                this.synonymList.length=0;
                this.synonymList=response.data;
            })
        },

        // 新增/修改同義詞API
        getInsertSchoolSynoymDetail(synonymData,graduateSchoolCode,id,version,SynonymType){
            apiInsertSchoolSynoymDetail(SynonymType,{
                creationDate: "",
                creationUser: "",
                graduateSchoolCode: graduateSchoolCode,
                graduateSchoolSynonymsNames:synonymData,
                id: id,
                modifyDate: "",
                modifyUser: "",
                version:version
            }).then((response)=>{
                this.getQuerySchoolDetail(this.choosedData.graduateSchoolCode,this.$route.params.params);
            })
        },

        // 刪除同義詞API
        getDeleteDetail(syn_id,SynonymType){
            apiDeleteDetail({
                schoolCode:syn_id,
                SynonymType:SynonymType
            }).then((response)=>{
                console.log(response);
                this.getQuerySchoolDetail(this.choosedData.graduateSchoolCode,this.$route.params.params);
            })
        },



    },
    watch: {
        // 監聽左側詳細資料
        choosedData:function(){
            if(Object.keys(this.choosedData).length>0){
                // request 同義詞API
                if(this.$route.params.params==='Dropstu'||this.$route.params.params==='Suspend'||this.$route.params.params==='Enrolltype'){
                    this.synonymList=this.choosedData.codename;
                    // this.getQuerySchoolDetail(this.choosedData.graduateSchoolCode,this.$route.params.params);
                    // this.init_querySchoolDetailBySchoolCode_params(this.choosedData.graduateSchoolCode,this.$route.params.params);
                }
            };
            // 複製左側資料
            this.choosedData_copy=Object.assign({}, this.choosedData);
            this.choosedData_up=Object.assign({}, this.choosedData);
        },
        // 複製同義詞資料
        synonymList:function(){
             let temp=Object.assign({}, this.synonymList);
             this.synonymList_copy=[];
            //  for(let item in temp){
            //      let obj={
            //          id:'',
            //          name:''
            //      }
            //      obj.id=item;
            //      obj.name=temp[item];
            //      this.synonymList_copy.push(obj);
            //     //  console.log(temp[item]);
            //  }
            this.synonymList_copy= JSON.parse(JSON.stringify(this.synonymList));
        },

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-size: 1.3rem;
    font-weight: 900;
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
