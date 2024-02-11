import axios from 'axios';

const httpInterceptor = axios.create();

httpInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('idToken');

    //if token exists
    if(token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default httpInterceptor;
