import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';
import LoadingSpinner from './loadingSpinner';
import moment from 'moment';

class QuakesList extends PureComponent {
    state = {
        data: [],
        isLoading: true
    };

    _keyExtractor = (item, index) => item.id;

    componentDidMount() {
        this.getData();
    }

    onRefresh() {
        this.setState({
            isLoading: true
        }, function() {
            this.getData()
        });
    }

    getData() {
        let start = moment.utc().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss');

        fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoading: false,
                    data: json.features
                }, function() {
                    // do something with new state
                });
            })
            .catch((e) => {
                console.error(e);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <LoadingSpinner />
            );
        }

        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <FlatList
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isLoading}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={
                        ({item}) => <Text>
                            {moment.utc(item.properties.time)
                                .format("YYYY-MM-DD HH:mm:ss")},
                            {item.properties.title}
                        </Text>
                    }
                />
            </View>
        );
    }
}

export default QuakesList;
