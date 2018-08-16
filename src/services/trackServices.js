import React from 'react';
import * as http from '../utils/http';

let res = null;
const segment = '/mixpanel/tracks';

export const fetchTracksData = () => {
  res = http
    .get(segment)
    .then(tracksWithMeta => tracksWithMeta)
    .catch(err => {
      return err;
    });
  return res;
};
