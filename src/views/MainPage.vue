<template>
  <div class="mainPage">
  <!-- 20200320 -->
    <!-- <nav class="navbar navbar-expand-lg  fixed-top">
      <a class="navbar-brand" href="#">
        <img src="../assets/img/G.jpg" height="60" alt="">
      </a>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
            <span href="#" class="rad-toggle-btn" @click="closeAside()" >
            </span>
        </ul>
      </div>
    </nav>
    <div class="mainbody">
      <div class="container-fluid" style="height:100%;">
        <div class="row" >
          <div class="col-md-12">
              <div class="row row-position">
                <div class="form-container sign-in-container">
                  <form action="#">
                    <h1>登入</h1>
                    <div class="social-container">

                    </div>

                    <input type="email" placeholder="Email" v-model='account'/>
                    <input type="password" placeholder="Password" v-model='password'/>
                    <a href="#">Forgot your password?</a>
                    <button class="signin-btn" @click="signin()" >Sign In</button>
                  </form>
                </div>
             </div>
          </div>


        </div>
      </div>
    </div> -->
  <!-- 暫時關閉 -->
   <form name='redirect' action='https://sso.nuu.edu.tw/preLogin.php' method='POST'>
    <input type='hidden' name='system_name' value='NUUIR'>
    <input type='submit' value='submit'>
  </form> 
<!-- LeadtekEndServer -->
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {

  },
  data: function() {
        return {
          account:'',
          password:'',
          mainList:[
            {
              title:"原始資料管理",
              describe:"功能說明",
              src:require("../assets/img/sync.png"),
              route:'/RawDataPlatform'
            },
            {
              title:"同義詞管理",
              describe:"功能說明",
              src:require("../assets/img/language.png"),
              route:'/synWeb/Schoolsynonym'

            },
            {
              title:"倉儲資料管理",
              describe:"功能說明",
              src:require("../assets/img/data-warehouse.png"),
              route:'/ETLPlatform'
            },
            {
              title:"系統管理",
              describe:"功能說明",
              src:require("../assets/img/password.png"),
              route:'/SystemAdminPlatform'
            },
            {
              title:"備援狀態",
              describe:"功能說明",
              src:require("../assets/img/files-and-folders.png"),
              route:'/'
            },
          ]
        }
  },
  mounted: function () { 
    // <!-- 暫時關閉 -->
     document.redirect.submit(); 
  
  },
  computed: {

  },
  methods: {
    checkForm: function (e) {
        console.log(e);
    },
    signin(){
      this.$router.push({name:'SystemAdminPlatform-2'});
      // this.$router.push({path:'/synWeb/Schoolsynonym'});

    },
    signout(){
    
    }
  }
};
</script>
<style scoped>
.mainPage{
  height:100vh;
  width:100vw;
}
.mainbody{
  position: relative;
  top:100px;
  width:100%;
  height:100%;
}
.campus-style{
  background-image:url('../assets/img/compus.jpg') ;
   background-repeat:no-repeat;
  /* width:100%; */
  height:100%;
  background-size: contain;
  /* background-position:left bottom; */
}
.row-position{
  display: flex;
  height:100%;
  width:100%;
  justify-content: center;
  align-items: center;
  position: absolute;
   transition: all 0.6s ease-in-out;
  /* align-self: center; */
}

.shift-show{
  /* transform: translateY(1000px); */
  transition: all 0.6s ease-in-out;
}
.card-wrapper{
    height:100%;
  width:100%;
}
a {
	/* color: #333; */
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}
.card-img-top{
  width:10%;
}
.card-header{
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
button.signin-btn {
	border-radius: 20px;
	border: 1px solid #FF4B2B;
	background-color: #FF4B2B;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button.signin-btn:active {
	transform: scale(0.95);
}

button.signin-btn:focus {
	outline: none;
}

button.signin-btn.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
      transition: all 0.6s ease-in-out;
     
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}
</style>
