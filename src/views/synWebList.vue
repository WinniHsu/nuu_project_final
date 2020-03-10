<template>
  <div class="home">
        <loading v-if="loadingShow"></loading>
        <sidebar  :type="'synWebList'"></sidebar>
         <!-- <div class="row p-5" > -->
            <!-- <div class="col-12">   -->
                <router-view></router-view>
            <!-- </div> -->
         <!-- </div> -->
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
        this.$router.push({name:'synWeb',params:{params:row.id}});
      },


  },

};
</script>
<style scoped>
.home{
    height:100vh;
    width:100vw;
    /* overflow-y: scroll; */
}
</style>
