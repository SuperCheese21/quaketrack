import React, { PureComponent } from 'react';
import { Picker, Text, View } from 'react-native';
import Button from './Button';

import DatePicker from './DatePicker';
import Switch from './Switch';
import Slider from './Slider';

import styles from '../config/styles';

export default class Filters extends PureComponent {
  state = this.props.screenProps.getFilters();

  static navigationOptions = {
    title: 'Filters',
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle
  };

  render() {
    return (
      <View style={styles.settingsView}>
        <Slider
          label="Minimum Magnitude"
          minimumValue={1}
          maximumValue={9}
          step={0.1}
          value={this.state.minmagnitude}
          onValueChange={value =>
            this.setState({
              minmagnitude: Math.round(10 * value) / 10
            })
          }
        />

        <View style={styles.settingsItem}>
          <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
            Number of Earthquakes
          </Text>

          <Picker
            style={{ flex: 1, alignSelf: 'center' }}
            selectedValue={this.state.limit}
            onValueChange={value => {
              this.setState({ limit: value });
            }}
          >
            <Picker.Item label="10" value={10} />
            <Picker.Item label="50" value={50} />
            <Picker.Item label="100" value={100} />
            <Picker.Item label="500" value={500} />
            <Picker.Item label="1000" value={1000} />
          </Picker>
        </View>

        <Switch
          label="Set Date Range"
          value={this.state.dateEnabled}
          onValueChange={value => {
            this.setState({ dateEnabled: value });
          }}
        />

        <DatePicker
          label="Start Time"
          date={this.state.starttime}
          subItem={true}
          enabled={this.state.dateEnabled}
          onValueChange={value => {
            this.setState({ starttime: value });
          }}
        />

        <DatePicker
          label="End Time"
          date={this.state.endtime}
          subItem={true}
          enabled={this.state.dateEnabled}
          onValueChange={value => {
            this.setState({ endtime: value });
          }}
        />

        <View style={styles.settingsItem}>
          <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
            Order By
          </Text>

          <Picker
            style={{ flex: 1, alignSelf: 'center' }}
            selectedValue={this.state.orderby}
            onValueChange={value => {
              this.setState({ orderby: value });
            }}
          >
            <Picker.Item label="Time (descending)" value="time" />
            <Picker.Item label="Time (ascending)" value="time-asc" />
            <Picker.Item label="Magnitude (descending)" value="magnitude" />
            <Picker.Item label="Magnitude (ascending)" value="magnitude-asc" />
          </Picker>
        </View>

        <View style={styles.settingsItem}>
          <Button
            text="Cancel"
            color="#ff0000"
            textColor="#ffffff"
            onPress={() => this.props.navigation.goBack()}
          />
          <Button
            text="Save and Close"
            color="#0000ff"
            textColor="#ffffff"
            onPress={() => {
              this.props.screenProps.setFilters(this.state);
              this.props.navigation.goBack();
              this.props.screenProps.onRefresh();
            }}
          />
        </View>
      </View>
    );
  }
}
