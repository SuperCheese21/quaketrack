import React, { Component } from 'react';
import { View } from 'react-native';

import LoadingSpinner from './LoadingSpinner';

import colorUtil from '../lib/colorUtil';
import getInfo from '../lib/getInfo';
import styles from './styles.js';


class QuakeInfo extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            isLoading: true,
            color: params.color,
            url: params.url
        };
    }

    static navigationOptions = {
        title: 'Info',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        getInfo.getJson(this.state.url).then((res) => {
            this.setState({
                isLoading: false,
                type: res.type,
                data: res.properties,
                geometry: res.geometry,
                id: res.id
            });
        }, (err) => {
            console.error('Error: ' + err);
        });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <LoadingSpinner />
            );
        }

        const { params } = this.props.navigation.state;

        return (
            <View style={{
                backgroundColor: colorUtil.formatRGBA(params.color, 0.5),
                flex: 1,
                borderRadius: 10,
                margin: 5
            }}>

            </View>
        )
    }
}

export default QuakeInfo;
