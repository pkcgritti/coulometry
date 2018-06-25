import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8000'
});

instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export const plugin = {
  install (Vue, options) {
    Vue.prototype.$axios = instance;
  }
};

export default plugin;
