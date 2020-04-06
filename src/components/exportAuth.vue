<template>
<div class="modal fade bd-example-modal-lg search_model" id="exportAuth" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLongTitle">倉儲資料管理-匯出權限</h1>
            </div>
            <div class="modal-body">
                 <div class="container-fluid">
                    <div class="row outer-wrapper">
                        <div class="outer-wrapper2 mb-3">
                            <select class="form-control mr-2" style="flex:3" id="exampleFormControlSelect1" @change="changeAuthGroup">
                                <option v-if="authGroup.length>0 " v-for="(auth,index) in authGroup" :key="index" >{{auth}}</option>
                
                            </select>
                             <button :disabled="save" style="flex:1" type="button" class="btn btn-success" @click="updateAuthGroup()">更新</button>
                        </div>
                       <el-collapse v-model="activeNames" @change="handleChange" v-for="(groups,index) in this.filterUnit" :key="index">
                            <el-collapse-item :title="groups.group" :name="index">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th :class="[AllStatusC(groups.group)!=='0'?'style-color':'']"><i class="fas fa-eye" @click="changeAuth('group',groups.group,'0')">全選</i></th>
                                            <th :class="[AllStatusC(groups.group)!=='1'?'style-color':'']"><i class="fas fa-eye-slash"  @click="changeAuth('group',groups.group,'1')">全選</i></th>
                                            <th :class="[AllStatusC(groups.group)!=='2'?'style-color':'']"><i class="fas fa-times"  @click="changeAuth('group',groups.group,'2')">全選</i></th>
                                        </tr>
                                    </thead>  
                                    <tbody>
                                        <tr v-for="column in groups.columns" :key='column.id'>
                                            <th scope="row">{{column.columnname}}</th>
                                            <td :class="[column.status!=='0'?'style-color':'']"><i class="fas fa-eye" @click="changeAuth('columnId',column.id,'0')"></i></td>
                                            <td :class="[column.status!=='1'?'style-color':'']"><i class="fas fa-eye-slash" @click="changeAuth('columnId',column.id,'1')"></i></td>
                                            <td :class="[column.status!=='2'?'style-color':'']"><i class="fas fa-times" @click="changeAuth('columnId',column.id,'2')"></i></td>
                                        </tr>
                                    
                                    </tbody>
                                </table>
                             </el-collapse-item>
                        </el-collapse>

                      
                       
                    </div>
                     
                </div>

            </div>
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import {apiFindUnit} from '@/apis/adminGroup';
import {apiQueryAuthGroup}  from '@/apis/etl';
import {apiUpdateAuthGroup} from '@/apis/etl';
import {apiQueryTableColumn} from '@/apis/etl';
import VueBootstrap4Table from 'vue-bootstrap4-table';
// import exportModal from '../components/exportModal';
export default {
    name: "exportAuth",
    components: {
         VueBootstrap4Table,
        // "export-modal":exportModal
    },
    props: {
        tableName:{
            type:String
        },
        id:{
            type:Number
        }
    },
    data() {
        return{
            save:true,
            activeNames: ['1'],
            authGroup:[],
            authList:{},
            temp:{},
            currentAuthGroup:'',
            rows_copy:[],
            rows: [
                // {
                //     creationDate: null,
                //     creationUser: null,
                //     modifyDate: null,
                //     modifyUser: null,
                //     version: 0,
                //     id: 7,
                //     tablename: "學生學籍維度",
                //     authName: "Test1",
                //     columngroup: "個人資料",
                //     etlauth: "2"
                // }
            ],
        }
    },
    mounted: function () { 
        // this.getFindUnit();
        // this.loadJSON('winni.json',(res)=>{
        //     this.temp=res;
        //     // console.log('AA',res)
        // });
    },
    computed: {
        filterUnit(){
                const raw=this.authList;
                const allowed = this.currentAuthGroup;
                let authList=[];
                const filtered = Object.keys(raw)
                .filter(key => allowed.includes(key))
                .reduce((obj, key) => {
                    obj[key] = raw[key];
                    return obj;
                }, {});
                // console.log('filtered',filtered);
                if(allowed!==''){
                     authList=filtered[allowed].auth;
                }
                return authList;
        },
        AllStatusC(){
            return function(group){
                 let allStatus="3";
                for(let item of this.filterUnit){
                    if(item.group===group){
                        let len=item.columns.length;
                        let status0=0;
                        let status1=0;
                        let status2=0;
                       
                        for(let item1 of item.columns){
                            if(item1.status==='0'){
                                status0++
                            }else if(item1.status==='1'){
                                status1++
                            }else if(item1.status==='2'){
                                status2++
                            }
                        }
                        if(status0===len){
                            allStatus='0'
                        }else if(status1===len){
                             allStatus='1'
                        }else if(status2===len){
                             allStatus='2'
                        }
                    }
                }
       
                return allStatus;
            }    
        }
    // filterUnit:[
        // {
    //      columns:Array[22]
    //      group:"學籍資訊"
        // }
    // ],
    },
    methods:{
        handleChange(val) {
            console.log(val);
        },
        loadJSON(jsonName, callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open("GET", jsonName, true); // Replace 'my_data' with the path to your file
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                console.log('responseText',xobj.responseText)
                callback(JSON.parse(xobj.responseText));
                }
            };
            xobj.send(null);  
        },
        // 單位變動
        changeAuthGroup(e){
            this.currentAuthGroup=e.target.value;
            // this.getQueryAuthGroup();
        },
        // 權限變動
        changeAuth(type,id,status){
          
            this.save=false;
        
                if(type==='group'){
                    for(let groups in this.filterUnit){
                        if(this.filterUnit[groups].group===id){
                            for(let column of this.filterUnit[groups].columns){
                                column.status=status;
                            }
                        }
                    };
                }else if(type==='columnId'){
    
                    for(let groups in this.filterUnit){
                        for(let column of this.filterUnit[groups].columns){
                            if(column.id===id){    
                                column.status=status;
                            }
                        }
                    };
                };
           
            // var updateData = new Promise((resolve, reject)=>{
            //     for(let item in this.filterUnit){
            //         if(this.filterUnit[item].id===id){   
            //             this.filterUnit[item].status=type;
            //         }
            //     };
            //      resolve();
            // })
            // updateData.then((res)=>{
                
            // })
           

        },
        // 確定更新資料
        updateAuthGroup(){
            // {
                // "id":2,
                // "columnengname":"stuStatus",
                // "columnname":"身分別",
                // "authName":[
                // "註冊組:0"
                // ]
            // }
              // filterUnit:{
                //     columns:[
                //         {
                //             columnengname:"StuStatus",
                //             columnname:"身分別",
                //             id:2,
                //             status:"0"
                //         }
                //     ]
                //     group:"學籍資訊"
                // }
            let paramArray=[];
          
            let updateAuthGroup=new Promise((resolve, reject)=>{
                for(let item in this.filterUnit){
                   

                    for(let column of this.filterUnit[item].columns){
                        //  console.log(this.filterUnit[item].group,column);
                        let obj={
                                id:null,
                                columnengname:"",
                                columnname:"",
                                authName:[]
                        }
                        obj.id=column.id;
                        obj.columnengname=column.columnengname;
                        obj.columnname=column.columnname;
                        obj.authName[0]=this.currentAuthGroup+':'+column.status;
                        paramArray.push(obj);
                    }
                   
                   resolve(paramArray);
                }
                 
            });
            updateAuthGroup.then((res)=>{
                console.log(res);
                this.getUpdateAuthGroup(res);
            })
        },
        getUpdateAuthGroup(res){
            apiUpdateAuthGroup(
                res
            ).then((response)=>{
                console.log(response);
                if(response.status===200){
                    // this.getQueryAuthGroup();
                    this.getFindUnit();
                }
            });
            
        },

        // 查找所有單位
        getFindUnit(){
            apiFindUnit({})
            .then((response)=>{
                console.log('查找所有單位',response.data)
                this.rows=JSON.parse(JSON.stringify(response.data));
                this.authGroup=[];
                for(let item in response.data){
                    this.authGroup.push(response.data[item].authName);
                    let obj={
                        authName:'',
                        auth:[]
                    }
                    obj.authName=response.data[item].authName;
                    this.$set(this.authList,response.data[item].authName,obj)
                };
               
            })
            .then(()=>{
                this.getQueryTableColumn();
                this.currentAuthGroup=this.authGroup[0];
            })
            .then(()=>{
              
            })
        },
        // 查找群組和欄位
        getQueryTableColumn(){
            apiQueryTableColumn({},this.tableName)
            .then((response)=>{
               
                // response.data=this.temp;
                 console.log('查找群組和欄位----->',response.data);
                //  debugger;
                for(let item in response.data){
                    // item=註冊組
                    for(let item2 in this.authList){
                        let obj={
                            group:'',
                            columns:[],
                            status:null
                        }
                        obj.group=item;
                        for(let item3 of response.data[item]){
                            let obj2={
                                id: null,
                                columnengname: "",
                                columnname: "",
                                status:"0"
                            }
                            obj2.id=item3.id;
                            obj2.columnengname=item3.columnengname;
                            obj2.columnname=item3.columnname;
                            obj.columns.push(obj2);
                        }
                       
                        this.authList[item2].auth.push(obj);
                    }
                }

                for(let unit of this.authGroup){
                    // console.log(value)
                     var updateData = new Promise((resolve, reject)=>{
                         let matchColumns = this.getAuth(unit,JSON.parse(JSON.stringify(response.data)));
                         resolve({unit,matchColumns});
                     });

                    
                    // console.log('columns----->',unit,columns)

                    updateData.then(({unit,matchColumns})=>{
                        // console.log('res',unit,matchColumns)
                        // let countMainObj={}
                        // let countSubObj={
                        //     length:0,
		                //     count:0
                        // };
                        
                        for(let groupOp of this.authList[unit].auth){
                        //     this.$set(countMainObj,groupOp.group,countSubObj);
                        //    countMainObj.length= groupOp.columns.length;
                            // groupOp=[
                            //     {
                            //         columns:Array[22]
                            //         group:"學籍資訊",
                            //         status:null
                            //     }
                            // ]
                            // matchColumns回傳匹配
                            // {
                            //     id: 2
                            //     columnengname: "stuStatus"
                            //     columnname: "身分別"
                            //     authName: (3) ["綜合業務組:0", "註冊組:2", "系統管理者:1"]
                            //     group: "學籍資訊"
                            //     status: "2"
                            // }
                            for(let matchColumn of matchColumns){
                                if(matchColumn.group===groupOp.group){
                                    for(let column of groupOp.columns){
                                        // groupOp.columns
                                        // [
                                        //     {columnengname:"stuStatus"
                                        //     columnname:"身分別"
                                        //     id:2
                                        //     status:0}

                                        // ]
                                        if(column.columnengname===matchColumn.columnengname){
                                            column.status=matchColumn.status
                                        }
                                    }
                                
                                }
                            }
                        }
                    })

                    
                }
            })
            .then((response)=>{
                // const raw=this.authList;
                // const allowed = this.currentAuthGroup;
                //  const filtered = Object.keys(raw)
                // .filter(key => allowed.includes(key))
                // .reduce((obj, key) => {
                //     obj[key] = raw[key];
                //     return obj;
                // }, {});

                // console.log(filtered);
                // this.getQueryAuthGroup();
            })
        },
        getAuth(unit,data){
            let ArrayList=[];
            for(let item in data){
                for(let item2 of data[item]){
                    // console.log(item2.authName,unit,item2.authName.indexOf(unit))
                        let authname=item2.authName.filter(e=>{
                            // console.log(e,e.indexOf(unit))
                            return e.indexOf(unit)>=0
                        });
                        // console.log('authname----->',authname)

                        if(authname.length>0){
                            // console.log(authname)
                            // console.log(item2.authName,item2.authName[])
                            this.$set(item2,'group',item);
                            // console.log(authname[0].substring(authname[0].length-1,authname[0].length))
                             
                            this.$set(item2,'status',authname[0].substring(authname[0].length-1,authname[0].length));
                           
                            ArrayList.push(item2)    
                        }
                    // if(item2.authName.indexOf(unit)>=0){
                
                      
                    // }

                }
            }
            return ArrayList;
        },
        // 查找特定單位權限
        getQueryAuthGroup(){
            apiQueryAuthGroup({
                authName:this.currentAuthGroup,
                tablename:this.tableName
            }).then((response)=>{
                  console.log('查找特定單位權限',response);
                this.rows=[];
                this.rows=response.data;
                this.rows_copy=[];
                this.rows_copy=  JSON.parse(JSON.stringify(this.rows));

              
              
            })
        },
   

    },
    watch: {
        tableName:function(val){
            // console.log("AA")
             this.getFindUnit();
            // this.init_export_params(this.tableName)
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer-wrapper{
    display: flex;
    flex-direction: column;
}
.outer-wrapper2{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.style-color{
    color:rgb(184, 177, 177);
}
</style>
