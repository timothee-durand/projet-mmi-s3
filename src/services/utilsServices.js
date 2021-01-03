import moment from 'moment'
import param from '@/param/param.js'

export default {
  //https://stackoverflow.com/a/40552372
  getFormData (object) {
    const formData = new FormData()
    Object.keys(object).forEach(key => formData.append(key, object[key]))
    return formData
  },
  getById(array, id){
    return array.filter(function (item){
      return item.id === id;
    })[0];
  },
  getByRef(array, ref){
    return array.find(el => el.ref === ref);
  },
  getByIncludes(array, toFind){
      return array.filter(function (item){
          return item.nom.toLowerCase().includes(toFind.toLowerCase());
      });
  },
  getOnlyDate(date){
    return moment(date, ["YYYY-MM-DD HH:mm:SS"], 'fr').format("DD/MM/YYYY");
  },
  getDate(date){
    return moment(date, ["YYYY-MM-DD HH:mm:SS"], 'fr').format("DD MMM YYYY - HH:mm");
  },
  getShortVersion (text) {
    if(text === null) {
      return ''
    } else {
      if(text.length < param.nbCaracShortText) {
        return text;
      } else {
        return text.slice(0, param.nbCaracShortText) + "...";
      }

    }

  },
  getCoolestError(error){
    console.log(error.response);
    let response = error.response;
    if(typeof response === 'object'){
      return response.data.message;
    } else {
      return response.data;
    }
  },
  alertError(error, context){
    context.$bvModal.msgBoxOk("Il y a eu un problème : "+ this.getCoolestError(error));
  },
  alertResult(result, context, message){
    context.$bvModal.msgBoxOk(message + "(" + result + ")");
  }
}
