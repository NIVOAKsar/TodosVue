// plugins
import "./plugins/element";
import "./plugins/bootstrap-vue";
import "./plugins/mq";

// styles
import "./assets/styles/main.css";

// vue ecosystem
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/filters";
import './registerServiceWorker'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
