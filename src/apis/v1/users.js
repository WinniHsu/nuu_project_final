// apis/v1/user.js
import req from '../https.js'

const users = {
    // 使用者資料
    detail(){
        return req('get','')
    }
}

export default users;