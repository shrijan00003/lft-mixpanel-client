import React from 'react';
import * as http from '../utils/http';

let res = null;
const segment = '/mixpanel/pages';

export const fetchPagesData = () => {
  res = http
    .get(segment)
    .then(pagesWithMeta => pagesWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};
