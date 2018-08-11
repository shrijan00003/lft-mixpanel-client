import axios from 'axios';
import auth from './auth';
import {
  ID,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  PARSE,
} from '../constants/authConstants';

/**
 * creating axios instance
 */
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8848/api/',
  headers: {
    authorization: auth.getToken(ACCESS_TOKEN),
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
    const pendingRequest = error.config;
    if (error.response.status === 401) {
      const data = {
        user_id: auth.getToken(ID),
        refresh_token: auth.getToken(REFRESH_TOKEN),
      };

      const res = await post('auth/refresh/', data);

      auth.setNewTokens(res.data);
      pendingRequest.headers.authorization = auth.getToken(ACCESS_TOKEN);

      if (pendingRequest.data) {
        let pendingRequestData = PARSE(pendingRequest.data);
        // INCASE OF LOGOUT REFRESH_TOKEN IS SEND TO DATA BY UPDATING AFTER REFRESH
        if (pendingRequestData.refresh_token) {
          pendingRequestData.refresh_token = auth.getToken(REFRESH_TOKEN);
          pendingRequest.data = pendingRequestData;
        }
      }

      return axios(pendingRequest);
    } else if (error.response.status === 404) {
      return error;
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
export function get(url, params = {}) {
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
