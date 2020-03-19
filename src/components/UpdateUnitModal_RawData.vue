<template>
<div class="modal fade" id="UpdateUnitModal_RawData" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLongTitle">修改管理單位</h1>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <!-- 20200318修改為複選 -->
                                <!-- <label class="mb-2" for="exampleFormControlSelect1">請選擇管理單位</label>
                                <select class="form-control" id="exampleFormControlSelect1" @change="changeUnit($event)">
                                    <option>{{currentUnit}}</option>
                                    <option v-for="unit in this.options.role" :key="unit.code">{{unit.authName}}</option>
                                </select> -->
                                <el-select v-model="currentUnit" multiple placeholder="請選擇管理單位" value="AA">
                                    <el-option
                                    v-for="unit in this.options.role"
                                    :key="unit.code"
                                    :label="unit.authName"
                                    :value="unit.authName">
                                    </el-option>
                                </el-select>
                            </div>
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
import {apiFindUnit} from '@/apis/adminGroup.js';
import {apiUpdateTable} from '@/apis/rawData.js';
export default {
    name: "UpdateUnitModal_RawData",
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
            unitList:[
                {unit:'系統管理',id:1},
                {unit:'倉儲管理',id:2},
                {unit:'教務處註冊組',id:3},
                {unit:'教務處招生組',id:4},
            ],
            unitList:['系統管理','倉儲管理','教務處註冊組','教務處招生組'],
            // currentUnit:'',//2020/3/18本來為單選
            currentUnit:[],//2020/3/18改為複選
            config: {
                checkbox_rows: true,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
            },
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
        getUpdateTable(){
            apiUpdateTable({
                authName:this.currentUnit,
                creationDate: null,
                creationUser:null,
                fileextension:null,
                filepath:null,
                modifyDate:null,
                modifyUser:null,
                tablecode: this.selectedDetailData_copy.tablecode,
                tablename:this.selectedDetailData_copy.tablename,
                tableuuid: this.selectedDetailData_copy.tableuuid,
                version:this.selectedDetailData_copy.version
            }).then((response)=>{
                console.log(response);
                this.$emit('changeUnit')
            })
        },
        changeUnit(event){
            // console.log(event.target);
            this.currentUnit=event.target.value;
        },
        // 按下取消
        closeModel:function(){
            $('#UpdateUnitModal_RawData').modal('hide');
            // this.$emit("closeSecondModel");
        },
        // 按下確認
        saveEditedData:function(){
            this.$swal({
                title: '修改成功',
                text: "",
                type: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '確認'
            }).then((result)=>{
                this.getUpdateTable();
                $('#UpdateUnitModal_RawData').modal('hide');
                console.log("1")
               
            }).then(()=>{
                console.log("2")
                 
            });
        },
        // 取得管理單位
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

    },
    watch: {
        selectedDetailData:function(){
            this.selectedDetailData_copy=Object.assign({}, this.selectedDetailData);
            this.currentUnit=this.selectedDetailData.authName.split(',');
            // for(let item of this.selectedDetailData.unit){
            //     this.currentUnit.push(item)
            // }
            // this.currentUnit.push(this.selectedDetailData.unit)
        },
    }
};
</script>

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
