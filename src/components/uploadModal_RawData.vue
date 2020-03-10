<template>
<div class="modal fade" id="UploadModal_RawData" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <!-- <h1 class="modal-title" id="exampleModalLongTitle"></h1> -->
                <div class="title  mb-3">原始資料管理 - {{$route.params.tablename}} - 匯入Excel</div>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group mb-3" v-for="column in note_copy" :key="column.columnuuid">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">{{column.columncname}}</span>
                                </div>
                                <input type="text"  class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" v-model="column.value">
                            </div>
                            <div class="input-group mb-3 uploader-wrapper ">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile02" :disabled="upload_loading" @change="sendByAPI($event)">
                                    <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">{{uploadFileName}}</label>
                                </div>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" :disabled="loading" id="inputGroupFileAddon04" @click="readFile()">上傳</button>
                                </div>

                                <div v-if="blockPage" class="spinner-grow text-light ml-2" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
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
import {apiUpload} from '@/apis/rawData.js'
export default {
    name: "UpdateUnitModal_RawData",
    components: {

    },
    props: {
        note:{
            type:Array
        }
    },
    data() {
        return{
            blockPage: false, //控制loading
            uploadFile: undefined, //儲存檔案
            upload_loading:false,//瀏覽檔案的bar
            loading:false, //控制上傳的button
            uploadFileName:'選擇檔案.....',
            note_copy:[],
            params:{}
        }
    },
    mounted: function () { 

    },
    computed: {
    },
    methods:{
        sendByAPI(event){
            this.uploadFile = event.target.files[0];
            this.uploadFileName=this.uploadFile.name;
        },
        // 上傳
        readFile(){
            var readfile = new Promise((resolve, reject) => {
                let obj={};
                for(let item in this.note_copy){
                    this.$set(obj, this.note_copy[item].columnuuid,this.note_copy[item].value);
                };
                this.$set(obj, 'tableuuid',this.$route.params.uuid);
                this.params=obj;
                resolve();
            });
            readfile.then((res)=>{
                 this.uploadFileAction();
            });
            
        },
        async uploadFileAction(){
            // console.log("3")
            this.blockPage = true;//loading圖示
            this.loading=true; // 禁止使用者進行其他操作//禁止上傳
            this.upload_loading=true; //禁止瀏覽檔案
            const formData = new FormData();// 建立 FormData 物件，並將上傳的檔案加入其中
            formData.append('file', this.uploadFile);             
            // 透過 axios 以 HTTP POST 方法串接 API，並取得回傳資料
            await apiUpload(
                formData
            ,JSON.stringify(this.params))
            .then((response)=>{
                // console.log(response);
                    // 如果上傳成功
                    if(response.data==='成功匯入文件'){
                            // console.log("4")
  
                            this.uploadFile = undefined;//儲存檔案清空
                            this.uploadFileName='';//檔名刪除
                            this.$emit('requestdata');// 確定上傳後要重新request 資料庫資料
                            this.$swal({
                                title: '成功上傳資料',
                                text: "",
                                type: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: '確認'
                            }).then((result)=>{
                                // console.log("5")
                                for(let item in this.note){
                                    this.$set(this.note_copy[item],'value','')
                                };
                                $('#UploadModal_RawData').modal('hide');
                            
                            });
                    }else if(response.data ==='欄位錯誤'){
                        this.uploadFile = undefined;
                        this.uploadFileName='';
                        this.$swal({
                            title: '上傳資料失敗',
                            text: "欄位錯誤",
                            type: 'error',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '確認'
                        });
                         $('#UploadModal_RawData').modal('hide');
                    }
            })
            .catch((error)=>{
                    this.uploadFile = undefined;
                    this.uploadFileName='';
                    for(let item in this.note){
                        this.$set(this.note_copy[item],'value','')
                    }
                    this.$swal({
                        title: '上傳資料失敗',
                        text: "",
                        type: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: '確認'
                    });
            })
      

            this.blockPage = false;  //loading畫面停止
            this.loading=true; //上傳按鈕隱藏 
            this.upload_loading=false; //可以瀏覽檔案
        },
        closeModel(){

        },
        saveEditedData(){

        }
    },
    watch: {
        note:function(){
            // console.log("AA")
            this.note_copy=[];
            this.note_copy=this.note.concat();
            //  this.$set(this.note_copy[item],'value','')
            for(let item in this.note){
                // this.note_copy.push(this.note[item]);
                this.$set(this.note_copy[item],'value','')
            }

        }
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
</style>
