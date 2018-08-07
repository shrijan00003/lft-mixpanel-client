import auth from '../utils/auth';
import * as http from '../utils/http';
import { getUserDetails, getLocation } from '../utils/userDetails';
import { REFRESH_TOKEN } from '../constants/auth/authConstants';

let res = null;
const segment = 'auth';
const userDetails = getUserDetails();

/**
 *
 * @param {string} email
 * @param {string} password
 */
export const login = async (email, password) => {
  const data = {
    user_identity: email,
    password: password,

    //user details for tracking users
    os: userDetails.os,
    browser: userDetails.browser,
    details: userDetails.fullUserAgent,
    device: userDetails.mobile ? 'Mobile' : 'PC',
    location: JSON.stringify(userDetails.location),
  };

  console.log(data);

  try {
    res = await http.post(segment + '/login', data);
    return res;
  } catch (err) {
    return err;
  }
};

/**
 * Logout function
 */
export const logout = async () => {
  const data = {
    refresh_token: auth.getToken(REFRESH_TOKEN),
  };

  const logoutResponse = await http
    .post(segment + '/logout', data)
    .then(res => {
      auth.clearDetails();
      return res;
    })
    .catch(err => {
      return err;
    });

  return logoutResponse;
};
