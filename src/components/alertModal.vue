<template>
    <button type="button" class="btn btn-secondary"  @click="showAlert">關閉</button>
</template>

<script>
import { isBoolean } from 'util'
export default {
    name: "alertModal",
    props: {
       safeBtn:{
           type:Boolean
       },
       check_syn_disabled:{
           type:Array,
           default:[]
       }
    },
    data() {
        return{

        }
    },
    mounted: function () { 
       

    },
    computed: {

    },
    methods:{
        
        showAlert() {
                //  檢查【左側詳細資料】或【右側同義詞】是否儲存，如果沒有儲存
                // this.$route.params.params==='Schoolsynonym'''GraSurveysynonym
                if(this.safeBtn==false||this.check_syn_disabled.length>0){
                    this.$swal({
                            title: '資料尚未儲存',
                            text: "是否幫您自動儲存資料",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: '取消',
                            confirmButtonText: '儲存',
                    })
                    .then((result)=>{   
                        if(result.value){
                            // 自動儲存，回傳詳細資料
                            this.$emit('updatedata');
                            // 關閉Modal
                            $('#myModal').modal('hide');
                        }else{
                            
                        }
                    });
                }else{
                    // 已儲存
                    // console.log('直接關掉')
                    this.$emit('checkadd');
                    $('#myModal').modal('hide');
                }
              

        },

    },
    watch: {
      
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
