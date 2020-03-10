<template>
<div class="modal fade" id="UpdateUnitModal_SysyemAdmin" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <!-- <h1 class="modal-title" id="exampleModalLongTitle">修改管理單位</h1> -->
                <div class="title mb-3">帳號管理 - 修改</div>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group mb-3" v-for="item in titleDetail" :key="item.id">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">{{item.title}}</span>
                                </div>
                                <input type="text"  v-if="options[item.id]==undefined" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" v-model="item.value">
                                <select  v-if="options[item.id]!==undefined" class="form-control" id="exampleFormControlSelect1" v-model="item.value">
                                    <!-- <option>{{currentUnit}}</option> -->
                                    <option v-for="option in options[item.id]" :key="option.code">{{option.authName}}</option>
                                    
                                </select>
                            </div>
                            <!-- <div class="form-group">
                                <label class="mb-2" for="exampleFormControlSelect1">請選擇管理單位</label>
                                <select class="form-control" id="exampleFormControlSelect1" @change="changeUnit($event)">
                                    <option>{{currentUnit}}</option>
                                    <option v-for="unit in unitList" :key="unit.id">{{unit}}</option>
       
                                </select>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModel('start')">取消</button>
                    <button type="button" class="btn btn-primary" @click="saveEditedData()">儲存</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import {apiUpdateUser} from '@/apis/adminUser.js'
import {apiFindUnit} from '@/apis/adminGroup.js'
export default {
    name: "UpdateUnitModal_SystemAdmin",
    components: {

    },
    props: {
        selectedDetailData:{
            type:Object
        },
    },
    data() {
        return{
            selectedDetailData_copy:null,
            titleDetail:[
                {id:'role',title:'所屬單位',value:""},
                {id:'account',title:'用戶帳號',value:""},
                {id:'name',title:'用戶名稱',value:""},

            ],
            options:{
                role:[],

            },
            unitList:[
                {unit:'系統管理',id:1},
                {unit:'倉儲管理',id:2},
                {unit:'教務處註冊組',id:3},
                {unit:'教務處招生組',id:4},
            ],
            unitList:['系統管理','倉儲管理','教務處註冊組','教務處招生組'],
            currentUnit:'',
            config: {
                checkbox_rows: true,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
            },
        }
    },
    mounted: function () { 
        this.getFindUnit();
    },
    computed: {
    },
    methods:{
        getUpdateUser(){
            apiUpdateUser(
                {
                    account:this.titleDetail[1].value,
                    name:this.titleDetail[2].value,
                    role:this.titleDetail[0].value,
                    usersSeq:this.selectedDetailData_copy.usersSeq,
                    version:this.selectedDetailData_copy.version
                }).then((response)=>{
                    // console.log(response);
                    if(response.status===200){
                            this.$swal({
                                title: '修改成功',
                                text: "",
                                type: 'success',
                            })
                            .then((result)=>{   
                                if(result.value){
                                    this.$emit('updatedata');
                                    $('#UpdateUnitModal_SysyemAdmin').modal('hide');
                                }else{
                                    
                                }
                            });
                    }else{
                        this.$swal({
                                title: '修改失敗',
                                text: "",
                                type: 'error',
                        })
                    }
                   
            })
        },
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
        saveEditedData(){
            this.getUpdateUser();
        },
        closeModel(){

        }
    },
    watch: {

        selectedDetailData:function(){
            this.selectedDetailData_copy=Object.assign({}, this.selectedDetailData);
   
            for(let item in this.selectedDetailData_copy){
                for(let item2 in this.titleDetail){
                    if(item===this.titleDetail[item2].id){
                        this.titleDetail[item2].value=this.selectedDetailData_copy[item];
                    }
                }
                    
            }

        },
    }
};
</script>

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
