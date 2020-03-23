<template>
  <div class="second-home">
    <div class="row p-5" >
        <div class="col-12">
            <div class="title  mb-3">
                <button type="button" class="btn btn-primary mr-2"  @click="BackToRawDataPlatformList()"><i class="fas fa-arrow-left mr-3"></i>BACK</button>
                原始資料管理 - {{$route.params.tablename}}
                <button type="button" class="btn btn-primary mx-2"  @click="addData()">新增</button>
                <button type="button" class="btn btn-primary mr-2"  @click="updateData()">匯入Excel</button>
            </div>
           
            <vue-bootstrap4-table  :rows="selectedRows" :columns="selectedColumns" :config="config" @on-change-query="onChangeQuery" :total-rows="total_rows">
                <!-- :actions="actions" @add-data="addData" @update-data="updateData" -->
                            <template slot="global-search-clear-icon" >
                                <i class="fas fa-times-circle"></i>
                            </template>
                            <template slot="simple-filter-clear-icon">
                                <i class="fas fa-times-circle"></i>
                            </template>
                            <!-- 處理姓名 -->
                            <template :slot="[item,'nameEyes'].join('-')" slot-scope="props" v-for="item in secretNameList" >
                                <div  class="outer-wrapper">
                                    <div  class="outer-wrapper">
                                        <div  class="inner-wrapper mr-3">
                                            <div v-if="props.row[item+'_Encryp_name']" >{{props.row[item]}}</div>
                                            <div v-if="!props.row[item+'_Encryp_name']" >{{props.row[item+'_original']}}</div>
                                        </div>
                                        <!-- _Encryp_name -->
                                        <i class="fas fa-eye" v-if="props.row[item+'_Encryp_name']&&props.row[item+'_Encryp_name']!==null&&props.row[item+'_Encryp_name']!==''"  @click="ToggleEncryption(props.row.id,'open',item)"></i>
                                        <i class="fas fa-eye-slash" v-if="!props.row[item+'_Encryp_name']&&props.row[item+'_Encryp_name']!==null&&props.row[item+'_Encryp_name']!==''" @click="ToggleEncryption(props.row.id,'close',item)"></i>
                                    </div>
                                </div>
                            </template>
                            <!-- 處理學號 -->
                            <template slot="stucodeEyes" slot-scope="props">
                                <div  class="outer-wrapper">
                                    <div  class="outer-wrapper">
                                        <div  class="inner-wrapper mr-3">
                                            <div v-if="props.row.Encryp_stucode" >{{props.row.StuCode}}</div>
                                            <div v-if="!props.row.Encryp_stucode" >{{props.row.StuCode_original}}</div>
                                        </div>
                                        <i class="fas fa-eye" v-if="props.row.Encryp_stucode&&props.row.Encryp_stucode!==null"  @click="ToggleEncryption(props.row.id,'open','stucode')"></i>
                                        <i class="fas fa-eye-slash" v-if="!props.row.Encryp_stucode&&props.row.Encryp_stucode!==null" @click="ToggleEncryption(props.row.id,'close','stucode')"></i>
                                    </div>
                                </div>
                            </template>
                            <!-- 處理學生id -->
                            <template slot="stuidEyes" slot-scope="props">
                                <div  class="outer-wrapper">
                                    <div  class="outer-wrapper">
                                        <div  class="inner-wrapper mr-3">
                                            <div v-if="props.row.Encryp_id" >{{props.row.StuID}}</div>
                                            <div v-if="!props.row.Encryp_id" >{{props.row.StuID_original}}</div>
                                        </div>
                                        <i class="fas fa-eye" v-if="props.row.Encryp_id&&props.row.Encryp_id!==null"  @click="ToggleEncryption(props.row.id,'open','stuid')"></i>
                                        <i class="fas fa-eye-slash" v-if="!props.row.Encryp_id&&props.row.Encryp_id!==null" @click="ToggleEncryption(props.row.id,'close','stuid')"></i>
                                    </div>
                                </div>
                            </template>
                            <template slot="edit" slot-scope="props">
                                <button
                                    style="white-space:nowrap"
                                    type="button"
                                    class="btn btn-info"
                                    data-toggle="modal"
                                    data-target="#EditModal2_RawData"
                                    @click="traceEditedData(props.row)"
                                >修改</button>
                            </template>
                            <template slot="editUnit" slot-scope="props" >
                                <button
                                style="white-space:nowrap"
                                    type="button"
                                    class="btn btn-info"
                                    @click="traceDelete(props.row)"
                                >刪除</button>
                            </template>
            </vue-bootstrap4-table>   
        </div>

        <editmodal2-rawdata :selectedDetailData="selectedDetailData" :selectedColumns="selectedColumns" @requestdata="getRequestdata"></editmodal2-rawdata>
        <insertmodal-rawdata :selectedColumns="selectedColumns"  @requestdata="getRequestdata"></insertmodal-rawdata>
        <uploadModal-rawData @requestdata="getRequestdata" :note="note"></uploadModal-rawData>
    </div>
  </div>
</template>

<script>
import sidebar from '../components/sidebar'
import VueBootstrap4Table from 'vue-bootstrap4-table';
import EditModal2_RawData from '../components/EditModal2_RawData';
import InsertModal_RawData from '../components/InsertModal_RawData';
import UploadModal_RawData from '../components/uploadModal_RawData';
import {apiQueryTableColumn} from '@/apis/rawData.js';
import {apiQueryTableValue} from '@/apis/rawData.js';
import {apiQuerysinglemt} from '@/apis/rawData.js';
import {apiDeleteTableColumns} from '@/apis/rawData.js';
export default {
    name: "RawDataPlatform",
    components: {
        VueBootstrap4Table,
        "sidebar":sidebar,
        "editmodal2-rawdata":EditModal2_RawData,
        "insertmodal-rawdata":InsertModal_RawData,
        "uploadModal-rawData":UploadModal_RawData
    },
    props: {

    },
    data() {
        return{
            Toggle:{
                eyes:true
            },
            selectedRows:[],
            selectedColumns:[],
            secretColumns:[],
            secretNameList:["StuNameC","TeaNameC"],
            config: {
                checkbox_rows: true,
                rows_selectable: false,
                show_refresh_button: false,
                show_reset_button:false,
                global_search: {
                     visibility: false,
                },
                server_mode:  true
            },

            note:[],
            //紀錄需要修改的單筆資料
            selectedDetailData:{},
            queryParams:null,
            total_rows:0
        }
    },
    mounted: function () { 
        // console.log(this.$route.params.uuid)
        this.getQueryTableColumn();
        this.getQuerysinglemt();
        // this.onChangeQuery();
    },
    computed: {
    },
    methods:{
        onChangeQuery(queryParams) {
            this.queryParams = queryParams;
            this.getQueryTableValue();
            console.log('onChangeQuery>',queryParams)
            // this.fetchData();
        },
        // 回到原始資料管理 
        BackToRawDataPlatformList(){
             this.$router.push({name:'RawDataPlatform-1'});
        },
        sortnum() {
            return function(a,b){
               return parseInt(a.sort) > parseInt(b.sort) ? 1 : -1;
            }
        },
        getRequestdata(){
            this.getQueryTableValue();
        },
        getQuerysinglemt(){
            apiQuerysinglemt({
                tableuuid:this.$route.params.uuid
            }).then((response)=>{
                console.log(response);
                this.total_rows=response.data.totalrow;
            })
        },
        // 取得該table的欄位
        getQueryTableColumn(){
            apiQueryTableColumn({
                tableuuid:this.$route.params.uuid
            }).then((response)=>{
                //  console.log(JSON.stringify(response, null, 2));
                console.log(response);
                
                this.selectedColumns=[];
                let obj1={label: "",
                    name: "edit",
                    slot_name: "edit"
                };
                let obj2={
                    label: "",
                    name: "editUnit",
                    slot_name: "editUnit"
                };
                this.selectedColumns.push(obj1);
                this.selectedColumns.push(obj2);

                for(let item in response.data.sort(this.sortnum())){

                    // 多一層判斷是否為加密欄位
                    if(response.data[item].encode==='*'){
                        this.secretColumns.push(response.data[item].columnename);
                    }

                    let obj={             
                        label: "",
                        name: "",
                        filter: {
                            type: "simple",
                            placeholder: ""
                        },
                        datatype:'',
                        sort: true,
                        column_classes: "class1",
                        option:null,
                        // slot_name:"nameEyes",
                    };
                    let note={
                        columnuuid:'',
                        columnename:'',
                        columncname:'',
                        datatype:''
                    };
                    const count=1;

                    if(response.data[item].note==='指定'){
                        note.columnuuid=response.data[item].columnuuid;
                        note.columnename=response.data[item].columnename;
                        note.columncname=response.data[item].columncname;
                        note.datatype=response.data[item].datatype;
                        this.note.push(note);
                    };

                    if(response.data[item].note==='下拉連動'){
                       
                        obj.label=response.data[item].columncname;
                        obj.name=response.data[item].columnename;
                        obj.datatype=response.data[item].datatype;
                        obj.option=[];
                        let secondLevelColumn=this.findOption(response.data,response.data[item].columnename);
                        // console.log(secondLevelColumn);

                        for(let item1 in response.data[item].option){
                            for(let item2 in response.data[item].option[item1]){
                                obj.option.push(item2);
                                // console.log(response.data[item].option[item1][item2].split(';'))
                                let arrayList=response.data[item].option[item1][item2].split(';');
                                let column1=arrayList[0];
                                let column2=arrayList[1];
                                let column3=arrayList[2];
                               for(let item3 in secondLevelColumn){
                                   
                                   if(secondLevelColumn[item3].note.indexOf('1')>=0){
                                       this.$set(secondLevelColumn[item3].option,item2,column1);
                                   }else if(secondLevelColumn[item3].note.indexOf('2')>=0){
                                       this.$set(secondLevelColumn[item3].option,item2,column2);
                                   }else if(secondLevelColumn[item3].note.indexOf('3')>=0){
                                       this.$set(secondLevelColumn[item3].option,item2,column3);
                                   }
                               }
                            }
                        }
                        // console.log(secondLevelColumn);
                        this.selectedColumns.push(obj); 
                        for(let arrayList in secondLevelColumn){
                            this.selectedColumns.push(secondLevelColumn[arrayList]); 
                        }   
                    }
                    else if(response.data[item].note===""||response.data[item].note===null||response.data[item].note==='指定'){
                        // response.data[item].note!=='下拉連動'||response.data[item].note.indexOf('自動代入')<0
                        // console.log(response.data[item].note)
                        obj.label=response.data[item].columncname;
                        obj.name=response.data[item].columnename;
                        obj.datatype=response.data[item].datatype;
                        if(response.data[item].columnename.toLowerCase().indexOf('namec')>0){
                            this.$set(obj,'slot_name',response.data[item].columnename+'-nameEyes');
                        }else if(response.data[item].columnename.toLowerCase().indexOf('stucode')>=0){
                            this.$set(obj,'slot_name','stucodeEyes');
                        }else if(response.data[item].columnename.toLowerCase().indexOf('stuid')>=0){
                            this.$set(obj,'slot_name','stuidEyes');
                        }
                        this.selectedColumns.push(obj);
                    }else if(response.data[item].note==='下拉'||response.data[item].note==='階層代入'){
                        // console.log(response.data[item].note)
                        // if(response.data[item].columnename==='ExchangeSchool'){
                        //     let arrayList=[];
                        //     let new_option={};
                        //     for(let item2 in response.data[item].option){
                        //         for(let item3 in response.data[item].option[item2]){
                        //             arrayList.push(item3);
                        //             this.$set(new_option,item3,response.data[item].option[item2][item3])
                        //         }
                        //     };
                        //     console.log(new_option)
         
                        //     for(let key in new_option['exchangeSchool']){
                        //         this.renderData(new_option[item][key].id,'exchangeCollege',new_option)
                        //     }
            
                        
                        // }
                        obj.label=response.data[item].columncname;
                        obj.name=response.data[item].columnename;
                        obj.datatype=response.data[item].datatype;
                        this.selectedColumns.push(obj);
                    }
                };
                                

               
            })
            .then((response)=>{
                this.getQueryTableValue();
            })
        },
        renderData(id,level,data){
            for(let item in data[level]){
                if(data[level][item].upLayer===id){
                    let obj={
                        value: '',
                        label: '',
                        children:[]
                    };
                    obj.value=data[level][item].id;
                    obj.label=data[level][item].name;
                    return obj;
                }
            }
        },
        findOption(data,columnename){
           console.log(data,columnename)
             let ColumneName=columnename.toLowerCase()
            let filterList=data.filter((item)=>{
                if(item.note!==null){
                    //  return item.note.indexOf('自動代入')>=0 ;
                       
                      return item.note.toLowerCase().indexOf(ColumneName)>=0
                }
               
            });
            console.log(filterList)
            let formatFilterList=[];
            for(let item in filterList){
                let obj={             
                    label: "",
                    name: "",
                    filter: {
                        type: "simple",
                        placeholder: ""
                    },
                    note:'',
                    datatype:'',
                    sort: true,
                    option:null
                };
                obj.label=filterList[item].columncname;
                obj.name=filterList[item].columnename;
                obj.datatype=filterList[item].datatype;
                obj.note=filterList[item].note;
                obj.option={};
                formatFilterList.push(obj);
            }
            console.log(formatFilterList)
            return formatFilterList;

        },
        replaceData(value,start,length,replacement){
            // return value=value+'A'
             return value.substr(0,start)+replacement+value.substr(start+length);;
        },
        // 取得該table的資料
        getQueryTableValue(){
            apiQueryTableValue({
                tableuuid:this.$route.params.uuid,
                pageno:this.queryParams.page-1,
                pagesize:this.queryParams.per_page
            }).then((response)=>{
                console.log('TableValue------>',response);

                // debugger;
                this.selectedRows=[];
                if(this.secretColumns.length>0){
                    for(let value of this.secretColumns){
                        // "StuNameC""StuCode""StuID""TeaNameC"

                        response.data.forEach((item)=>{
                            this.$set(item,value+'_original',item[value]);
                            if(value.toLowerCase().indexOf('namec')>=0){
                                 if(item[value]!==""){
                                    item[value]=this.replaceData(item[value],1,1,'*');
                                    this.$set(item,value+'_Encryp_name',true);
                                 }else{
                                    this.$set(item,value+'_Encryp_name',null);
                                 }

                     
                            }else if(value.toLowerCase().indexOf('stucode')>=0){
                                if(item[value]!==""){
                                    item[value]=this.replaceData(item[value],1,4,'****');
                                    this.$set(item,'Encryp_stucode',true);
                                }else{
                                      this.$set(item,'Encryp_stucode',null);
                                }
                              
                            }
                            else{
                               
                                 if(item[value]!==""){
                                      item[value]=this.replaceData(item[value],0,6,'******');
                                    this.$set(item,'Encryp_id',true);
                                 }else{
                                    this.$set(item,'Encryp_id',null);
                                 }
                              
                            }
                            
                        })

                    }
                }
                for(let item in response.data){
                    for(let item2 in response.data[item]){

                    }
                   
                }
                this.selectedRows=response.data;
            })
        },
        // 刪除單筆資料
        getDeleteTableColumns(valueuuid){
            apiDeleteTableColumns({
                valueuuid:valueuuid
            }).then((response)=>{
                // console.log(response);
                if(response.status===200){
                    this.$swal({
                        title: '成功刪除資料',
                        text: "",
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: '確認'
                    }).then((result)=>{
                        this.getQueryTableValue();
                    });
                              
                 
                }
            })
        },

        // trace【刪除】資料
        traceDelete:function(deleteData){
            // console.log(deleteData.valueuuid);
            // Call 刪除API
            this.getDeleteTableColumns(deleteData.valueuuid);
        },


        // 紀錄選擇【修改】的那筆資料
        traceEditedData:function(value){
            let value_cpoy=Object.assign({}, value);
            for(let item in value_cpoy){
                    if(item.toLowerCase().indexOf('namec')>0){
                        let name=item+'_original'
                        value_cpoy[item]=value_cpoy[name];
                    }else if(item.toLowerCase().indexOf('stucode')>=0){
                        let name=item+'_original';
                        value_cpoy[item]=value_cpoy[name];
                    }
            }

            this.selectedDetailData={};
            this.selectedDetailData=value_cpoy;

        },




        //【新增資料】
        addData(payload) {
            $('#InsertModal_RawData').modal('show');
        },
        //【接收新增資料】後(資後要改成重call API)
        getinsertNewData(message){
            console.log(message);
        },
        updateData(payload){
            $('#UploadModal_RawData').modal('show')
        },
        // 控制加密眼睛
        ToggleEncryption(id,type,column){
            console.log(id,type,column)
            this.selectedRows.find((row)=>{

                if(row.id===id){
                    for(let value in row){
                        console.log(value)
                        if(value===column){
                            if(type==='open'){
                                row[column+'_Encryp_name']=false;
                            }else if(type==='close'){
                                row[column+'_Encryp_name']=true;
                            }
                        }else if(column==='stucode'){
                            if(type==='open'){
                                row.Encryp_stucode=false;
                            }else if(type==='close'){
                                row.Encryp_stucode=true;
                            }
                        }
                        else if(column==='stuid'){
                            if(type==='open'){
                                row.Encryp_id=false;
                            }else if(type==='close'){
                                row.Encryp_id=true;
                            }
                        }
                    }
                    

                }

            })
        }

    },
    watch: {

    }
};
</script>
<style scoped>

.second-home{
    width:100%;
    height:80%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
}
.title{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-size: 1.3rem;
    font-weight: 900;
}
.outer-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
}
.add_describe{
    font-weight:600;
}
.syn_wrapper{
    height:100vh;
    overflow-y: scroll;
}
.modify_wrapper{
    height:100%;
    width:100%;
    display: flex;
    flex:1;
    justify-content: center;
    align-items: center;
}
.text-des{
   font-family: "Microsoft JhengHei";
}
.modify_btn{
    color: #FFF;
    height: 30px;
    text-align: center;
    padding: 3px;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(46, 164, 219);
    transition: all .2s ease-in-out;
}

.modify_btn:hover{
    transform: scale(1.05);
}
/* .fa-plus{
    background: cadetblue;
   
} */
.fa-minus{
    background: rgb(219, 62, 34);  
}
.fa-plus{
    background: cadetblue;
}
.modify_btn_change {
    color: #FFF;
    height: 30px;
    text-align: center;
    padding: 3px;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .2s ease-in-out;
    background: cadetblue;
}
.home{
    height:100vh;
    overflow-y: scroll;
}
.card {
    border: 0px ;
    /* background-color: var(--light-blue-border); */
    background-color:transparent;
    /* box-shadow: 0px 0px 7px 2px rgba(255,255,255,0.5); */
    background-color:rgba(255,255,255,0.1);
    /* min-width: 300px; */
    width: 100%;
    /* height:100%; */
    border-radius: 20px;
}
.card{
   /* background: #77A88D; */
    /* background: rgb(208, 212, 210); */
    box-shadow: 3px 3px 8px 2px rgb(128, 127, 127,0.7);
    /* border:10px solid #17a2b8 !important; */
}

</style>
