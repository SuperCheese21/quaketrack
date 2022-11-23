import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';

export const FilterIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialCommunityIcon
      name="filter-outline"
      style={{ marginRight: 10 }}
      size={25}
      color="#000000"
    />
  </TouchableOpacity>
);

export const NotificationIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcon
      name="notifications"
      style={{ marginLeft: 10 }}
      size={25}
      color="#000000"
    />
  </TouchableOpacity>
);
