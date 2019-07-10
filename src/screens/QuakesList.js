import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import QuakesListItem from '../components/QuakesListItem';
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
    const {
      onRefresh,
      isLoading,
      data,
      stackNavigation
    } = this.props.screenProps;

    return (
      <View style={styles.listView}>
        {data.metadata && (
          <>
            <Text style={styles.listTitle}>{data.metadata.title}</Text>
            <Text style={styles.listInfo}>
              {data.metadata.count} Earthquakes | Updated{' '}
              {formatTime(data.metadata.generated)}
            </Text>
          </>
        )}
        <FlatList
          onRefresh={onRefresh}
          refreshing={isLoading}
          data={data.features}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <QuakesListItem stackNavigation={stackNavigation} data={item} />
          )}
        />
      </View>
    );
  }
}
