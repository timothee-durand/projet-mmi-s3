//module VueX pour stocker l'utilisateur actif

const state = {
  user:{
    type:"GEST"
  }
};

const getters = {
  getUser(){
    return this.user;
  },

  isGest(){
    return this.type === "GEST";
  }
}

const mutations = {
  setUser(user){
    this.user = user;
  },


}


export default [
  state,
  mutations,
  getters,
]
