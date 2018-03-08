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
        const params = navigation.state.params || {};

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
                    onPress={() => navigation.navigate('Settings', {
                        type: params.type,
                        options: params.options,
                        refreshData: (type, options) => params.refreshData(type, options)
                    })}
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

    componentWillMount() {
        this.props.navigation.setParams({
            refreshData: (type, options) => {
                this.setState({
                    type: type,
                    options: options
                });
                this.onRefresh();
            }
        });
    }

    onRefresh = () => {
        this.setState({
            isLoading: true
        }, function() {
            this.getData();
        });
    }

    getData = () => {
        const options = this.state.options[this.state.type];

        getInfo.buildURL(this.state.type, options).then((res) => {
            this.setState({
                isLoading: false,
                metadata: res.metadata,
                data: res.features,
                bbox: res.bbox
            });
        }, (e) => {
            console.error('Error: ' + e);
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
