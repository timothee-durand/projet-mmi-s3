import axios from 'axios'
import param from '@/param/param.js'

export default {
  getApi(type) {



    return axios.get(param[type])
      .then(function (response) {
        return response.data;
      });

  },

  postAPI(type, params) {
    return axios.post(param[type], params ).then(reponse => {return reponse.data} );
  },

  putApi(type, params){
    return axios.put(param[type], params ).then(reponse => {return reponse.data} );
  }
}
