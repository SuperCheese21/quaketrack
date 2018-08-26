import React, { PureComponent } from 'react';
import { YellowBox } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import DrawerNavigator from './Navigators';

import defaultFilters from '../config/options';
import fetchData from '../lib/fetchData';

export default class App extends PureComponent {
    state = {
        filters: defaultFilters,
        data: {},
        isLoading: true
    }

    componentDidMount() {
        this.onRefresh();
    }

    getFilters = () => {
        return this.state.filters;
    }

    setFilters = newFilters => {
        this.setState({ filters: newFilters });
    }

    onRefresh = () => {
        this.setState({
            isLoading: true
        }, () => {
            this.updateData();
        });
    }

    updateData = () => {
        fetchData(this.state.filters)
            .then(res => {
                this.setState({
                    isLoading: false,
                    data: res
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <DrawerNavigator
                screenProps={{
                    data: this.state.data,
                    isLoading: this.state.isLoading,
                    onRefresh: this.onRefresh,
                    getFilters: this.getFilters,
                    setFilters: this.setFilters
                }}
            />
        );
    }
}

// React bug - ignore warning on deprecated lifecycle method
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
