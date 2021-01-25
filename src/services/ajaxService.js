import axios from 'axios'
import param from '@/param/param.js'
import appService from '@/services/appService.js'

export default {
  getAllApi(type) {
    axios.defaults.headers = {
      'Authorization': 'Bearer ' + appService.getLocal()
    }
    return axios.get(param[type])
      .then(function (response) {
        return response.data;
      });
  },

  getSingleApi(type, id) {
    axios.defaults.headers = {
      'Authorization': 'Bearer ' + appService.getLocal()
    }
    return axios.get(param[type]+"/"+id)
      .then(function (response) {
        return response.data;
      });
  },


  postAPI(type, params) {
    axios.defaults.headers = {
      'Authorization': 'Bearer ' + appService.getLocal()
    }
    return axios.post(param[type], params ).then(reponse => {return reponse.data} );
  },

  putApi(type, id, params){
    axios.defaults.headers = {
      'Authorization': 'Bearer ' + appService.getLocal()
    }
    //return axios.put(param[type]+"/"+id, params ).then(reponse => {return reponse.data} );
    params.append("_method", "PUT");
    return axios.post(param[type]+"/"+id, params ).then(reponse => {return reponse.data} );
  },

  delApi(type, id){
    axios.defaults.headers = {
      'Authorization': 'Bearer ' + appService.getLocal()
    }
    return axios.delete(param[type]+"/"+id).then(reponse => {return reponse.data} );
  },

  getRdvGest(id, startDate){
    axios.defaults.headers = {
      'Authorization': 'Bearer ' + appService.getLocal()
    }

    let data = new FormData();
    data.append("start_day", startDate);

    return axios.post(param.gestionnaires+"/"+id+param.gesRdv,data  )
      .then(function (response) {
        return response.data;
      });
  }

}
