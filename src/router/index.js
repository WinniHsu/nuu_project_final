import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import synWeb_1 from "../views/synWeb1.vue"
import synWeb_2 from "../views/synWeb2.vue"
import synWebList from  "../views/synWebList.vue"
import ETLPlatform from "../views/ETLPlatform"
import MainPage from "../views/MainPage"
import RawDataPlatformList from "../views/RawDataPlatformList"
import RawDataPlatform_1 from "../views/RawDataPlatform1"
import RawDataPlatform_2 from "../views/RawDataPlatform2"
import SystemAdminPlatform from "../views/SystemAdminPlatform"
import SystemAdminPlatform_1 from "../views/SystemAdminPlatform1"
import SystemAdminPlatform_2 from "../views/SystemAdminPlatform2"
import SystemAdminPlatform_3 from "../views/SystemAdminPlatform3"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage
  },
  {
    // 同義詞首頁
    path: "/home",
    name: "home",
    component: Home
  },
  {
    // 同義詞List
    path: "/synWebList",
    name: "synWebList",
    component: synWebList,
    children:[
      {
        path:'/',
        redirect:'synWeb-1'
      },
      {
        path: "/synWeb-1",
        name: "synWeb-1",
        component: synWeb_1
      },
      {
        path: "/synWeb-2/:params/:tableName",
        name: "synWeb-2",
        component: synWeb_2
      },
    ]
  },

  {
    // ETL管理網站
    path: "/ETLPlatform",
    name: "ETLPlatform",
    component: ETLPlatform
  },
  {
    // 原始資料管理網站
    path: "/RawDataPlatformList",
    name: "RawDataPlatformList",
    component: RawDataPlatformList,
    // beforeEnter: function (to, from, next) {
    //   console.log('Hello beforeEnter.');
    //   next();
    // },
    children:[
      {
        path:'/',
        redirect:'RawDataPlatform-1'
      },
      {
          path: "/RawDataPlatform-1",
          name: "RawDataPlatform-1",
          component: RawDataPlatform_1
      },
      {
          path: "/RawDataPlatform-2/:uuid/:tablename",
          name: "RawDataPlatform-2",
          component: RawDataPlatform_2
      }
    ]
  },
  {
    // 系統管理網站
    path: "/SystemAdminPlatform",
    name: "SystemAdminPlatform",
    component: SystemAdminPlatform,
    children:[
      {
        path:'/',
        redirect:'SystemAdminPlatform-1'
      },
      {
        path:'SystemAdminPlatform-1',
        name:'SystemAdminPlatform-1',
        component:SystemAdminPlatform_1,
      },
      {
        path:'SystemAdminPlatform-2',
        name:'SystemAdminPlatform-2',
        component:SystemAdminPlatform_2,
      },
      {
        path:'SystemAdminPlatform-3',
        name:'SystemAdminPlatform-3',
        component:SystemAdminPlatform_3,
      },
    ]
  }

];

const router = new VueRouter({
  routes
});

export default router;
