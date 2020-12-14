import React from 'react';
import { View } from 'react-native';

const SettingsItem = ({ children, disabled, subItem, style }) => (
  <View
    style={{
      flexDirection: 'row',
      height: 65,
      paddingLeft: subItem ? 20 : 0,
      opacity: disabled ? 0.5 : 1,
      ...style,
    }}
  >
    {children}
  </View>
);

export default SettingsItem;
