import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user.js'



Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
  },
  strict: debug,
})
