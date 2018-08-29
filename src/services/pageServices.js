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

export const fetchPagesDataWithCount = query => {
  res = http
    .get(segment + query)
    .then(tracksWithMeta => tracksWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};
