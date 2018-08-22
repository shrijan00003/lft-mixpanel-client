import React from 'react';
import * as http from '../utils/http';

let res = null;
const segment = '/mixpanel/tracks';

export const fetchTracksDataWithLocation = (query = null) => {
  res = http
    .get(segment + '?' + query)
    .then(tracksWithMeta => tracksWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};

export const fetchTracksData = (props = {}) => {
  console.log(segment);
  res = http
    .get(segment, {
      event_name: props ? props.event_name : '',
      page_size: props ? props.page_size : null,
      page: props ? props.page : null,
      date: props ? props.date : null,
    })
    .then(tracksWithMeta => tracksWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};

export const fetchTracksDataWithCount = query => {
  console.log('fhkhfkj', query);
  res = http
    .get(segment + '/devices' + query)
    .then(tracksWithMeta => tracksWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};
