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
