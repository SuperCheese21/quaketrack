import { AndroidImportance } from 'expo-notifications';

export default {
  urls: {
    usgs: {
      FEED: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/',
      DATABASE: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
    },
    emsc: {
      DATABASE: 'http://www.seismicportal.eu/fdsnws/event/1/query',
    },
  },
  notificationChannels: [
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
  ],
};
