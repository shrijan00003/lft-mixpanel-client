import React from 'react';
import * as http from '../utils/http';

let res = null;
const segment = '/mixpanel/total/users';

export const fetchUsersData = (props = {}) => {
  console.log('akjfjskfksfkjsfkjkjjk');
  res = http
    .get(segment)
    .then(users => users)
    .catch(err => {
      return err;
    });
  return res;
};
