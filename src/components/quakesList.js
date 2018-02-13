import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';

import LoadingSpinner from './loadingSpinner';
import QuakesListItem from './quakesListItem';
import getJson from '../lib/getQuakesFeed';
import formatTime from '../lib/formatTime';
import styles from './styles.js';

const databaseOptions = {
    'format': 'geojson',
    'orderby': 'time',
    'minmagnitude': '4.5',
    'starttime': '2018-02-11 00:00:00'
};

const feedOptions = {
    'mag': '4.5',
    'time': 'week'
};

class QuakesList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            type: 'feed',
            options: feedOptions,
            title: ''
        };
    }

    _keyExtractor = (item, index) => item.id;

    componentDidMount() {
        this.getData();
    }

    onRefresh() {
        this.setState({
            isLoading: true
        }, function() {
            this.getData();
        });
    }

    getData() {
        getJson(this.state.type, this.state.options).then((res) => {
            this.setState({
                isLoading: false,
                generated: res.metadata.generated,
                count: res.metadata.count,
                data: res.features,
                title: res.metadata.title
            });
        }, (err) => {
            console.error(err);
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <LoadingSpinner />
            );
        }

        return (
            <View style={styles.listView}>
                <Text style={styles.listTitle}>
                    {this.state.title}
                </Text>
                <Text style={styles.listInfo}>
                    {this.state.count} Earthquakes | Updated {formatTime(this.state.generated)}
                </Text>
                <FlatList
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isLoading}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) =>
                        <QuakesListItem
                            id={item.id}
                            data={item}
                        />
                    }
                />
            </View>
        );
    }
}

export default QuakesList;
