import axios from "axios";

const axiosClient = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    withCredentials: true,
  })

  axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
      config.headers["Content-Type"] =  'multipart/form-data'
    }
    return config
})

  export default axiosClient;
