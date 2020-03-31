// rawData.js
import req from './https'

// 查詢所有表單
export const apiQueryAllTable =(params) => req('post','/api/etlcontroller/queryAllTable',params);

// 資料權限查找
export const apiQueryAuthGroup =(params) => req('post','/api/etlcontroller/Encryptiongroup',params);

// 資料權限修改
export const apiUpdateAuthGroup =(params) => req('post','/api/etlcontroller/updateEncryptiongroup',params);

// 排程修改
export const apiUpdateTime =(params) => req('post','/api/etlcontroller/updateTime',params);
//查找表單底下的group和欄位
export const apiQueryTableColumn =(params,tableName) => req('post','/api/etlcontroller/queryTableColumn/'+tableName,params);
