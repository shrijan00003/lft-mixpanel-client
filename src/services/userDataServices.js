import * as http from '../utils/http';

let res = null;
const segment = '/mixpanel/dashboard';

export const fetchUsersData = (props = {}) => {
  res = http
    .get(segment)
    .then(users => users)
    .catch(err => {
      return err;
    });
  return res;
};
