<template>
<div class="modal fade bd-example-modal-xl search_model" id="insertModal_SystemAdmin2" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		            <div class="modal-content">
                        <div class="modal-header">
		                    <!-- <h1 class="modal-title" id="exampleModalLongTitle">修改資料</h1> -->
                            <div class="title mb-3" v-if="modeltype==='insert'">單位管理 - 新增資料</div>
                            <div class="title mb-3" v-if="modeltype==='update'">單位管理 - 修改資料</div>
		                </div>
		                <div class="modal-body">
		                    <div class="container-fluid">
                                <div class="row">
                                     <div class="col-md-12">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">單位名稱</span>
                                            </div>
                                             <input type="text"  v-model="groupName" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" >
                                         </div>
                                    </div>
                                </div>
                                <div class="row outer-wrapper" v-for="group in mainmanage" :key="group">
                                    <!-- <div class="col-md-12" > -->
                                        <el-checkbox :indeterminate="setting[group].isIndeterminate" v-model="setting[group].checkAll" @change="handleCheckAllChange=>handleCheckAll(handleCheckAllChange,group)"></el-checkbox>
                                        {{group}}
                                        <div style="margin: 20px 10px;"></div>
                                    
                                        <el-checkbox-group  v-model="setting[group].checkedOptions" @change="handleCheckedCitiesChange=>handleCheckedCities(handleCheckedCitiesChange,group)">
                                            <el-checkbox  v-if =" city !== null" v-for="city in submanage[group]" :label="city" :key="city">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                    <!-- </div> -->
                                </div>
		
		       
		                    </div>
		                </div>
		                <div class="modal-footer">
		                    <button type="button" class="btn btn-success" v-if="modeltype==='insert'" @click="insertData()">新增資料</button>
                            <button type="button" class="btn btn-success" v-if="modeltype==='update'"  @click="updateData()">儲存資料</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal()">關閉</button>
		                </div>
		            </div>
		        </div>
		    </div>

</template>

<script>
import {apiFindUnit} from '@/apis/adminGroup.js';
import {apiRoleAuth} from '@/apis/adminGroup.js';
import {apiSaveRole} from '@/apis/adminGroup.js';

export default {
    name: "insertModal",
    components: {

    },
    props: {
        modeltype:{
            type:String
        },
        checkOption:{
            type:Object
        }
    },
    data() {
        return{
            allAuths:[],//儲存所有權線規則資料
            mainmanage:[],//主分類
            submanage:{},//副分類
            setting:{},//儲存以選擇內容
            groupName:'',//單位名稱
            auths:[],//已選擇權限代號
            getCheckOption:this.checkOption//外部傳進來資料
        }
    },
    mounted: function () { 
        this.getRoleAuth();
    },
    computed: {
        
    },
    methods:{
        closeModal(){
            this.groupName='';
            this.resetMainmanage();
        },
        insertData(){
            this.renderData()
            .then((res)=>{
                 this.getSaveRole();
            })
            .then(()=>{
               this.groupName='';
               this.resetMainmanage();
            })   
        },
        updateData(){
            this.renderData()
            .then((res)=>{
                // console.log(this.getCheckOption.code,this.groupName,this.auths,this.getCheckOption.version)
                 this.getUpdateRole();
            })
            .then(()=>{
               this.groupName='';
               this.resetMainmanage();
            })       
        },
        // 文字-->代碼
        renderData(){
            return new Promise((resolve, reject)=>{
                for(let item of this.mainmanage){
                    if(item==='同義詞管理'){
                        if(this.setting[item].checkAll===true){
                            let filterMain=this.allAuths.filter((value)=>{
                                return value.mainmanage===item;
                            });
                            console.log('filterMain---->',filterMain)
                            this.auths.push(String(filterMain[0].roleid))
                        }
                    }else{

                        for(let item2 in this.setting[item] ){
                            if(item2==='checkedOptions'){
                                // this.renderData(item,this.setting[item][item2]);
                                let mainmanage=item;
                                let submanage=this.setting[item][item2];
                                            
                                let filterMain=this.allAuths.filter((item)=>{
                                    return item.mainmanage===mainmanage;
                                });
                                for(let item in filterMain){
                                    for(let item2 of submanage){
                                        if(filterMain[item].submanage===item2){
                                            this.auths.push (String(filterMain[item].roleid))
                                        }
                                    }
                                }
                            }
                        }
                    }
                
                };
                 resolve("connect over");
            })
        },
        // 取得目前該筆資料權限(數字代碼-->文字)
        renderData2(codeid){
            console.log(codeid)
            for(let item in this.allAuths){
                if(this.allAuths[item].roleid==codeid){
                    if(this.allAuths[item].mainmanage==='同義詞管理'){
                        this.setting[this.allAuths[item].mainmanage].checkAll=true;
                        this.setting[this.allAuths[item].mainmanage].isIndeterminate=false;
                        console.log('上---->',this.allAuths[item].mainmanage)
                        break;
                    }else{
                        this.setting[this.allAuths[item].mainmanage].checkedOptions.push(this.allAuths[item].submanage);
                        console.log('下---->',this.allAuths[item].submanage)
                        break;
                    }
                }
            }
        },
        // 修改group
        getUpdateRole(){
            
            apiSaveRole({
                code:this.getCheckOption.code,
                authName:this.groupName,
                auth:this.auths,
                version:this.getCheckOption.version
            }).then((response)=>{
                if(response.status===200){
                     this.$swal({
                                title: '修改成功',
                                text: "",
                                type: 'success',
                            })
                            .then((result)=>{   
                                if(result.value){
                                    this.resetMainmanage();
                                    this.groupName='';
                                    this.auths=[];
                                    this.$emit('updatedata');
                                    $('#insertModal_SystemAdmin2').modal('hide');
                                }else{
                                    
                                }
                    });
                }
                   
            })
        },
        // 新增group
        getSaveRole(){
            apiSaveRole({
                authName: this.groupName,
                auth:this.auths
            }).then((response)=>{
                if(response.status===200){
                     this.$swal({
                                title: '新增成功',
                                text: "",
                                type: 'success',
                            })
                            .then((result)=>{   
                                if(result.value){
                                    this.$emit('updatedata');
                                    $('#insertModal_SystemAdmin2').modal('hide');
                                }else{
                                    
                                }
                    });
                }
                   
            })
        },
        resetMainmanage(){
            for(let item of this.mainmanage){
                let obj={
                    checkAll:false,
                    isIndeterminate: true,
                    checkedOptions: [],
                    len:0
                }
                this.$set(this.setting,item,obj);
                
            }
            setTimeout(()=>{
                for(let item of this.mainmanage){
                    // console.log(item)
                    // console.log(this.submanage[item]);
                    this.setting[item].len=this.submanage[item].length;
                }
            },500)

        },
        // 查詢所有權限分類
        getRoleAuth(){
            apiRoleAuth({}).then((response)=>{
                console.log(response);
                this.allAuths=response.data;
                for(let item in response.data){
                    if(this.mainmanage.indexOf(response.data[item].mainmanage)<0){
                        this.mainmanage.push(response.data[item].mainmanage);
                        this.$set(this.submanage,response.data[item].mainmanage,[]);
                        let obj={
                            checkAll:false,
                            isIndeterminate: true, //isIndeterminate=true 沒有全選 isIndeterminate=false 全選
                            checkedOptions: [],
                            len:0
                        }
                        this.$set(this.setting,response.data[item].mainmanage,obj);
                       

                    }
                };
                //  console.log(this.setting)
                for(let item in this.mainmanage){
                    for(let item2 in response.data){
                        if(this.mainmanage[item]===response.data[item2].mainmanage&&response.data[item2].submanage!==null){
                                this.submanage[this.mainmanage[item]].push(response.data[item2].submanage)
                        }
                    }
                    this.setting[this.mainmanage[item]].len=this.submanage[this.mainmanage[item]].length;
                };


            })
        },
        handleCheckAll(val,key){
            if(val==true){
                this.setting[key].checkedOptions=this.submanage[key];
            }else{
                this.setting[key].checkedOptions=[];
            }
            // this.checkedOptions = val ? this.options : [];
            // this.checkedOptionsid = val ? this.optionsid : [];
            this.setting[key].isIndeterminate = false;
        },
        handleCheckedCities(val,key){
            // console.log(val,key);
             let checkedCount = val.length; //目前勾選選項的長度
             this.setting[key].checkAll = checkedCount===this.submanage[key].length;
             this.setting[key].isIndeterminate = checkedCount >0 && checkedCount < this.submanage[key].length
            //  console.log(checkedCount===this.submanage[key].length)
        }
    },
    watch: {
        checkOption:{
            handler(newValue, oldValue) {
                this.groupName=this.getCheckOption.authName;
                for(let item of this.getCheckOption.auth){
                     this.renderData2(item);
                }
                
                setTimeout(()=>{
                   
                        for(let item2 in this.setting){
                            if(this.setting[item2].checkedOptions.length!==0){
                                this.setting[item2].isIndeterminate=this.setting[item2].checkedOptions.length===this.setting[item2].len?false:true;
                                this.setting[item2].checkAll=this.setting[item2].checkedOptions.length===this.setting[item2].len?true:false;
                            }
                        }
                    
                },500)
            
            },
            // immediate: true,
            deep: true
        }
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

</style>
