//module VueX pour stocker l'utilisateur actif

export default {
  state: {
    user: {},
    userType :""
  },

  getters: {
    getUser () {
      return this.user
    },
    isGest () {
      return this.type === 'GEST'
    }
  },

  mutations : {
    setuser (state, user) {
      state.user = user;
    },
    setusertype (state, type) {
      state.userType = type;
    },
  }
}



