<template>
  <div id="app">

    <!-- <sidebar @changepage="getchangepage"></sidebar> -->
    <!-- <syn-template :columns="columns" :params="params"></syn-template> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import VueBootstrap4Table from 'vue-bootstrap4-table';
import sidebar from './components/sidebar'
import synTemplate from './components/synTemplate'
// import alertModal from '../components/alertModal';
export default {
  name: "home",
  components: {
    "sidebar":sidebar,
    "syn-template":synTemplate
  },
  data: function() {
        return {
            columns:[],
            params:'Schoolsynonym'
        }
  },
  mounted: function () { 
  },
  computed: {

  },
  methods: {
    
    getchangepage(value){
    //   console.log(value )
     this.init_queryColumn_params(value);
     this.params=value;

    },


  }
};
</script>
<style>

html,
body {
    font-size: 62.5%;
    font-family: "Microsoft JhengHei";
    width: 100%;
    height: 100%;
    /* height: 100vh; */
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
    background-color:#F29560
}

main.rad-nav-min{
    left: 180px;
}
main{
    position: absolute;
    left: 7px;
    top: 70px;
    right: 10px;
    transition: all .2s ease-in-out;
}

/**
 * html5doctor.com Reset Stylesheet v1.6.1 (http://html5doctor.com/html-5-reset-stylesheet/)
 * Richard Clark (http://richclarkdesign.com)
 * http://cssreset.com
 */
html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}
body {
    line-height:1;
}
article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section {
    display:block;
}
nav ul {
    list-style:none;
}
blockquote, q {
    quotes:none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content:'';
    content:none;
}
a {
    margin:0;
    padding:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}
/* change colours to suit your needs */
ins {
    /*background-color:#ff9;*/
    color:#000;
    text-decoration:none;
}
/* change colours to suit your needs */
mark {
    background-color:#ff9;
    color:#000;
    font-style:italic;
    font-weight:bold;
}
del {
    text-decoration: line-through;
}
abbr[title], dfn[title] {
    border-bottom:1px dotted;
    cursor:help;
}
table {
    border-collapse:collapse;
    border-spacing:0;
}
/* change border colour to suit your needs */
hr {
    display:block;
    height:1px;
    border:0;
    border-top:1px solid #cccccc;
    margin:1em 0;
    padding:0;
}
input, select {
    vertical-align:middle;
}
/* Let's get this party started */
::-webkit-scrollbar {
    width: 12px !important;
}
 
/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2); 
}
::-webkit-scrollbar-thumb:window-inactive {
	/* background: rgba(255,0,0,0.4);  */
}

</style>

<style>
/* table style */
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
.class1{
    /* position: absolute; */
    /* display: inline; */
    min-width:200px ;
}
.table thead th {
    /* vertical-align:none; */
    vertical-align: text-top;
    /* border-bottom: 2px solid #dee2e6; */
}

</style>
