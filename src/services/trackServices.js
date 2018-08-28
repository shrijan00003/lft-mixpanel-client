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
  res = http
    .get(segment, {
      event_name: props ? props.event_name : '',
      page_size: props ? props.page_size : null,
      page: props ? props.page : null,
      date: props ? props.date : null,
      longitude: props ? props.longitude : null,
      latitude: props ? props.latitude : null,
    })
    .then(tracksWithMeta => tracksWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};

export const fetchTracksDataWithCount = props => {
  console.log(props, 'propsincountfetch');
  res = http
    .get(segment + '/devices', {
      get: props.get,
      table: props.table,
    })
    .then(tracksWithMeta => tracksWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};
