//module VueX pour stocker l'utilisateur actif

export default {
  state: {
    user: {},
    userType :""
  },

  getters: {
    getUser (context) {
      return context.user
    },
    isGest (context) {
      return context.userType === 'GEST'
    },
    isAuthenticated(context){
      //regarde si il y a la propriété id a l'utilisateur stocké (objet initialisé à vide)
      return "id" in context.user;
    },
  },

  mutations : {
    setuser (state, user) {
      state.user = user;
    },
    setusertype (state, type) {
      state.userType = type;
    },
    resetUser(state){
      state.user = {};
      state.userType = "";
    }
  }
}



