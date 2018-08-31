const SockJS = require('sockjs-client');
const firebase = require('firebase');
const firebaseConfig = require('./firebaseConfig.json');
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const WS_URL = 'http://www.seismicportal.eu/standing_order';
const sock = new SockJS(WS_URL);

sock.onopen = () => {
    console.log('Connected to ' + WS_URL);
};

sock.onmessage = message => {
    const message = JSON.parse(message);
    if (message.action === 'create') {
        const data = message.data;
        console.log('M' + data.properties.mag + ' - ' + data.properties.flynn_region);
        database.ref('/users').once('value').then(snapshot => {
            const users = snapshot.val();
            sendPushNotifications(users, data);
        });
    }
};

sock.onclose = () => {
    console.warn('Disconnected from ' + WS_URL);
};
