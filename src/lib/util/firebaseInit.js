import * as firebase from 'firebase';

import registerForPushNotificationsAsync from '../../api/registerForPushNotificationsAsync';
import firebaseConfig from '../../config/firebaseConfig.json';

/**
 * [firebaseInit description]
 */
export default function firebaseInit() {
  firebase.initializeApp(firebaseConfig);
  firebase
    .auth()
    .signInAnonymously()
    .catch(err => {
      console.error(err);
    });
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      registerForPushNotificationsAsync(user.uid);
    }
  });
}
