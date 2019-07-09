import React, { PureComponent } from 'react';
import { YellowBox } from 'react-native';

import StackNavigatorContainer from './src/navigation/StackNavigator';

import defaultFilters from './src/config/options.json';
import { fetchData } from './src/api/fetchData';
import firebaseInit from './src/lib/util/firebaseInit';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filters: defaultFilters,
      data: {},
      isLoading: true
    };
    firebaseInit();
  }

  componentDidMount() {
    this.onRefresh();
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

  updateData = () => {
    fetchData(this.state.filters)
      .then(res => {
        this.setState({
          isLoading: false,
          data: res
        });
      })
      .catch(err => {
        console.error(err);
      });
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
