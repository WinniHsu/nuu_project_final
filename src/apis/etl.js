// rawData.js
import req from './https'

// 查詢所有表單
export const apiQueryAllTable =(params) => req('post','/api/etlcontroller/queryAllTable',params);

// 資料權限查找
export const apiQueryAuthGroup =(params) => req('post','/api/etlcontroller/Encryptiongroup',params);

// 資料權限修改
export const apiUpdateAuthGroup =(params) => req('post','/api/etlcontroller/updateEncryptiongroup',params);