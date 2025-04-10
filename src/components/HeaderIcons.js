import React from 'react';
import { Pressable } from 'react-native';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';

export const FilterIcon = ({ onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
  >
    <MaterialCommunityIcon
      name="filter-outline"
      style={{ marginRight: 10 }}
      size={25}
      color="#000000"
    />
  </Pressable>
);

export const NotificationIcon = ({ onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
  >
    <MaterialIcon
      name="notifications"
      style={{ marginLeft: 10 }}
      size={25}
      color="#000000"
    />
  </Pressable>
);
