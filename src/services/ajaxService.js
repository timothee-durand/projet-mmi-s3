import axios from 'axios'
import param from '@/param/param.js'

export default {
  getApi(type) {
    // var config = {
    //   method: 'get',
    //   url: 'https://mmi-projet.pu-pm.univ-fcomte.fr/~mmiprojet2021_01/api/login',
    //   auth: {
    //     username: param.username,
    //     password: param.password
    //   }
    // };

    console.log(type, param);

    return axios.get(param.login, {
      auth: {
        username: param.username,
        password: param.password
      }
    }).then(
      response => {
        return response;
      }
    )
  }
}
