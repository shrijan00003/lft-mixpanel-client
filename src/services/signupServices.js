import * as http from '../utils/http';

let res = null;
const segment = 'users/';

export const signupUser = async userDetails => {
  try {
    let data = {
      user_name: userDetails.name,
      user_email: userDetails.email,
      password: userDetails.password,
      domain_name: userDetails.domain,
    };

    res = await http.post(segment, data);

    return res;
  } catch (err) {
    return err;
  }
};
