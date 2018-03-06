import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';

import LoadingSpinner from './LoadingSpinner';
import QuakesListItem from './QuakesListItem';
import getInfo from '../lib/getInfo';
import formatTime from '../lib/formatTime';

import queryOptions from '../config/options.js';
import styles from './styles.js';

class QuakesList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            type: 'database',
            options: queryOptions.database,
        };
    }

    static navigationOptions = {
        title: 'Recent Earthquakes',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
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
        getInfo.buildURL(this.state.type, this.state.options).then((res) => {
            this.setState({
                isLoading: false,
                metadata: res.metadata,
                data: res.features,
                bbox: res.bbox
            });
        }, (err) => {
            console.error('Error: ' + err);
        });
    }

    render() {
        if (this.state.isLoading) {
            return ( <LoadingSpinner /> );
        }

        const title = this.state.metadata.title;
        const count = this.state.metadata.count;
        const time = formatTime(this.state.metadata.generated);

        return (
            <View style={styles.listView}>
                <Text style={styles.listTitle}>{title}</Text>
                <Text style={styles.listInfo}>
                    {count} Earthquakes | Updated {time}
                </Text>
                <FlatList
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isLoading}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) =>
                        <QuakesListItem
                            navigation={this.props.navigation}
                            data={item}
                        />
                    }
                />
            </View>
        );
    }
}

export default QuakesList;
