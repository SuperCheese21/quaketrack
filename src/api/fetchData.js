import qs from 'qs';

import { URLS } from '../config/constants';

const queryStringify = query =>
  qs.stringify(query, {
    skipNulls: true,
    addQueryPrefix: true,
  });

const getUrl = ({
  minmagnitude,
  limit,
  dateEnabled,
  starttime,
  endtime,
  orderby,
}) => {
  const queryString = queryStringify({
    minmagnitude,
    limit,
    starttime: dateEnabled ? starttime : null,
    endtime: dateEnabled ? endtime : null,
    orderby,
    format: 'geojson',
  });
  return `${URLS.USGS.DATABASE}${queryString}`;
};

export default async filters => {
  const url = getUrl(filters);
  try {
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    console.error(err);
    return {};
  }
};
