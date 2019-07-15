import React, { PureComponent } from 'react';
import { YellowBox } from 'react-native';
import { AppLoading } from 'expo';

import defaultFilters from './src/config/options.json';
import { getUrl } from './src/api/fetchData';
import { initNotifications } from './src/api/firebase';
import StackNavigatorContainer from './src/navigation/StackNavigator';

export default class App extends PureComponent {
  state = {
    filters: defaultFilters,
    data: {},
    notificationSettings: {},
    isLoading: true
  };

  async componentDidMount() {
    const notificationSettings = await initNotifications();
    this.setState(
      {
        notificationSettings
      },
      () => {
        this.updateData();
      }
    );
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
      console.error(err.message);
    }
  };

  render() {
    if (!Object.keys(this.state.notificationSettings).length) {
      return <AppLoading />;
    }
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
