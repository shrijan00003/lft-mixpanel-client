import React from 'react';
import * as http from '../utils/http';

let res = null;
const segment = '/users/profile';
export const fetchProfile = () => {
  res = http
    .get(segment)
    .then(profileData => profileData)
    .catch(err => {
      return err;
    });

  return res;
};

// export const setUserDetail = async () => {
//   let loginResponse = await fetchProfile();
//   let userClientDetails = {
//     clientId: loginResponse.data.userProfile.clientId,
//     Email: loginResponse.data.userProfile.userEmail,
//   };
//   return userClientDetails;
//   console.log(loginResponse.data, 'dataaaaaaaaaaaaaaaaa');
// };
