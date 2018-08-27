import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = props => (
    <TouchableOpacity
        activeOpacity={0.5}
        style={{
            flex: 1,
            backgroundColor: props.color,
            margin: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        onPress={props.onPress}
    >
        <Text style={{ fontSize: 16, color: 'white' }}>{props.text}</Text>
    </TouchableOpacity>
);

export default Button;
