<template>
<div>
    <div class="row p-5 mt-5">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <span class="badge badge-info mb-3 title">資料上傳</span>
                    <div class="input-group mb-3 uploader-wrapper ">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile02" :disabled="upload_loading" @change="sendByAPI($event)">
                            <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">{{uploadFileName}}</label>
                        </div>
                        <div class="input-group-append">
                            <!-- <span class="input-group-text" id="inputGroupFileAddon02">Upload</span> -->
                            <button class="btn btn-outline-secondary" type="button" :disabled="loading" id="inputGroupFileAddon04" @click="readFile()">上傳</button>
                        </div>
                        <!-- <div v-if="blockPage" class="spinner-border text-info ml-2" role="status">
                            <span class="sr-only">Loading...</span>
                        </div> -->
                        <div v-if="blockPage" class="spinner-grow text-light ml-2" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <!-- <div v-if="blockPage" class="block">
                            資料分析中...
                        </div> -->

                    </div>
                    
                    <!-- 檢測報告 -->
                    <div class=" mb-3 title2">最後更新時間&nbsp;:&nbsp;{{uploadReport.modifyTime}}</div>
                    <div class=" mb-3 title2">主表新增成功&nbsp;:&nbsp;{{uploadReport.main}}筆</div>
                    <div class=" mb-3 title2">主表新增失敗&nbsp;:&nbsp;{{uploadReport.mutimain}}筆</div>
                    <div class=" mb-3 title2">同義詞新增成功&nbsp;:&nbsp;{{uploadReport.detail}}筆</div>
                    <div class=" mb-3 title2">同義詞新增失敗&nbsp;:&nbsp;{{uploadReport.mutidetail}}筆</div>
                    <!-- <button type="button" class="btn btn-success mb-5 mr-3"  >下載LOG資訊</button> -->
                </div>
            </div>
        </div>
        <!-- <div class="col-sm-2">
            <div class="card " >
                <div class="card-body card-body-wrapper">
                    <span class="badge badge-info mb-3 title">主表新增LOG</span>
                </div>
            </div>
        </div>
        <div class="col-sm-2">
            <div class="card ">
                <div class="card-body card-body-wrapper">
                    <span class="badge badge-info mb-3 title">資料上傳LOG</span>
                </div>
            </div>
        </div>
        <div class="col-sm-2">
            <div class="card ">
                <div class="card-body card-body-wrapper">
                    <span class="badge badge-info mb-3 title">資料上傳LOG</span>
                </div>
            </div>
        </div>
        <div class="col-sm-2">
            <div class="card ">
                <div class="card-body card-body-wrapper">
                    <span class="badge badge-info mb-3 title">資料上傳LOG</span>
                </div>
            </div>
        </div> -->
    </div>
</div>
</template>

<script>

export default {
    name: "upload",
    props: {
        printColumns:{
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
            uploadReport:{},
            titleListOrigin:[]
        }
    },
    mounted: function () { 
        // request最後一次檢測報告
        this.init_querySchoolSynoymLog(this.$route.params.params);
         if(this.uploadFile==undefined){
              this.loading=true;
          }

    },
    computed: {

    },
    methods:{
        sendByAPI(event){
            
            this.uploadFile = event.target.files[0];
            this.uploadFileName=this.uploadFile.name;
            // console.log(this.uploadFile.name)
        },
        async uploadFileAction(){
            console.log("3")
            this.blockPage = true;//loading圖示
            this.loading=true; // 禁止使用者進行其他操作//禁止上傳
            this.upload_loading=true; //禁止瀏覽檔案
            const formData = new FormData();// 建立 FormData 物件，並將上傳的檔案加入其中
            formData.append('file', this.uploadFile);             
            // 透過 axios 以 HTTP POST 方法串接 API，並取得回傳資料
            await this.$axios.post( this.$js.baseURL+'/api/schoolSynony/getSynoymExcel/'+this.$route.params.params, formData)
            .then((res)=>{
                // 如果上傳成功
                if(res.status==200){
                        console.log("4")
                        console.log(res);
                        
                        this.onExportExcel(res);// 匯出成功後的excel
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
                            console.log("5")
                            this.init_querySchoolSynoymLog(this.$route.params.params);// request最後一次檢測報告
                        
                        });
                }else{
                    this.uploadFile = undefined;
                    this.uploadFileName='';
                    this.$swal({
                        title: '上傳資料失敗A',
                        text: "",
                        type: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: '確認'
                    });
                }

               
            })
            // .catch((error) => { 
            //     this.uploadFile = undefined;
            //     this.uploadFileName='';
            //     this.$swal({
            //         title: '上傳資料失敗A',
            //         text: "",
            //         type: 'error',
            //         confirmButtonColor: '#3085d6',
            //         confirmButtonText: '確認'
            //     });
            // });
     
            // ******************************************
            // 上傳之後，清空使用者上傳的檔案
            // this.uploadFile = undefined;
            // this.uploadFileName='';
            // 重新讓使用者操作畫面
            this.blockPage = false;  //loading畫面停止
            this.loading=true; //上傳按鈕隱藏 
            this.upload_loading=false; //可以瀏覽檔案
        },
        // 上傳
        readFile(){
            return new Promise((resolve, reject) => {
                var readfile= new Promise((resolve, reject) => {
                    
                        var fileReader = new FileReader();
                        var titleArray=[];
                        fileReader.onload = function(ev) {
                                try {
                                    var data = ev.target.result
                                    var workbook = XLSX.read(data, {type: 'binary'}) // 以二进制流方式读取得到整份excel表格对象
                                    var persons = []; // 存储获取到的数据
                                } catch (e) {
                                    console.log('文件类型不正确');
                                    return;
                                }
                                // 表格的表格范围，可用于判断表头是否数量是否正确
                                var fromTo = '';
                                // 遍历每张表读取
                                for (var sheet in workbook.Sheets) {
                                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                                        fromTo = workbook.Sheets[sheet]['!ref'];
                                        console.log(fromTo);
                                        persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                                        break; // 如果只取第一张表，就取消注释这行
                                    }
                                };
                            
                                for(let item in persons[0]){
                                    titleArray.push(item);
                                };
                                resolve(titleArray);
                        };
                        // 以二进制方式打开文件
                        fileReader.readAsBinaryString(this.uploadFile);
                   

                });

                readfile.then((res)=>{
                  
                    for(let item in res){
                        if(this.titleListOrigin.indexOf(res[item])<0){
                            // 有不符合的欄位
                            this.$swal({
                                    title: '資料欄位有誤',
                                    text: "請下載範例格式重新上傳資料",
                                    type: 'warning',
                            });
                          
                            return false;
                        }else{
                            // 全部符合欄位
                            console.log("1")
                            return true;
                        }
                    }
                    
                }).then((data)=>{
                    if(data){
                        console.log("2")
                        this.uploadFileAction();
                    }else{
                        
                    }
                  
                });


            });

        },
        // request最後一次檢測報告
        init_querySchoolSynoymLog:function(SynonymType){
            
            let init_querySchoolSynoymLog={url: this.$js.baseURL+"/api/schoolSynony/querySchoolSynoymLog/"+SynonymType, 
                                            params:{},
                                            method:"POST"};

            let _this=this;
            var p=this.$js.ajaxPromise200(init_querySchoolSynoymLog).then(function(data) {
                _this.uploadReport=data;
                console.log(SynonymType,data)

            });
            p.then(()=>{
               
            })
        },
        // 匯出excel
        onExportExcel: function(data) {     
            // console.log(data)
            var xls= [
                ["學校同意詞表"],
                ["新增成功代碼","新增成功名稱"]
            ];
            let arrayList=['mainInfo','mutimainInfo','detailInfo','mutidetailInfo']
            // xls.push(arow);
                // console.log(data[mainInfo])

            for(let item in data.data.mainInfo){
                var arow=[];
                arow.push(data.data.mainInfo[item].ID);
                arow.push(data.data.mainInfo[item].Name);

                if(data.data.detailInfo!==undefined){
                    for(let item2 in data.data.detailInfo[0]){
                        if(data.data.mainInfo[item].ID===item2){
                            arow.push(data.data.detailInfo[0][item2])
                        }
                    }
                }

            
                xls.push(arow);
                 
            }
            //設定格式
            var sheet = XLSX2.utils.aoa_to_sheet(xls);
            sheet["!merges"] = []; //宣告需要合併cell
            sheet["!cols"] = [ {wpx: 80}, { wpx: 120}, {wpx: 90}, {wpx: 80}, {wpx: 80}   ];  //設定 column 寬度
            sheet["A1"].s = {  //設定 A1 格式
                font: {
                    name: "Microsoft JhengHei",
                    sz: 30,
                    bold: true,
                    underline: true,
                    color: { rgb: "FFFFAA" }
                },
                alignment: { horizontal: "center", vertical: "center", wrap_text: true },
                fill: {
                    type: "pattern",
                    pattern:"solid",  // none / solid
                    fgColor:{rgb:"ac4587"},
                    //bgColor:{rgb:"ac4587"} //可不用
                }
            };
            sheet["!merges"].push(  //合併cell
                { s: { c: 0, r: 0 }, //start c=column,r=row
                e: { c: 4, r: 0 }  //end
                }
            );
            //console.log(sheet);
            openDownloadDialog(sheet2blob(sheet), "上傳成功紀錄檔.xlsx");
        },
    },
    watch: {
      '$route.params.params':function(){
           this.init_querySchoolSynoymLog(this.$route.params.params);
      },
      uploadFile:function(value){
          if(value==undefined){
            this.loading=true;
          }else{
            this.loading=false;
          }
      },
      printColumns:function(value){
        //   console.log(value)
          this.titleListOrigin.length=0;
          this.titleListOrigin=this.printColumns;
      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-body{
    /* border: 2px solid #17a2b8 !important; */
    border-radius: 10px;
    background-color: #17a2b8 !important;
    /* height:300px; */
}

.custom-file-label{
     border: 1px solid #FFF !important;
}
.custom-file-label::after{
    background-color: #17a2b8;
    color:#FFF;
}
.custom-file-input:lang(en)~.custom-file-label::after {
    content: "瀏覽檔案";
}
.btn-outline-secondary {
    color: #FFF;
    border-color: #FFF;
}
.title{
    font-size: 1.5rem;
}
.title2{
    color:#FFF;
    font-weight: 600;
    font-size: 1rem;
}
.card1{
    border:10px solid #77AAAD !important;
    background:#77AAAD;
}
.card2{
    border:10px solid #6E7783 !important;
    background:#6E7783;
}
.card3{
    border:10px solid #D8E6E7 !important;
    background:#D8E6E7;
}
.card4{
    border:10px solid #9DC3C1 !important;
    background:#9DC3C1;
}
/* style="background:#FBFFB9" */
</style>
