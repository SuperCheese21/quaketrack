import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import QuakesListItem from './QuakesListItem';
import { formatTime } from '../lib/util/formatData';

import styles from '../config/styles';

export default class QuakesList extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'List',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name={'format-list-bulleted'} size={20} color={tintColor} />;
    }
  });

  _keyExtractor = (item, index) => item.id;

  render() {
    if (!Object.keys(this.props.screenProps.data).length) {
      return null;
    }

    const metadata = this.props.screenProps.data.metadata;

    return (
      <View style={styles.listView}>
        <Text style={styles.listTitle}>{metadata.title}</Text>
        <Text style={styles.listInfo}>
          {metadata.count} Earthquakes | Updated{' '}
          {formatTime(metadata.generated)}
        </Text>
        <FlatList
          onRefresh={this.props.screenProps.onRefresh}
          refreshing={this.props.screenProps.isLoading}
          data={this.props.screenProps.data.features}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <QuakesListItem navigation={this.props.navigation} data={item} />
          )}
        />
      </View>
    );
  }
}
