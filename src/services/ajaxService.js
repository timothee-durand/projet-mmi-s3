import axios from 'axios'
import param from '@/param/param.js'

export default {
  getApi(type) {



    return axios.get(param[type])
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

  },

  postAPI(type, params) {
    return axios.post(param[type], params ).then(reponse => {return reponse.data} );
  }
}
