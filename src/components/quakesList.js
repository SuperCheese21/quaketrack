import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';

import LoadingSpinner from './loadingSpinner';
import QuakesListItem from './quakesListItem';
import getJson from '../lib/getQuakesFeed';
import formatTime from '../lib/formatTime';

const options = {
    "mag": "2.5",
    "time": "week"
};

class QuakesList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            options: options,
            title: ""
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
        getJson(this.state.options).then((res) => {
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
            <View style={{
                backgroundColor: '#e0e0e0',
                flex: 1
            }}>
                <Text style={{
                    fontSize: 15,
                    color: 'black',
                    textAlign: 'center'
                }}>
                    {this.state.title}
                </Text>
                <Text style={{
                    fontSize: 12,
                    color: 'black',
                    textAlign: 'center'
                }}>
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
