// syn.js
import req from './https'

export const apiQueryColumn =(params) => req('post','/api/schoolSynony/queryColumn',params);
export const apiQueryAllData =(params) => req('post','/api/schoolSynony/queryAllSchool',params);
export const apiDeleteMaster =(params) => req('post','/api/schoolSynony/deleteSchoolSynoymMaster/',params);

export const apiDeleteDetail =(params) => req('post','/api/schoolSynony/deleteSchoolSynoymDetail/',params);

// 請求同意詞資料
export const apiQuerySchoolDetail =(params) => req('post','/api/schoolSynony/querySchoolDetailBySchoolCode',params);

//  回傳詳細資料
export const apiInsertSchoolSynoymMaster =(SynonymType,params) => req('post','/api/schoolSynony/insertSchoolSynoymMaster/'+SynonymType,params);

//新增/修改同意詞API
export const apiInsertSchoolSynoymDetail =(SynonymType,params) => req('post','/api/schoolSynony/insertSchoolSynoymDetail/'+SynonymType,params);