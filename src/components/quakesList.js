import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoadingSpinner from './LoadingSpinner';
import QuakesListItem from './QuakesListItem';
import getInfo from '../lib/getInfo';
import formatTime from '../lib/formatTime';

import styles from '../config/styles';
import colors from '../config/colors';

class QuakesList extends PureComponent {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            isLoading: true,
            type: params.type,
            options: params.options
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Earthquakes',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerLeft: (
                <Icon
                    name='menu'
                    onPress={() => alert('Navigation Menu')}
                    size={25}
                    color='#000000'
                />
            ),
            headerRight: (
                <Icon
                    name='settings'
                    onPress={() => navigation.navigate('Settings')}
                    size={25}
                    color='#000000'
                />
            )
        }
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
        getInfo.buildURL(this.state.type, this.state.options[this.state.type]).then((res) => {
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
                    }/>

            </View>
        );
    }
}

export default QuakesList;
