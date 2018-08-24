import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoadingSpinner from './LoadingSpinner';
import QuakesListItem from './QuakesListItem';
import { formatTime } from '../lib/formatData';

import styles from '../config/styles';
import colors from '../config/colors';

export default class QuakesList extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Earthquakes',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerLeft: (
                <Icon
                    name='menu'
                    style={{ marginLeft: 10 }}
                    onPress={() => alert('Navigation Menu')}
                    size={25}
                    color='#000000'
                />
            ),
            headerRight: (
                <Icon
                    name='settings'
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
            return ( <LoadingSpinner /> );
        }

        const metadata = this.props.screenProps.data.metadata;
        const time = formatTime(metadata.generated);

        return (
            <View style={styles.listView}>
                <Text style={styles.listTitle}>{metadata.title}</Text>
                <Text style={styles.listInfo}>
                    {metadata.count} Earthquakes | Updated {time}
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
