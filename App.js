import React, { PureComponent } from 'react';
import { YellowBox } from 'react-native';
import { Font } from 'expo';

import defaultFilters from './src/config/options.json';
import { getUrl } from './src/api/fetchData';
import { getFirebaseUsername, initNotifications } from './src/api/firebase';
import StackNavigatorContainer from './src/navigation/StackNavigator';

export default class App extends PureComponent {
  state = {
    filters: defaultFilters,
    data: {},
    isLoading: true,
    uid: null
  };

  async componentDidMount() {
    await this.updateData();
    const uid = await getFirebaseUsername();
    await initNotifications(uid);
    this.setState({ uid });
  }

  getFilters = () => {
    return this.state.filters;
  };

  setFilters = filters => {
    this.setState({ filters });
  };

  onRefresh = () => {
    this.setState({ isLoading: true }, this.updateData);
  };

  updateData = async () => {
    const url = getUrl(this.state.filters);
    try {
      const res = await fetch(url);
      const data = await res.json();
      this.setState({ isLoading: false, data });
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    return (
      <StackNavigatorContainer
        screenProps={{
          data: this.state.data,
          isLoading: this.state.isLoading,
          uid: this.state.uid,
          onRefresh: this.onRefresh,
          getFilters: this.getFilters,
          setFilters: this.setFilters
        }}
      />
    );
  }
}

// React bug - ignore warning on deprecated lifecycle method
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Setting a timer'
]);
