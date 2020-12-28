import axios from 'axios'
import param from '@/param/param.js'

export default {
  getAllApi(type) {
    return axios.get(param[type])
      .then(function (response) {
        return response.data;
      });
  },

  getSingleApi(type, id) {
    return axios.get(param[type]+"/"+id)
      .then(function (response) {
        return response.data;
      });
  },


  postAPI(type, params) {
    return axios.post(param[type], params ).then(reponse => {return reponse.data} );
  },

  putApi(type, id, params){
    //return axios.put(param[type]+"/"+id, params ).then(reponse => {return reponse.data} );
    params.append("_method", "PUT");
    return axios.post(param[type]+"/"+id, params ).then(reponse => {return reponse.data} );
  },

  delApi(type, id){
    return axios.delete(param[type]+"/"+id).then(reponse => {return reponse.data} );
  },

}
