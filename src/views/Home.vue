<template>
  <div class="home">
    <!-- <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
      <a class="navbar-brand" href="#">同義詞管理網站</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
     
        </ul>

        <form class="form-inline">
          <button class="btn btn-outline-info my-2 my-sm-0" type="submit"><i class="fas fa-sign-out-alt"></i>登出</button>
        </form>
      </div>
    </nav> -->
    <div class="outer-wrapper">
        <span class="website-title">同義詞管理平台</span>
        <div class="inner-wrapper">
            <img class="syn-pic" src="../assets/img/language.png">
            <div class="card m-3" style="width: 18rem;">
                <ul class="list-group list-group-flush">
                    <!-- <li class="list-group-item main-title">同義詞列表</li> -->
                    <li class="list-group-item list-item mt-1" v-for="(item,index) in list" :key="index" @click="handleClick(item.id)">
                        <!-- <router-link to="/synWeb"> -->
                            {{item.title}}
                        <!-- </router-link> -->
                    </li>
                </ul>
            </div>
        </div>
    </div>

  </div>
</template>

<script>

// import alertModal from '../components/alertModal';
export default {
  name: "home",
  components: {

    //  "alert-modal":alertModal
  },
  data: function() {
        return {
            list:[
                {id:'Schoolsynonym',title:'大專校院同義詞'},
                {id:'GraSurveysynonym',title:'畢業生問卷'},
                // {id:'',title:'畢業生問卷'},
                // {id:'',title:'畢業生問卷'},
                // {id:'',title:'畢業生問卷'},
                // {id:'',title:'畢業生問卷'},
                // {id:'',title:'畢業生問卷'},
                // {id:'',title:'畢業生問卷'},
            ]
        }
  },
  mounted: function () { 

  },
  computed: {

  },
  methods: {
      handleClick(param){
            const arr = this.$route.fullPath.split("/");
            let url="";
            for(var i=0;i<arr.length-3;i++){
                url=url+arr[i]+"/";
            }
        
            url = url +'/synWeb/'+param;
            this.$router.push(url);
            
      }
  }
};
</script>
<style scoped>
.syn-pic{
    height:50vmin;
}
.website-title{
    color:rgb(66, 141, 255);
    font-size: 3rem;
    font-weight: 600;
    margin-bottom:8px;
}
.outer-wrapper{
    height:100%;
    /* border-top:3px solid rgb(66, 141, 255); */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.inner-wrapper{
    
    height:55%;
    border-top:20px solid rgb(66, 141, 255);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.home{
    width:100vw;
    height:100vh;
}
.card{
    padding:3px;
    height:50vmin;
    overflow-y: scroll;

    position: relative;
    /* height:100%; */
    border: 0px solid;
     /* border-bottom:1px solid rgb(235, 232, 232); */
    /* box-shadow: 3px 3px 8px 2px rgb(128, 127, 127,0.7); */
   
}
.main-title{
    /* background: #343a40; */
    /* border:5px solid #11a8ab !important; */
      border:5px solid #17a2b8 !important;
    /* 17a2b8 */
    /* background: #11a8ab; */
    background: #17a2b8;
    text-align: center;
    padding: 13px 0;
    color:#FFF;
    font-weight:600;
    font-size: 2rem;
}
.list-item{
    /* padding-top: 20px; */
    font-weight:600;
    transition: all 0.33s ease-in-out;
    /* border-left:5px solid #11a8ab !important; */
    border-left:5px solid rgb(66, 141, 255) !important;
    /* margin-top:3px; */
    margin-bottom:3px;
    line-height: 30px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    /* padding-bottom:10px; */
    font-size: 1.2rem;
    border:0.5px solid rgb(199, 213, 233);
    cursor: pointer;
    color:rgb(66, 141, 255);
      /* padding: 20px auto !important; */
}
.list-group-flush .list-group-item:first-child {
    border-top-width: 1px;
    /* border-bottom-width: 1px; */
}
.list-group-flush:last-child .list-group-item:last-child {
    border-bottom-width: 1px;
}
.list-item:hover{
 /* background: #dcdfdf; */
 background: rgb(113, 197, 236);
 color:#FFF;
}
.list-group-item {

    /* border-bottom: 0px solid rgba(0,0,0,.125) !important; */
}
.list-group-item+.list-group-item {
    border-top-width: 1px;
}

</style>
