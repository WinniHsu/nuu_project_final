<template>
        <div class="load-wrapp">
            <div class="load-1">
                <!-- <p>Loading 1</p> -->
                <div class="line mr-2"></div>
                <div class="line mr-2"></div>
                <div class="line mr-2"></div>
            </div>
        </div>
</template>

<script>

export default {
    name: "",
    props: {
      
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

    },
    watch: {
      
    }
};
</script>
<style scoped>

.load-wrapp {
    float: left;
    position: absolute;
    z-index: 99999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    /* transform: translate(-50%,-50%); */
    /* margin: 0 10px 10px 0; */
    padding: 20px 20px 20px;
    border-radius: 5px;
    text-align: center;
    background-color: #d8d8d893;
}


.line {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #4b9cdb;
}

.load-1{
    /* width:100%; */
    /* height:100%; */
}


/* =Animate the stuff
------------------------ */
.load-1 .line:nth-last-child(1) {animation: loadingA 1.5s 1s infinite;}
.load-1 .line:nth-last-child(2) {animation: loadingA 1.5s .5s infinite;}
.load-1 .line:nth-last-child(3) {animation: loadingA 1.5s 0s infinite;}

@keyframes loadingA {
    0 {height: 15px;}
    50% {height: 35px;}
    100% {height: 15px;}
}

</style>
