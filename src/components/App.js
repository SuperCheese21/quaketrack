import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import QuakesList from './QuakesList';
import QuakeInfo from './QuakeInfo';
import Settings from './Settings';
import defaultOptions from '../config/options';
import fetchData from '../lib/fetchData';

export default class App extends Component {
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
            this.getData();
        });
    }

    getData = () => {
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
            <Navigator
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

const Navigator = createStackNavigator({
    QuakesList: QuakesList,
    QuakeInfo: QuakeInfo,
    Settings: Settings
}, {
    initialRouteName: 'QuakesList',
    initialRouteParams: {
        options: defaultOptions
    }
});
