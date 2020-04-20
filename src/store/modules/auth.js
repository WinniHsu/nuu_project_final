import {js} from "../../assets/lib/lt-common"
// 管理身份認證的模組
export default {
    namespaced:true,
    state:{
        // token:"",//// 存放jwt token
        // token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJOREV4ZEdWemRERXciLCJyb2xlcyI6IjVyaXM2S21tNWJpejZKbWYiLCJyb2xlbmFtZSI6IjU3Tzc1N1d4NTY2aDU1Q0c2SUNGIiwiZXhwIjoxNTg2MTQxODY1LCJjcmVhdGVkIjoxNTg2MTQwMDY1MDU3LCJhdXRocyI6Ik1URXNNU3d4TWl3eUxETXNOQ3cxTERZc055dzRMRGtzTVRBPSJ9.eqd73HeHCLoQY8YP4v4Xrphw4m0Nh4CxYH-YyrAWOpIdKu0Ff7fEdkkqNSlMI3ofdGYggz-4iO7-Z0LDZVXe0A",
        token:"",
        isLogin:false,// 是否登入
        tokenInfo:{
            str: "",
            userid: "",
            auth: "",//系統權限
            roles:"",
            expiration: 0,
            created:0,
            rolename:''
        },
        time:0,
        web_auth:null
    },
    mutations:{
        SET_AUTH(state,options){
            state.token = options.token;
            state.isLogin = options.isLogin;

        },
        SET_TOKEN(state,options){
        //    console.log(options)
            state.token = options.token;
            state.isLogin = options.isLogin;
            var arr = options.token.split("\.");
            if (arr.length >= 3) {
              var claim = js.strToJson(js.base64Decode(arr[1]));

              state.tokenInfo.str = options.token;
              state.tokenInfo.userid = js.base64Decode(claim.sub);//login id
              state.tokenInfo.expiration = claim.exp;//過期時間
              state.tokenInfo.created = claim.created;
              state.tokenInfo.roles = js.base64Decode(claim.roles);
              state.tokenInfo.rolename = js.base64Decode(claim.rolename);
              state.tokenInfo.auth = js.base64Decode(claim.auths);
            //   state.tokenInfo.auth = JSON.parse(claim.auths);
            console.log(state.tokenInfo)

            }
        },
        IS_TOKEN_EXPIRED(state,options){
            var ret = true;
            if (state.tokenInfo.expiration > 0) {
                var now = Math.round(new Date().getTime() / 1000);
                ret = (state.tokenInfo.expiration < now) ? true : false;
                //true代表過期  false代表還沒過期
                // 計算倒數時間
                state.time=state.tokenInfo.expiration-now;
                // 改變isLogin狀態
                state.isLogin=!ret;

            }

        },
        SET_WEB_AUTH(state,options){
            console.log(options);
            state.web_auth=options;


        }
    },
    actions:{
        setAuth(context,options){
            context.commit('SET_AUTH',{
                token : options.token,
                isLogin : options.status
            });
        },
        setToken(context,token){
            context.commit('SET_TOKEN',{
                token : token
            });
        },
        isTokenExpired(context){
            context.commit('IS_TOKEN_EXPIRED')
        },
        testLogin: function(context) {
          
            // var ret = { status: false, token: "" };
            let token = "";
            //先取得token
            token = js.getCookie('leadtektoken');
            
            // 如果有token
            if (token != null) {
                // 就把token存在vuex
                context.dispatch('setToken',token);
                // 判斷他過期了沒
                // ret.status = !context.dispatch('isTokenExpired');
                context.dispatch('isTokenExpired');

            }

            // if (!ret.status) {
            //   js.eraseCookie('token');
            // }
            // return ret;
        },

    },
    getter:{

    }
}



