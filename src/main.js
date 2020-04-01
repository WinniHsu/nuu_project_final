import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import axios from 'axios';
import moment from 'moment'
// import VueAxios from 'vue-axios';
import VueSweetalert2 from 'vue-sweetalert2';
import {js} from "./assets/lib/lt-common";
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.prototype.$moment = moment;
import {Checkbox,CheckboxGroup,Cascader,Select,Option,Collapse,CollapseItem} from 'element-ui';
// Vue.config.productionTip = true;
Vue.config.devtools = true;
Vue.use(VueSweetalert2);

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Cascader);
Vue.use(Select);
Vue.use(Option);
Vue.use(Collapse);
Vue.use(CollapseItem)
// Vue.use(Cascade);
// Vue.use(VueAxios, axios);
Vue.prototype.$axios=axios;
Vue.prototype.$js=js;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
