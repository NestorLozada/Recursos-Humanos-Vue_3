import Vue from "vue";
import VueRouter from "vue-router";
import jQuery from 'jquery';
import App from "./App.vue";

// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
window.$ = window.jQuery = jQuery;
import dotenv from 'dotenv';
dotenv.config()
// router setup
import routes from "./routes/routes";

import "./registerServiceWorker";
import { isLoggedIn } from './guards';

// plugin setup
Vue.use(VueRouter);
Vue.use(VueSweetalert2);
Vue.use(LightBootstrap);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "nav-item active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/');
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
});
