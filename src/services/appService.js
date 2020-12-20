import param from "../param/param.js";


export default {
  //utilisation localStorage

  //lecture
  getLocal (){
    return localStorage.getItem(param.keyTokenLocal);
  },

  //maj
  setLocal (valeur){
    localStorage.setItem(param.keyTokenLocal, valeur);
  },

  //suppression
  removeLocal(){
    localStorage.removeItem(param.keyTokenLocal);
  }
}
