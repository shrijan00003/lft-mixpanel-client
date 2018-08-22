import React from 'react';
import * as http from '../utils/http';

let res = null;
const segment = '/mixpanel/pages';

export const fetchPagesData = (props = {}) => {
  res = http
    .get(segment, {
      page_size: props ? props.page_size : null,
      page: props ? props.page : null,
      date: props ? props.date : null,
    })
    .then(pagesWithMeta => pagesWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};
