import React, { PureComponent } from 'react';
import { YellowBox } from 'react-native';

import StackNavigatorContainer from './src/navigation/StackNavigator';
import defaultFilters from './src/config/options.json';
import { getUrl } from './src/api/fetchData';
import {
  getFirebaseUsername,
  getNotificationSettings
} from './src/api/firebase';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filters: defaultFilters,
      data: {},
      notificationSettings: {},
      isLoading: true
    };
  }

  async componentDidMount() {
    this.onRefresh();
    const uid = await getFirebaseUsername();
    const notificationSettings = await getNotificationSettings(uid);
    this.setState({ notificationSettings });
  }

  getFilters = () => {
    return this.state.filters;
  };

  setFilters = filters => {
    this.setState({ filters });
  };

  onRefresh = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.updateData();
      }
    );
  };

  updateData = async () => {
    const url = getUrl(this.state.filters);
    try {
      const res = await fetch(url);
      const data = await res.json();
      this.setState({ isLoading: false, data });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <StackNavigatorContainer
        screenProps={{
          data: this.state.data,
          isLoading: this.state.isLoading,
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
