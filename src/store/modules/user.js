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
    },
    isAuthenticated(state){
      console.log(this)
      //regarde si il y a la propriété id a l'utilisateur stocké (objet initialisé à vide)
      return "id" in state.user.user;
    },
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



