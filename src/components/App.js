import React, { PureComponent } from 'react';
import { YellowBox } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import DrawerNavigator from './Navigators';

import defaultOptions from '../config/options';
import fetchData from '../lib/fetchData';

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            settings: defaultOptions,
            data: {},
            isLoading: true
        };
    }

    componentDidMount() {
        this.onRefresh();
    }

    getSettings = () => {
        return this.state.settings;
    }

    setSettings = newSettings => {
        this.setState({
            settings: newSettings
        });
    }

    onRefresh = () => {
        this.setState({
            isLoading: true
        }, () => {
            this.updateData();
        });
    }

    updateData = () => {
        fetchData(this.state.settings)
            .then(res => {
                this.setState({
                    isLoading: false,
                    data: {
                        features: res.features,
                        metadata: res.metadata
                    }
                });
            })
            .catch(e => {
                console.error(e);
            });
    }

    render() {
        return (
            <DrawerNavigator
                screenProps={{
                    data: this.state.data,
                    isLoading: this.state.isLoading,
                    getSettings: this.getSettings,
                    setSettings: this.setSettings,
                    onRefresh: this.onRefresh
                }}
            />
        );
    }
}

// React bug - ignore warning on deprecated lifecycle method
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
