import React, { PureComponent } from 'react';
import { FlatList, Text, View } from 'react-native';

import QuakesListItem from '../components/QuakesListItem';
import { QuakesContext } from '../components/QuakesProvider';
import colors from '../config/colors.json';
import { formatTime } from '../lib/util/formatData';

const styles = {
  listInfo: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    height: 30,
  },
  listTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    height: 30,
  },
  listView: {
    backgroundColor: colors.background,
    flex: 1,
  },
};

class QuakesList extends PureComponent {
  render() {
    const { onRefresh, isLoading, data, stackNavigation } = this.context;

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
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <QuakesListItem stackNavigation={stackNavigation} data={item} />
          )}
        />
      </View>
    );
  }
}

QuakesList.contextType = QuakesContext;

export default QuakesList;
