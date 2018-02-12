import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';

import LoadingSpinner from './loadingSpinner';
import QuakesListItem from './quakesListItem';
import getJson from '../lib/getQuakesFeed';

class QuakesList extends PureComponent {
    state = {
        data: [],
        isLoading: true,
        options: {
            "mag": "2.5",
            "time": "week"
        },
        title: ""
    };

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
            <View style={{flex: 1}}>
                <Text style={{
                    fontSize: 30,
                    color: 'black',
                    textAlign: 'center'
                }}>
                    Recent Earthquakes
                </Text>
                <Text style={{
                    fontSize: 15,
                    color: 'black',
                    textAlign: 'center'
                }}>
                    {this.state.title}
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
