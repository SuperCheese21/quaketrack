import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';

import QuakesListItem from './QuakesListItem';
import { formatTime } from '../lib/formatData';

import styles from '../config/styles';

export default class QuakesList extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'List',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerLeft: (
                <Icon
                    name='menu'
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.toggleDrawer()}
                    size={25}
                    color='#000000'
                />
            ),
            headerRight: (
                <Icon
                    name='filter-outline'
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.navigate('Filters')}
                    size={25}
                    color='#000000'
                />
            )
        }
    };

    _keyExtractor = (item, index) => item.id;

    render() {
        if (this.props.screenProps.isLoading) {
            return ( <Spinner visible={true} /> );
        }

        const metadata = this.props.screenProps.data.metadata;

        return (
            <View style={styles.listView}>
                <Text style={styles.listTitle}>{metadata.title}</Text>
                <Text style={styles.listInfo}>
                    {metadata.count} Earthquakes | Updated {formatTime(metadata.generated)}
                </Text>
                <FlatList
                    onRefresh={this.props.screenProps.onRefresh}
                    refreshing={this.props.screenProps.isLoading}
                    data={this.props.screenProps.data.features}
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
