// adminUser.js
import req from './https'
// 查詢
export const apiFindUser =(params) => req('post','/api/user/findUser',params);
// 修改
export const apiUpdateUser =(params) => req('post','/api/user/updateUser',params);
// 刪除
export const apiDeleteUser =(params) => req('post','/api/user/deleteUser',params);
// 新增
export const apiCreateUser =(params) => req('post','/api/user/createUser',params);
