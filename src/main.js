// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from '@/store/index.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/*Fontawesome*/
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import appService from '@/services/appService.js'

// utiliser bootstrap vue
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

//ajout axios vue
Vue.use(VueAxios, axios)

axios.defaults.headers = {
  "Authorization": "Bearer " + appService.getLocal()
}

//ajout vueX
Vue.use(Vuex)

// en dev
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
