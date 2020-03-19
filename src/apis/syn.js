// syn.js
import req from './https'
// 請求同意詞列表資料
export const apiQueryAllSyn =(params) => req('post','/api/schoolSynony/queryAllSyn',params);

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
// 新增主表同意詞
// export const apiInsertSchoolSynoymMaster =(SynonymType,params) => req('post','/api/schoolSynony/insertSchoolSynoymMaster/'+SynonymType,params);