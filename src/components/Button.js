import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = props => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={{
      flex: 1,
      backgroundColor: props.color,
      height: props.height,
      margin: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    }}
    onPress={props.onPress}
  >
    <Text style={{ fontSize: 16, color: props.textColor }}>{props.text}</Text>
  </TouchableOpacity>
);

export default Button;
