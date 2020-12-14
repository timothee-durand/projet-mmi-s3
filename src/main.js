// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/*Bootstrap*/
import BootstrapVue from 'bootstrap-vue'
import './styles/custom-bootstrap.scss'

/*Fontawesome*/
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// utiliser bootstrap vue
Vue.use(BootstrapVue)

// en dev
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
