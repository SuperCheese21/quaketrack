import React from 'react';
import { View } from 'react-native';
import SettingsItemLabel from './SettingsItemLabel';

const SettingsItem = ({ children, disabled, label, subItem, style }) => (
  <View
    style={{
      flexDirection: 'row',
      height: 65,
      paddingLeft: subItem ? 20 : 0,
      opacity: disabled ? 0.5 : 1,
      ...style,
    }}
  >
    {label && <SettingsItemLabel text={label} />}
    {children}
  </View>
);

export default SettingsItem;
