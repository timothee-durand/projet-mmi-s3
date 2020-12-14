import axios from 'axios'
import param from '@/param/param.js'

export default {
  headers:{

  },

  getApi(type) {
    return axios({
      method:"get",
      auth: {
        username: param.username,
        password: param.password
      },
      url: param[type]
    }).then(
      response => {
        return response.data;
      }
    )
  }
}
