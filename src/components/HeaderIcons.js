import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export const FilterIcon = props => (
  <TouchableOpacity
    style={{ flex: 1 }}
    onPress={() => props.navigation.navigate('Filters')}
  >
    <Icon
      name="filter-outline"
      style={{ marginRight: 10 }}
      size={25}
      color="#000000"
    />
  </TouchableOpacity>
);

export const MenuIcon = props => (
  <TouchableOpacity
    style={{ flex: 1 }}
    onPress={() => props.navigation.toggleDrawer()}
  >
    <Icon name="menu" style={{ marginLeft: 10 }} size={25} color="#000000" />
  </TouchableOpacity>
);
