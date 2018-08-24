import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Filters from './Filters';
import QuakesList from './QuakesList';
import QuakesMap from './QuakesMap';
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

const ListStackNavigator = createStackNavigator({
    QuakesList: QuakesList,
    QuakeInfo: QuakeInfo,
    Filters: Filters
}, {
    initialRouteName: 'QuakesList'
});

const MapStackNavigator = createStackNavigator({
    QuakesMap: QuakesMap,
    QuakeInfo: QuakeInfo,
    Filters: Filters
}, {
    initialRouteName: 'QuakesMap'
});

const DrawerNavigator = createDrawerNavigator({
    List: ListStackNavigator,
    Map: MapStackNavigator,
    Settings: Settings
}, {
    drawerWidth: 200,
    initialRouteName: 'List',
    backBehavior: 'none'
});

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
