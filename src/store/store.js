import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user.js'
import reservation from '@/store/modules/reservation.js'



Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    user:user,
    reservation:reservation,
  },

})
