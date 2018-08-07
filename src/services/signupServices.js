import * as http from '../utils/http';

let res = null;
const signupSegment = 'users/client';
const checkSegment = 'users/check';

export const signupUser = async userDetails => {
  try {
    const username = userDetails.email.split('@')[0];
    let data = {
      user_name: username,
      phone: userDetails.phone,
      user_email: userDetails.email,
      password: userDetails.password,
      last_name: userDetails.name[1],
      first_name: userDetails.name[0],
      domain_name: userDetails.domain,
      company_name: userDetails.domain,
    };

    res = await http.post(signupSegment, data);

    return res;
  } catch (err) {
    return err;
  }
};

export const checkUniqueEmail = async email => {
  const params = {
    user_name: email.split('@')[0],
    user_email: email,
  };
  try {
    res = await http.get(checkSegment, params);

    return res;
  } catch (err) {
    return err;
  }
};
