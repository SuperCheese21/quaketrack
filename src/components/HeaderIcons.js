import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';

export const FilterIcon = ({ stackNavigation }) => (
  <TouchableOpacity
    style={{ flex: 1 }}
    onPress={() => stackNavigation.navigate('Filters')}
  >
    <MaterialCommunityIcon
      name="filter-outline"
      style={{ marginRight: 10 }}
      size={25}
      color="#000000"
    />
  </TouchableOpacity>
);

export const NotificationIcon = ({ stackNavigation }) => (
  <TouchableOpacity
    style={{ flex: 1 }}
    onPress={() => stackNavigation.navigate('Notifications')}
  >
    <MaterialIcon
      name="notifications"
      style={{ marginLeft: 10 }}
      size={25}
      color="#000000"
    />
  </TouchableOpacity>
);
