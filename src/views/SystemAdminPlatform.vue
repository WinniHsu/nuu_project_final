<template>
  <div class="home">
        <sidebar @changepage="getchangepage" :type="'SystemAdminPlatform'"></sidebar>
        <!-- <div class="row " > -->
            <router-view>
            </router-view>
        <!-- </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import sidebar from '../components/sidebar'

export default {
  name: "SystemAdminPlatform",
  components: {
     "sidebar":sidebar,

  },
  props:{
  },
  data: function() {
        return {
            config: {
                checkbox_rows: false,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
                // card_title: "Vue Bootsrap 4 advanced table"
            },
        }
  },
  mounted: function () { 
    let url = this.$route.fullPath;
    if(url.indexOf('RawDataPlatform')<0){
        this.$js.eraseCookie('current-page');
    };
  },
  computed: {

  },
  watch:{
        
 
  },
  methods: {
      getchangepage(){

      },
      handleClick(value){
            const arr = this.$route.fullPath.split("/");
            let url="";
            for(var i=0;i<arr.length-3;i++){
                url=url+arr[i]+"/";
            };
             if(value=="first"){
                url = url +'SystemAdminPlatform-1';
                console.log(url);
                this.$router.push(url);
             }else if(value=="second"){
                url = url +'SystemAdminPlatform-2';
                this.$router.push(url);
             }else if(value=="third"){
                url = url +'SystemAdminPlatform-3';
                this.$router.push(url);
             }
            // console.log(arr);
      }

  },

};
</script>
<style scoped>
.home{
    height:100vh;
    width:100vw;
    /* overflow-y: scroll; */
}
.outer-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
}
.list-group-item{
    background: #333;
    color:#FFF;
    border:1px solid #FFF;
}
.list-group-item:hover{
    background: rgb(102, 102, 102);
    color:#FFF;
    cursor: pointer;
}

</style>
