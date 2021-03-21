import React, { useContext } from 'react';
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

const QuakesList = ({ stackNavigation }) => {
  const { data, isLoading, onRefresh } = useContext(QuakesContext);
  const { features, metadata } = data;

  return (
    <View style={styles.listView}>
      {metadata && (
        <>
          <Text style={styles.listTitle}>{metadata.title}</Text>
          <Text style={styles.listInfo}>
            {`${metadata.count} Earthquakes | Updated ${formatTime(
              metadata.generated,
            )}`}
          </Text>
        </>
      )}
      <FlatList
        onRefresh={onRefresh}
        refreshing={isLoading}
        data={features}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <QuakesListItem stackNavigation={stackNavigation} data={item} />
        )}
      />
    </View>
  );
};

export default QuakesList;
