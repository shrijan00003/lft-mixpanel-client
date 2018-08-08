import auth from '../utils/auth';
import * as http from '../utils/http';
import { getUserDetails, getLocation } from '../utils/userDetails';
import { REFRESH_TOKEN } from '../constants/auth/authConstants';

let res = null;
let loginAttempt = null;
const loginSegment = 'auth/login';
const logoutSegment = 'auth/logout';
const userDetails = getUserDetails();
const loginAttemptSegment = 'auth/logincount';

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

  try {
    loginAttempt = await http.post(loginAttemptSegment, {
      user_identity: email,
    });

    if (loginAttempt.data) {
      return await http.post(loginSegment, data).then(res => res);
    } else {
      throw loginAttempt;
    }
  } catch (err) {
    return err;
  }
};

/**
 *
 * Logout function
 */
export const logout = async () => {
  const data = {
    refresh_token: auth.getToken(REFRESH_TOKEN),
  };

  const logoutResponse = await http
    .post(logoutSegment, data)
    .then(res => {
      auth.clearDetails();
      return res;
    })
    .catch(err => {
      return err;
    });

  return logoutResponse;
};
