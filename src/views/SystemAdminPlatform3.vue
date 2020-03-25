<template>
  <div class="second-home">
      <div class="row p-5" >
        <div class="col-12">
            <div class="title mb-3">
                系統日誌
            </div>
            <vue-bootstrap4-table  :rows="rows" :columns="columns" :config="config" >
                <!-- :actions="actions"  @add-data="addData" -->
                <template slot="global-search-clear-icon" >
                    <i class="fas fa-times-circle"></i>
                </template>
                <template slot="simple-filter-clear-icon">
                    <i class="fas fa-times-circle"></i>
                </template>


            </vue-bootstrap4-table>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import VueBootstrap4Table from 'vue-bootstrap4-table';
import {apiQueryLog} from '@/apis/adminGroup.js';
export default {
  name: "SystemAdminPlatform3",
  components: {
    VueBootstrap4Table,
  },
  props:{
  },
  data: function() {
        return {
            rows: [
            ],
            columns:[
                {
                    label: "userName",
                    name: "userName",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "operation",
                    name: "operation",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "objectName",
                    name: "objectName",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
                },
                {
                    label: "exeTime",
                    name: "exeTime",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    sort: true,
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
            },
            actions:[
                {
                    btn_text: "新增",
                    event_name: "add-data",
                    // event_name: "on-download",
                    class: "btn btn-info my-custom-class ",
                    event_payload: {
                        msg: "新增"
                    }
                }
            ],
        }
  },
  mounted: function () { 
      this.getapiQueryLog();
  },
  computed: {

  },
  watch:{
        
 
  },
  methods: {
    getapiQueryLog(){
      apiQueryLog({}).then((response)=>{
        console.log(response);
        this.rows=[];
        for(let item in response.data){
            response.data[item].exeTime= this.$moment(response.data[item].exeTime).format('YYYY-MM-DD')
        }
        this.rows=response.data;
      })
    }

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
.title{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-size: 1.3rem;
    font-weight: 900;
}
</style>
