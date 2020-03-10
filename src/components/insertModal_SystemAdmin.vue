<template>
<div class="modal fade bd-example-modal-xl search_model" id="insertModal_SystemAdmin" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		            <div class="modal-content">
                        <div class="modal-header">
		                    <!-- <h1 class="modal-title" id="exampleModalLongTitle">修改資料</h1> -->
                            <div class="title mb-3">帳號管理 - 新增資料</div>
		                </div>
		                <div class="modal-body">
		                    <div class="container-fluid">
                                <div class="row">
                                     <div class="col-md-12">
                                        <!-- <span class="badge badge-primary mb-2">詳細資料</span> -->
                                        <div class="input-group mb-3" v-for="(item,index) in titleDetail" :key="index">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">{{item.title}}</span>
                                            </div>
                                            <input type="text"  v-if="options[item.id]==undefined" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" v-model="item.value">
                                            <select  v-if="options[item.id]!==undefined" class="form-control" id="exampleFormControlSelect1" v-model="item.value">
                                                <option v-for="option in options[item.id]" :key="option.code">{{option.authName}}</option>
                                             
                                            </select>
                                        </div>
                                    </div>

                                </div>
		
		       
		                    </div>
		                </div>
		                <div class="modal-footer">
		                    <button type="button" class="btn btn-success"  @click="insertData()">新增資料</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
		                </div>
		            </div>
		        </div>
		    </div>

</template>

<script>
import {apiFindUnit} from '@/apis/adminGroup.js';
import {apiCreateUser} from '@/apis/adminUser.js';
export default {
    name: "insertModal",
    components: {

    },
    props: {

    },
    data() {
        return{
            titleDetail:[
                {id:'role',title:'所屬單位',value:""},
                {id:'account',title:'用戶帳號',value:""},
                {id:'name',title:'用戶名稱',value:""},

            ],
            options:{
                role:[],

            },
        }
    },
    mounted: function () { 
        this.getFindUnit();
    },
    computed: {
 
    },
    methods:{
        getFindUnit(){
            apiFindUnit({}).then((responese)=>{
                // console.log(responese);

                for(let item in responese.data){
                    let obj={
                        code:0,
                        authName: ""
                    };
                    obj.code=responese.data[item].code;
                    obj.authName=responese.data[item].authName;
                    this.options.role.push(obj);
                }
            })
        },
        insertData(){
            this.verify_data();
        },   
        //驗證輸入資料
        verify_data(){
            let flag=false;
            for(let item in this.titleDetail){
                // 如果資料填不完整
                if(this.titleDetail[item].value==''){
                    this.$swal({
                            title: '資料未填完整',
                            text: "",
                            type: 'warning',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '確定',
                    });
                    flag=true;
                    break;
                }
            };

            // 如果資料無誤，call 新增API
            if(flag==false){
                this.getCreateUser();
                // this.init_createUser_params();
            }
            
        },
        getCreateUser(){
            apiCreateUser({
                account:this.titleDetail[1].value,
                name:this.titleDetail[2].value,
                role:this.titleDetail[0].value
            }).then((responese)=>{
                //如果帳號重複
                if(responese.data){
                    this.$swal({
                        title: '新增成功',
                        text: "",
                        type: 'success',
                    });
                    let ArrayList=[
                        {id:'role',title:'所屬單位',value:""},
                        {id:'account',title:'用戶帳號',value:""},
                        {id:'name',title:'用戶名稱',value:""},

                    ];
                    this.titleDetail=ArrayList;
                    $('#insertModal_SystemAdmin').modal('hide');
                    this.$emit('recallUserList');    
                }else{
                    this.$swal({
                        title: '新增失敗',
                        text: "",
                        type: 'warning',
                    });
                    let ArrayList=[
                        {id:'role',title:'所屬單位',value:""},
                        {id:'account',title:'用戶帳號',value:""},
                        {id:'name',title:'用戶名稱',value:""},

                    ];
                    this.titleDetail=ArrayList;
                
                }
            });
        
        },
    },
    watch: {

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
