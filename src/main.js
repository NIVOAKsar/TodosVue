// global plugins
import './plugins/element'
import './plugins/bootstrap-vue'
import './plugins/mq'
import './plugins/ripple'
import './plugins/vue-font-awesome'

// global styles (don't overrides the <App> styles)
// import './assets/styles/reset.css' // the line-height: 1 - problem width todos
import './assets/styles/main.css'
import './assets/styles/fonts.css'

// vue ecosystem
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//filters
Vue.filter('formatDate', (date, locale = 'en-US') => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(locale, options);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
