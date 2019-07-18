import React, { PureComponent } from 'react';
import { Picker } from 'react-native';

import DatePicker from '../components/DatePicker';
import SettingsContainer from '../components/SettingsContainer';
import SettingsItem from '../components/SettingsItem';
import SettingsItemLabel from '../components/SettingsItemLabel';
import Switch from '../components/Switch';
import Slider from '../components/Slider';

export default class Filters extends PureComponent {
  state = this.props.screenProps.getFilters();

  static navigationOptions = {
    title: 'Filters'
  };

  render() {
    return (
      <SettingsContainer>
        <SettingsItem>
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
        </SettingsItem>

        <SettingsItem>
          <SettingsItemLabel>Number of Earthquakes</SettingsItemLabel>
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
        </SettingsItem>

        <SettingsItem>
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
            subItem
            enabled={this.state.dateEnabled}
            onValueChange={value => {
              this.setState({ starttime: value });
            }}
          />

          <DatePicker
            label="End Time"
            date={this.state.endtime}
            subItem
            enabled={this.state.dateEnabled}
            onValueChange={value => {
              this.setState({ endtime: value });
            }}
          />
        </SettingsItem>

        <SettingsItem>
          <SettingsItemLabel>Order By</SettingsItemLabel>

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
        </SettingsItem>
      </SettingsContainer>
    );
  }
}
