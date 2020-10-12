/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import Config from '../Global/Config';
class API {
  constructor() {
    axios.defaults.baseURL = Config.baseUrl;
    // Use this to inject anything with all the request
  }
  async get(url:string) {
    return axios.get(url);
  }
  async post(url: string, data: any) {
    return axios.post(url, data);
  }
  async put(url: string, data: any) {
    return axios.put(url, data);
  }
  async delete(url: string) {
    return axios.delete(url);
  }
}
export default new API();