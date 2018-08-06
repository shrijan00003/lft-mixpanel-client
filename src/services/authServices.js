import auth from '../utils/auth';
import * as http from '../utils/http';
import { REFRESH_TOKEN } from '../constants/auth/authConstants';

let res = null;
const segment = 'auth';

export const login = async (email, password) => {
  const data = {
    user_email: email,
    password: password,
  };

  try {
    res = await http.post(segment + '/login', data);
    return res;
  } catch (err) {
    return err;
  }
};

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
