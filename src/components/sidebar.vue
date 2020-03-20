<template>
<div >
    <!-- style="height:22%" -->
    <nav class="navbar navbar-expand-lg ">
      <a class="navbar-brand" href="#" @click="goMainPage()">
        <img src="../assets/img/G.jpg" height="60" alt="">
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
     
      <div class="collapse navbar-collapse" id="navbarText">
        <!-- <ul class="navbar-nav mr-auto">

        </ul> -->

        <span class="form-inline my-2 my-lg-0">
            <span class="mr-3"><i class="fas fa-user-circle"></i>{{userid}}</span>
            <span class="mr-3"><i class="fas fa-clock"></i>登出倒數:{{time}}</span>
            <button class="btn btn-outline-info my-2 my-sm-0" type="submit" @click="signOut()"><i class="fas fa-sign-out-alt"></i>登出</button>
        </span>
      </div>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">

        <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button> -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li  v-if="$store.state.auth.web_auth['原始資料管理'].open!==undefined && $store.state.auth.web_auth['原始資料管理'].open" :class="['nav-item',type==='RawDataPlatformList'?'active':'']" @click="changeRouter('RawDataPlatformList')">
                    <a class="nav-link" href="#">原始資料管理 <span class="sr-only">(current)</span></a>
                </li>
                <li v-if="$store.state.auth.web_auth['同義詞管理']!==undefined&&$store.state.auth.web_auth['同義詞管理'].open " :class="['nav-item',type==='synWebList'?'active':'']" @click="changeRouter('synWebList')">
                    <a class="nav-link" href="#">同義詞管理</a>
                </li>
                <!-- <li v-if="$store.state.auth.web_auth['倉儲資料管理']!==undefined &&$store.state.auth.web_auth['倉儲資料管理'].open" :class="['nav-item',type==='ETLPlatform'?'active':'']" @click="changeRouter('ETLPlatform')">
                    <a class="nav-link" href="#">倉儲資料管理</a>
                </li> -->
                <!-- 20200320該系統權限預設打開 -->
                <li :class="['nav-item',type==='ETLPlatform'?'active':'']" @click="changeRouter('ETLPlatform')">
                    <a class="nav-link" href="#">倉儲資料管理</a>
                </li>
                <li v-if="$store.state.auth.web_auth['系統管理']!==undefined&&$store.state.auth.web_auth['系統管理'].open " :class="['nav-item','dropdown',type==='SystemAdminPlatform'?'active':'']">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    系統管理
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a v-if="$store.state.auth.web_auth!==null&&$store.state.auth.web_auth['系統管理']['帳號管理']!==undefined&&$store.state.auth.web_auth['系統管理']['帳號管理'].open " class="dropdown-item" href="#" @click="changeRouter('SystemAdminPlatform1')">帳號管理</a>
                        <a v-if="$store.state.auth.web_auth!==null&&$store.state.auth.web_auth['系統管理']['單位管理']!==undefined&&$store.state.auth.web_auth['系統管理']['單位管理'].open " class="dropdown-item" href="#" @click="changeRouter('SystemAdminPlatform2')">單位管理</a>
                        <a  class="dropdown-item" href="#" @click="changeRouter('SystemAdminPlatform3')">系統日誌</a>
                    </div>
                </li>
                <li class="nav-item active" >
                    <a class="nav-link " href="#">備援狀態<i class="fas fa-circle ml-2"></i></a>
                </li>
            </ul>
        </div>
    </nav>
    <!-- <div class="nav-bottom">
        <ul>
            <li :class="[type==='RawDataPlatformList'?'active':'']" @click="changeRouter('RawDataPlatformList')">
                <a href="#">原始資料管理</a>
            </li>
            <li :class="[type==='synWebList'?'active':'']"  @click="changeRouter('synWebList')">
                 <a href="#">同義詞管理</a>
            </li>
            <li :class="[type==='ETLPlatform'?'active':'']"  @click="changeRouter('ETLPlatform')"> 
                 <a href="#">倉儲資料管理</a>
            </li>
            <li :class="[type==='SystemAdminPlatform'?'active':'','secondStage']" @click="changeRouter('SystemAdminPlatform')">
                <a href="#">系統管理</a>
                <ul class="nav-dropdown">
                    <li>
                    <a href="#!">Web Design</a>
                    </li>
                    <li>
                    <a href="#!">Web Development</a>
                    </li>
                    <li>
                    <a href="#!">Graphic Design</a>
                    </li>
                </ul>
            </li>
    
            <li :class="[type===''?'active':'']">
                 <a href="#">備援狀態</a>
            </li>
        </ul>
    </div> -->


</div>
</template>

<script>
import auth from '@/apis/auth.js';
import {apiRoleAuth} from '@/apis/adminGroup.js';
export default {
    name: "sidebar",
    components: {
       
    },
    props: {
        msg: String,
        type:String,
        page:String

    },
    data() {
        return{
            Toggle:{
                asideOPen:true,
            },
            ToggleClass:{
                open:false
            },
            navList:[
                {title:'大專校院同義詞表',params:'Schoolsynonym'},
                {title:'畢業生流向',params:'GraSurveysynonym'},
            ],
            timeID:null
        }
    },
    created:function(){
        this.timeID=setInterval(()=>{
            this.$store.dispatch('auth/testLogin');
        },1000)
    },
    mounted: function () { 
        this.getApiRoleAuth();
    },
    computed: {
        time(){
            return this.$store.state.auth.time
        },
        userid(){
            return this.$store.state.auth.tokenInfo.userid
        }
    },
    methods:{
        // 回到登入頁面
        goMainPage(){
            this.$router.push({name:'MainPage'});
        },
        // 抓所有資料全限
        getApiRoleAuth(){
            apiRoleAuth({}).then((response)=>{
                    // console.log(response.data)
                    // 組格式
                    let objList={};
                    for(let item in response.data){
                        //   console.log(response.data[item])
                            let obj={
                                open:false,
                                main:'',
                            };
                            if(response.data[item].submanage===response.data[item].mainmanage){
                                obj.main=response.data[item].mainmanage;
                                this.$set(objList,response.data[item].mainmanage,obj)
                                console.log(objList)
                            }else {
                                this.$set(objList[response.data[item].mainmanage],response.data[item].submanage,obj)
                                objList[response.data[item].mainmanage][response.data[item].submanage].main=response.data[item].submanage;
                                console.log(objList)
                            }
                    }
                    console.log('objList---->',objList);


                let temp=this.$store.state.auth.tokenInfo.auth.split(',');
                let authList=[];
                for(let value of temp){
                    authList.push(parseFloat(value))
                }
                authList.sort(function (a, b) {
                    return a - b
                });
                // console.log(authList)
                let mainList=[];

                for(let item of authList){
                    for(let item2 in response.data){
                        
                        if(response.data[item2].roleid==item &&response.data[item2].mainmanage===response.data[item2].submanage &&mainList.indexOf(response.data[item2].mainmanage)<0){
                            mainList.push(response.data[item2].mainmanage);
                            objList[response.data[item2].mainmanage].open=true;
                            
                        }
                        // else if(response.data[item2].roleid==item&&response.data[item2].mainmanage!==response.data[item2].submanage){
                        else if(response.data[item2].roleid==item&&response.data[item2].mainmanage!==response.data[item2].submanage &&mainList.indexOf(response.data[item2].mainmanage)>=0){
                            objList[response.data[item2].mainmanage][response.data[item2].submanage].open=true;
                        }
                    }                
                   
                }
               
                this.$store.commit('auth/SET_WEB_AUTH',objList)
            })
        },
        // 切換主選單
        changeRouter(page){
            if(page==='RawDataPlatformList'){
                this.$router.push({name:'RawDataPlatform-1'})
            }else if(page==='synWebList'){
                this.$router.push({name:'synWeb-1'})
            }else if(page==='ETLPlatform'){
                this.$router.push({name:'ETLPlatform'})
            }else if(page==='SystemAdminPlatform'){
                this.$router.push({name:'SystemAdminPlatform-1'})
            }else if(page==='SystemAdminPlatform1'){
                this.$router.push({name:'SystemAdminPlatform-1'})
            }else if(page==='SystemAdminPlatform2'){
                 this.$router.push({name:'SystemAdminPlatform-2'})
                //  this.$router.push({path:'/SystemAdminPlatform/SystemAdminPlatform-2'})
                // /SystemAdminPlatform/SystemAdminPlatform-1
            }else if(page==='SystemAdminPlatform3'){
                 this.$router.push({name:'SystemAdminPlatform-3'})
            }
        },
        signOut(){
            this.getLogOutApi();
        },
        getLogOutApi(){
            console.log('getLogOutApi');
            // debugger;
            auth.logout({
                account:this.$store.state.auth.tokenInfo.userid
            })
            .then((response)=>{
                console.log('eraseCookie----->',response)
                this.$js.eraseCookie('leadtektoken');
                this.$store.state.auth.time=0;
                // debugger;
            })
            .then((response)=>{
                console.log('router----->',response)
                this.$router.push({name:'MainPage'});
                // debugger;
            })
            .catch((error)=>{
                console.log('error----->',error);
                //   debugger;
            })
        }


    },
    watch: {
        '$store.state.auth.isLogin':function(value){
            if(!value){
                console.log(this.$store.state.auth.isLogin)
                // this.$js.eraseCookie('token');
                // this.$store.state.auth.time=0;
                setTimeout(()=>{
                    this.getLogOutApi();                  
                },500)
                
            }
        },
        '$store.state.auth.web_auth':function(){
            console.log("web_auth change")
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fas.fa-circle{
    color:rgb(59, 218, 59);
}
.navbar-nav{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
}
.dropdown-menu{
    padding:0;
    background: #333; 
}
.dropdown-item{
    height:50px;
    display: flex;
    justify-content: center;
    line-height: 50px;
    color:#FFF;
}
.dropdown-item:hover{
     background: rgb(99, 98, 98); 
}

/* Toggle btn */
.rad-toggle-btn{
  /* color:var(--white); */
  font-size: 20px;
  line-height: 50px;
  margin-left: 10px;
  /* margin-left: 120px; */
  cursor: pointer;
  transition: all .3s ease-in-out;
 
}
.rad-toggle-btn.open{
  margin-left: 120px;
}
.rad-toggle-btn i{
  /* color:var(--white); */
  font-size: 30px;
}

/*左邊選單*/
.rad-sidebar {
  font-family:"Microsoft JhengHei";
  z-index: 100;
  position: fixed;
  font-weight: 600;
  background:var(--dark)!important;
  width: 400px;
  height: 100vh;
  /* top: 65px; */
  left: 0;
  bottom: 0;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 2px 4px 8px rgba(0, 0, 0, 0.28);
  transition: all .25s ease-in-out;
}
.fa-minus{
    color:#FFF;
    transition: all .3s ease-in-out;
    transform: translateX(-30px);
}
/*選項最外層*/
.rad-sidebar li {  
    display: flex;
    /* justify-content: center; */
    align-items: center;
    text-align: left;
    height: 70px;
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: .025em;
    /* line-height: 70px; */
    transform: translateX(-30px);
    transition: all 0.33s ease-in-out;
  
}
.rad-sidebar li:hover{
    transform: translateX(0px);
    /* background: rgb(175, 173, 173); */
}
.rad-sidebar li:hover .fa-minus{
 transform: translateX(0px);
}
.rad-sidebar li span {
    /* border-bottom: 1px solid #FFF; */
    text-decoration: none;
    display: block;
    /*color: #515d6e;*/
    color:#FFF;
    cursor: pointer;
}

.rad-sidebar.rad-nav-min {
    width: 0px !important;
    visibility: hidden;
    opacity: 0;
    -webkit-transform: translate(-225px, 0);
    transform: translate(-225px, 0);
    
}
.form-inline{
    flex-flow: row nowrap;
    position: absolute;
    right: 30px;
}

</style>
