import * as http from '../utils/http';

let res = null;
const segment = '/mixpanel/pages';

export const fetchPagesData = (props = {}) => {
  res = http
    .get(segment, {
      page_size: props ? props.page_size : null,
      page: props ? props.page : null,
      date: props ? props.date : null,
      page_name: props ? props.page_name : null,
    })
    .then(pagesWithMeta => pagesWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};

export const fetchPagesDataWithCount = (props = {}) => {
  res = http
    .get(segment + '/analytics', {
      getBy: props ? props.getBy : null,
    })
    .then(tracksWithMeta => tracksWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};
