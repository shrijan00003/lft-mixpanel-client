import * as http from '../utils/http';
// import axios from 'axios';

let res = null;
const baseUrl = 'http://127.0.0.1:8848/api/auth/login';
const segment = 'auth/login';

export const login = async (email, password) => {
  const data = {
    user_email: email,
    password: password,
  };

  try {
    res = await http.post(segment, data);

    // res = await axios({
    //   method: 'post',
    //   url: baseUrl,
    //   data: {
    //     user_email: email,
    //     password: password,
    //   },
    //   headers: {
    //     contentType: 'json',
    //   },
    // });

    return res;
  } catch (err) {
    return err;
  }
};
