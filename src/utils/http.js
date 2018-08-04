import axios from 'axios';
import auth from './auth';

/**
 * creating axios instance
 */
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8848/api/',
  headers: {
    authorization: '', //auth.getToken("refreshToken"),
  },
});

/**
 * axios interceptors
 */
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const data = {
        refreshToken: auth.getToken('refreshToken'),
      };

      const res = await post('auth/refresh/', data);

      auth.setNewTokens(res.data);
      originalRequest.headers.authorization = auth.getToken('refreshToken');

      return axios(originalRequest);
    } else {
      return error;
    }
  }
);

/**
 * GET method
 * @param {String} url
 * @param {Object} params
 */
export function get(url, params) {
  return axiosInstance({
    method: 'get',
    url,
    params,
  });
}

/**
 * GET method
 * @param {String} url
 * @param {Object} data
 */
export function post(url, data) {
  return axiosInstance({
    method: 'post',
    url,
    data,
  });
}

/**
 * GET method
 * @param {String} url
 * @param {Object} data
 */
export function put(url, data) {
  return axiosInstance({
    method: 'put',
    url,
    data,
  });
}
