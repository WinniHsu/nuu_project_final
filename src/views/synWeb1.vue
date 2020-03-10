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
                    {
                        "tableName":'大專校院同義詞表',
                        "updateDate":'2020/02/03' ,
                        "id":'Schoolsynonym'
                    },
                    {
                        "tableName":'畢業生流向',
                        "updateDate":'2020/02/03' ,
                        "id":'GraSurveysynonym'
                    },
                    {
                        "tableName":'海外名單',
                        "updateDate":'2020/02/03',
                        "id":'Oversea'
                    },
                    {
                        "tableName":'休學代碼',
                        "updateDate":'2020/02/03',
                        "id":'Suspend'
                    },
                    {
                        "tableName":'交換校系',
                        "updateDate":'2020/02/03',
                        "id":'Transschool'
                    },
                    {
                        "tableName":'入學管道',
                        "updateDate":'2020/02/03',
                        "id":'Enrolltype'
                    },
                    {
                        "tableName":'退學代碼',
                        "updateDate":'2020/02/03',
                        "id":'Dropstu'
                    },
                    {
                        "tableName":'證照分級登錄表',
                        "updateDate":'2020/02/03',
                        "id":'licensetype'
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
                    label: "更新日期",
                    name: "updateDate",
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

    
  },
  computed: {

  },
  watch:{

 
  },
  methods: {
      traceEdit(row){
        console.log(row);
        this.$router.push({name:'synWeb-2',params:{params:row.id,tableName:row.tableName}});

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
