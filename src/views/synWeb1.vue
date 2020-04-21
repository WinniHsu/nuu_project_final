<template>
  <div class="second-home">
         <div class="row p-5" >
            <div class="col-12">  
                <vue-bootstrap4-table  :rows="rows" :columns="columns" :config="config">
                    <template slot="global-search-clear-icon" >
                        <i class="fas fa-times-circle"></i>
                    </template>
                    <template slot="simple-filter-clear-icon">
                        <i class="fas fa-times-circle"></i>
                    </template>
                    <template slot="edit" slot-scope="props">
                    <button
                        type="button"
                        class="btn btn-info"
                        data-toggle="modal"
                        data-target="#myModal"
                        @click="traceEdit(props.row)"
                    >編輯</button>
                    </template>

                </vue-bootstrap4-table>
            </div>
         </div>
  </div>
</template>

<script>
import sidebar from '../components/sidebar'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import loading from '../components/loading'
import {apiQueryAllSyn} from '@/apis/syn.js'
export default {
  name: "synListTemplate",
  components: {
        "sidebar":sidebar,
        VueBootstrap4Table,
        "loading":loading
  },
  props:{
  },
  data: function() {
        return {
            loadingShow:false,
            rows: [
                    // {
                    //     "tablename":'大專校院同義詞表',
                    //     "updatedate":'2020/02/03' ,
                    //     "id":'Schoolsynonym'
                    // },
                    // {
                    //     "tablename":'畢業生流向',
                    //     "updatedate":'2020/02/03' ,
                    //     "id":'GraSurveysynonym'
                    // },
                    // {
                    //     "tablename":'海外名單',
                    //     "updatedate":'2020/02/03',
                    //     "id":'Oversea'
                    // },
                    // {
                    //     "tablename":'休學代碼',
                    //     "updatedate":'2020/02/03',
                    //     "id":'Suspend'
                    // },
                    // {
                    //     "tablename":'交換校系',
                    //     "updateDate":'2020/02/03',
                    //     "id":'Transschool'
                    // },
                    // {
                    //     "tablename":'入學管道',
                    //     "updatedate":'2020/02/03',
                    //     "id":'Enrolltype'
                    // },
                    // {
                    //     "tableName":'退學代碼',
                    //     "updateDate":'2020/02/03',
                    //     "id":'Dropstu'
                    // },
                    // {
                    //     "tableName":'證照分級登錄表',
                    //     "updateDate":'2020/02/03',
                    //     "id":'licensetype'
                    // }
            ],
            columns:[
                {
                    label: "表單名稱",
                    name: "tablename",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "更新日期",
                    name: "updatedate",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "",
                    name: "clear",
                    slot_name: "edit"
                },
                {
                    label: "",
                    name: "export",
                    slot_name: "export"
                },
            ],
            config: {
                checkbox_rows: false,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
                global_search: {
                     visibility: false,
                }
                // card_title: "Vue Bootsrap 4 advanced table"
            },
        }
  },
  mounted: function () { 
      this.getQueryAllSyn();
    
  },
  computed: {

  },
  watch:{

 
  },
  methods: {
      getQueryAllSyn(){
        apiQueryAllSyn({}).then((response)=>{
            console.log('apiQueryAllSyn---->',response.data)
            for(let item in response.data){
                // console.log(this.$moment(response.data[item].updatedate).format('YYYY-MM-DD'));
                response.data[item].updatedate=this.$moment(response.data[item].updatedate).format('YYYY-MM-DD');
            }
            // array.sort(function(a,b){
            //     return a.localeCompare(b,"zh-Hant");
            // });
            this.rows=[];
            // id: "Dropstu"
            // tablename: "退學代碼"
            // updatedate: "2020-03-29"
            // for(let value of response.data){
            //     if(value.id==='Dropstu'){
            //          this.rows.push(value)
            //     }
            // }
            this.rows=response.data.sort(function(a,b){
                return a.tablename.localeCompare(b.tablename,"zh-Hant");
            });
        })
      },
      traceEdit(row){
        console.log(row);
        this.$router.push({name:'synWeb-2',params:{params:row.id,tableName:row.tablename}});

      },


  },

};
</script>
<style scoped>
.second-home{
    width:100%;
    height:80%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
}
</style>
