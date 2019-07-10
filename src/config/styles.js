import { StyleSheet } from 'react-native';

import colors from '../config/colors.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  infoLink: {
    height: 40,
    color: 'blue',
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline'
  },
  infoTitle: {
    height: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  infoView: {
    borderRadius: 10,
    flex: 1,
    margin: 5,
    padding: 10
  },
  listInfo: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    height: 30
  },
  listItem: {
    flexDirection: 'row',
    height: 75,
    borderRadius: 5,
    marginTop: 2.5,
    marginBottom: 2.5,
    marginLeft: 5,
    marginRight: 5,
    padding: 5
  },
  listTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    height: 30
  },
  listView: {
    backgroundColor: colors.background,
    flex: 1
  },
  magnitudeText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 28,
    flex: 1
  },
  locationText: {
    marginLeft: 3,
    textAlignVertical: 'center',
    color: 'black',
    fontWeight: 'bold',
    flex: 1
  },
  settingsItem: {
    height: 65,
    flexDirection: 'row'
  },
  settingsItemLabel: {
    fontSize: 16,
    color: 'black',
    textAlignVertical: 'center',
    flex: 1
  },
  settingsSliderValue: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 0.2
  },
  settingsView: {
    backgroundColor: colors.background,
    padding: 10
  },
  timestampText: {
    marginLeft: 3,
    textAlignVertical: 'center',
    color: 'black'
  }
});

export default styles;
