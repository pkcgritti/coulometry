import axios from 'axios';
import config from '../../../config.json';

const baseConfig = Object.assign({}, config.base, config[process.env.NODE_ENV]);

export const instance = axios.create({
  baseURL: baseConfig.express.rest_url
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
