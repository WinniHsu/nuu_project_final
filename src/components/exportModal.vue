<template>
<div class="modal fade bd-example-modal-xl search_model" id="exportModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <loading v-if="loadingShow"></loading>
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLongTitle">倉儲資料管理-匯出設定</h1>
            </div>
            <div class="modal-body">
                 <div class="container-fluid">
                    <div class="row outer-wrapper">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全選</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                      
                        <el-checkbox-group  v-model="checkedOptions" @change="handleCheckedCitiesChange">
                            <el-checkbox class="col-md-2 mb-3" v-for="city in options" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                      
                       
                    </div>
                     <button type="button" class="btn btn-success" @click="downloadColumns()">下載</button>
                </div>

            </div>
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import loading from '../components/loading';
import VueBootstrap4Table from 'vue-bootstrap4-table';
// import exportModal from '../components/exportModal';
export default {
    name: "exportModal",
    components: {
         VueBootstrap4Table,
         "loading":loading,
        // "export-modal":exportModal
    },
    props: {
        tableName:{
            type:String
        }
    },
    data() {
        return{
            loadingShow:false,
            checkAll: false,
            checkedOptions: [],
            checkedOptionsid:[],
            optionsRaw:[],
            options:[],
            optionsid:[],
            isIndeterminate: true,
            rows: [
                {
                    tableName:'課程學期資料',
                    type:'課程',
                    status:{
                        "status_name": "清洗程式啟動中...",
                        "status_time": "yyyy/mm/dd hh:mm:ss"
                    },
                    count:'12,345',

                },
                {
                    tableName:'課程學期資料',
                    type:'課程',
                    status:{
                        "status_name": "清洗程式啟動中...",
                        "status_time": "yyyy/mm/dd hh:mm:ss"
                    },
                    count:'12,345',

                }
            ],
            columns:[
                {
                    label: "表單名稱",
                    name: "tableName",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "類型",
                    name: "type",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "狀態",
                    name: "",
                    slot_name:"status",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "資料筆數",
                    name: "count",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "",
                    name: "clear",
                    slot_name: "clear"
                },
                {
                    label: "",
                    name: "export",
                    slot_name: "export"
                },
                {
                    label: "",
                    name: "schedule",
                    slot_name: "schedule"
                }
            ],
            config: {
                checkbox_rows: true,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
                // card_title: "Vue Bootsrap 4 advanced table"
            },
        }
    },
    mounted: function () { 

    },
    computed: {

    },
    methods:{
        handleCheckAllChange(val) {
            this.checkedOptions = val ? this.options : [];
            this.checkedOptionsid = val ? this.optionsid : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            // console.log(value);
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.options.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            this.checkedOptionsid.length=0;
            for(let item1 in value){
                for(let item2 in this.optionsRaw){
                    if(value[item1]===this.optionsRaw[item2].columnengname){
                        this.checkedOptionsid.push(this.optionsRaw[item2].columnname)
                    }
                }
            }
        },
        init_export_params:function(tableName){
        
            let init_export_params={url: this.$js.baseURL+"/api/etlcontroller/queryTableColumn/"+tableName, 
                                            params:{},
                                            method:"POST"};

            let _this=this;
            var p=this.$js.ajaxPromise200(init_export_params).then(function(data) {
                console.log(data);
                // debugger;
                _this.optionsRaw.length=0;
                _this.optionsRaw=data;
                _this.options.length=0;
                for(let item in data){
                    _this.options.push(data[item].columnengname);
                    _this.optionsid.push(data[item].columnname);
                }
            
            });
            p.then(()=>{
            
            });
        },
        downloadColumns(){
            this.loadingShow=true;
            this. init_downloadColumns_params(this.tableName);
        },
        init_downloadColumns_params:function(tableName){
            const fileName='資料匯出檔.xlsx'
            // this.$js.baseURL+ "/api/etlcontroller/export"
            this.$axios.post(this.$js.baseURL+ "/api/etlcontroller/export",
                            {columns:this.checkedOptionsid,tablename:tableName},
                            {responseType: 'blob'})
            .then((response) => {
                 this.loadingShow=false;
                console.log('資料匯出檔',response)

                const url = URL.createObjectURL(new Blob([response.data], {
                        type: 'application/vnd.ms-excel'
                }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            });
        },
    },
    watch: {
        tableName:function(val){
            // console.log("AA")
            this.init_export_params(this.tableName)
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer-wrapper{
    display: flex;
    flex-direction: column;
}
.load-wrapp{
    /* float: left; */
    position: fixed;
}
</style>
