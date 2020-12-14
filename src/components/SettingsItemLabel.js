import React from 'react';
import { Text } from 'react-native';

const SettingsItemLabel = ({ subItem, text }) => (
  <Text
    style={{
      fontSize: 16,
      fontWeight: subItem ? 'normal' : 'bold',
      color: 'black',
      textAlignVertical: 'center',
      flex: 1,
    }}
  >
    {text}
  </Text>
);

export default SettingsItemLabel;
