import Vue from 'vue'

// Custom Plugin
import { IconsPlugin, BSpinner } from 'bootstrap-vue'
Vue.use(IconsPlugin)
Vue.component('b-spinner', BSpinner)


// Global Plugin
// import { BootstrapVue } from 'bootstrap-vue'
// Vue.use(BootstrapVue)


// Style Plugin
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
