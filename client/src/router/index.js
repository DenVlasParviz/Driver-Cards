import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "/src/components/HomeView.vue";
import About from "/src/components/AboutView.vue";
import Contact from "/src/components/ContactView.vue";
import Weather from "/src/components/WeatherView.vue";
import SignUpPage from "/src/components/authentication/SignUpPage.vue";
import SignInPage from "/src/components/authentication/SignInPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/weather", component: Weather },
  {path:"/signup",component: SignUpPage},
  {path:"/login",component: SignInPage}
];

export default new VueRouter({
  mode: "history",
  routes,
});
