import dayjs from 'dayjs';
import { AndroidImportance } from 'expo-notifications';

export const URLS = {
  USGS: {
    FEED: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/',
    DATABASE: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
  },
  EMSC: {
    DATABASE: 'http://www.seismicportal.eu/fdsnws/event/1/query',
  },
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss UTC';

export const NOTIFICATION_CHANNELS = [
  {
    id: 'quake-alerts',
    name: 'Alerts',
    sound: true,
    importance: AndroidImportance.MAX,
    enableVibrate: true,
  },
  {
    id: 'quake-updates',
    name: 'Updates',
    sound: false,
    importance: AndroidImportance.DEFAULT,
    enableVibrate: false,
  },
];

export const DEFAULT_FILTERS = {
  minmagnitude: 4,
  limit: 1000,
  dateEnabled: false,
  starttime: dayjs().subtract(1, 'month').format(DATE_FORMAT),
  endtime: dayjs().format(DATE_FORMAT),
  orderby: 'time',
};
