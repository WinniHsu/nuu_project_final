// adminGroup.js
import req from './https'
// 查詢所有單位
export const apiFindUnit =(params) => req('post','/api/roleauth/roleAuth/find',params);
// 查詢所有權限分類
export const apiRoleAuth =(params) => req('get','/api/roleauth/roleAuth',params);
// 新增/修改group
export const apiSaveRole =(params) => req('post','/api/roleauth/roleAuth/save',params);
// 尋找特定group權限
export const apiFindOneUnitAuth =(params) => req('post','/api/roleauth/roleAuth/findone',params);
// 刪除group
export const apiDeleteRole =(params) => req('post','/api/roleauth/roleAuth/delete',params);

// 查詢log
export const apiQueryLog =(params) => req('post','/api/roleauth/log/find',params);

