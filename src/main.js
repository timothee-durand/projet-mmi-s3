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
import './styles/custom-bootstrap.scss'

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
  'Authorization': 'Bearer ' + appService.getLocal()
}

//ajout vueX
Vue.use(Vuex)


//ajout google maps
import * as GmapVue from 'gmap-vue'

Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyChc9PPkTuh3w_BmUT4RgWYMZUK194x5P4',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'gmap-vue/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})

// en dev
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
