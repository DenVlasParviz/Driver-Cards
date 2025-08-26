import Vue from "vue";
import router from "/src/router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store/store";
import {setAuthToken} from "@/services/authentication";
const token = localStorage.getItem("token");
if(token){
  setAuthToken(token);
}
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

store.dispatch("vehicles/loadVehicle");

import App from "./App.vue";
Vue.config.productionTip = false;

new Vue({
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
