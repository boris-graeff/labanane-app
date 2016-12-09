import axios from 'axios';
import api from '../constants';

export default class HTTP {
  constructor(resource) {
    this.resource = resource;
  }

  getRequestConfig(params = {}) {
    return {
      ...params,
      baseURL: api.baseURL,
      headers: {}
    };
  }

  create(resource, params = {}) {
    return axios.post('/services/' + this.resource + '/', resource, this.getRequestConfig(params));
  }

  all(params = {}) {
    // fixme: remove /all it's not the resource we work on
    return axios.get('/services/' + this.resource + '/all', this.getRequestConfig(params));
  }

  get(resource, params = {}) {
    // fixme: remove /content/ segment and /undefined to be RESTful
    return axios.get('/services/' + this.resource + '/content/' + resource.id + '/undefined', this.getRequestConfig(params));
  }

  update(resource, params = {}) {
    return axios.put('/services/' + this.resource + '/' + resource.id + '/', resource, this.getRequestConfig(params));
  }

  remove(resource, params = {}) {
    return axios.delete('/services/' + this.resource + '/' + resource.id + '/', this.getRequestConfig(params));
  }
}
