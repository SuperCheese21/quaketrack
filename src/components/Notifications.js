import React, { PureComponent } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import styles from '../config/styles';

export default class Notifications extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Notifications',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: (
        <Icon
          name="menu"
          style={{ marginLeft: 10 }}
          onPress={() => navigation.toggleDrawer()}
          size={25}
          color="#000000"
        />
      )
    };
  };

  render() {
    return null;
  }
}
