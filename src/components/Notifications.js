import React, { PureComponent } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';

import styles from '../config/styles';

export default class Notifications extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'Notifications',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name={'notifications'} size={20} color={tintColor} />;
    }
  });

  render() {
    return null;
  }
}
