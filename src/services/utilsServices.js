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

}
