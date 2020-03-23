// rawData.js
import req from './https'

// 查詢所有表單
export const apiQueryAllTable =(params) => req('post','/api/rawdataUpload/queryalltable',params);
// 查詢單一表單欄位
export const apiQueryTableColumn =(params) => req('post','/api/rawdataUpload/querytablecolumn',params);
// 上傳資料
export const apiUpload =(params,string) => req('post','/api/rawdataUpload/upload?json='+encodeURIComponent(string),params);
// 查詢表單資料
export const apiQueryTableValue =(params) => req('post','/api/rawdataUpload/querytablevalue',params);

// 查詢單一表單資料
export const apiQuerysinglemt =(params) => req('post','/api/rawdataUpload/querysinglemt',params);

// 修改欄位
export const apiUpdateTableColumns =(params) => req('post','/api/rawdataUpload/update',params);
// 刪除資料
export const apiDeleteTableColumns =(params) => req('post','/api/rawdataUpload/delete',params);
// 新增資料
export const apiInsertTableColumns =(params) => req('post','/api/rawdataUpload/insert',params);

// 下載空白檔案
export const apiTableDownload =(params) => req('post','/api/rawdataUpload/download',params);

// 修改表單 
export const apiUpdateTable =(params) => req('post','/api/rawdataUpload/updatetable',params);
