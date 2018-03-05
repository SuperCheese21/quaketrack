import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';

import LoadingSpinner from './LoadingSpinner';
import QuakesListItem from './QuakesListItem';
import getJson from '../lib/getQuakes';
import formatTime from '../lib/formatTime';

import queryOptions from '../config/options.js';
import styles from './styles.js';

class QuakesList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            options: queryOptions.feed,
            title: ''
        };
    }

    _keyExtractor = (item, index) => item.id;

    static navigationOptions = {
        title: 'Recent Earthquakes',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    };

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
        getJson(this.state.options.type, this.state.options.query).then((res) => {
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

        //const { navigate } = this.props.navigation;

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
                            navigation={this.props.navigation}
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
