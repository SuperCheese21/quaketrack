import querystring from 'querystring';

import constants from '../config/constants.json';

const queryStringify = query =>
  querystring.stringify(query, {
    skipNull: true,
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
  return `${constants.urls.usgs.DATABASE}?${queryString}`;
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
