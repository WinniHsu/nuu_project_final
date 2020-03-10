// apis/auth.js
/**
 * auth api
 */
import req from '@/apis/https.js'
const auth = {
    login(params){
        // 填入login api
        return req('post','/api/user/checktoken',params)
    }
}

export default auth;