// http.js
import axios from 'axios'
// import router from '../router/index.js'
import store from '../store/modules/auth'
import {tip, toLogin, to403Page} from './utils.js'

/**
 * 請求失敗的統一處理
 * @param {Number} status 請求失敗的狀態馬
 */
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const errorHandle = (status,msg)=>{
    switch(status){
        // 400:登入失敗，可能是帳號密碼錯誤
        case 400:
            tip(msg);
            break;
        //401:backend session過期=> 移到check login去判斷 
        case 401:
            tip('登入過期，請重新登入');
            setTimeout(()=>{
                toLogin();
            },1000);
            break;
        // 403:權限不足
        case 403:
            to403Page();
            break;
        // 404:請求失敗
        case 404:
            tip(msg);
            break;
        // 其他錯誤，直接拋出提示錯誤
        default:
            console.log('resp沒有攔截到的錯誤:'+msg);
    }
}


// axios的實例
var instance = axios.create({
    baseURL:'http://203.64.173.63:9019',
    // http://ir.nuu.edu.tw:9019/
    // http://bigdata02.leadtek.com.tw:9019
    // http://172.16.2.109:9019
    // http://203.64.173.63:9019
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})
// request攔截器
instance.interceptors.request.use((config)=>{
    const token = store.state.token;
    token && (config.headers.Authorization = 'Bearer' + token);
    return config;
},(error)=>{
    return Promise.reject(error);
});



function usingCallback(callback) {
    const data = 'a message';
    callback(data);
}

usingCallback((m) => {  });



// request攔截器
instance.interceptors.request.use((response)=>{
    return response;
},(error)=>{
    const {response} = error;
    if(response){
        errorHandle(response.status,response.data.error);
        return Promise.reject(error);
    }else{
        if(!window.navigator.onLine){
            tip('網路出了點問題，請小夥伴重新連線後刷新網頁')
        }else{
            return Promise.reject(error);
        }
    }
});

// axios的實例
var instance2 = axios.create({
    baseURL:'http://203.64.173.63:9019',
    headers: {
        'responseType': 'blob'
    }
})



export default function(method,url,data=null){
    method = method.toLowerCase();
    if(method == 'post'){

        // return instance.post(url,data).then((response) => {
        //     // update the token to Vuex from cookie
        //     return response;
        // })

        return instance.post(url,data)
    }else if(method == 'get'){
        return instance.get(url,{params:data})
    }else if(method == 'delete'){
        return instance.delete(url,{params:data})
    }else if(method == 'put'){
        return instance.put(url,data)
    }else{
        console.log('未知的method'+method);
        return false;
    }
}




