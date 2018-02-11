import React, { Component } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    View
} from 'react-native';
import moment from 'moment';

const options = {
    "format": "geojson",
    "endtime": "",
    "starttime": "",
    "latitude": null,
    "longitude": null,
    "maxradiuskm": 20001.6,
    "minmagnitude": null,
    "maxmagnitude": null,
    "offset": 1
};

export default class Quakes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
    }

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

        fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson')
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
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <FlatList
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isLoading}
                    data={this.state.data}
                    renderItem={
                        ({item}) => <Text>{
                            moment.utc(item.properties.time).format("YYYY-MM-DD HH:mm:ss")
                        }, {
                            item.properties.title
                        }</Text>
                    }
                    keyExtractor={({item}, index) => index}
                />
            </View>
        );
    }
}
