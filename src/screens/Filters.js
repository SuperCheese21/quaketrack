import React, { PureComponent } from 'react';
import { Picker, Text } from 'react-native';
import { Button, Switch } from 'react-native-paper';

import DatePicker from '../components/DatePicker';
import SettingsContainer from '../components/SettingsContainer';
import SettingsItem from '../components/SettingsItem';
import SettingsItemLabel from '../components/SettingsItemLabel';
import Slider from '../components/Slider';

import colors from '../config/colors.json';

export default class Filters extends PureComponent {
  state = this.props.screenProps.getFilters();

  static navigationOptions = {
    title: 'Filters',
  };

  render() {
    return (
      <SettingsContainer>
        <SettingsItem>
          <SettingsItemLabel text="Minimum Magnitude" />
          <Text style={styles.settingsSliderValue}>
            {this.state.minmagnitude}
          </Text>
        </SettingsItem>

        <Slider
          label="Minimum Magnitude"
          minimumValue={1}
          maximumValue={9}
          step={0.1}
          value={this.state.minmagnitude}
          onValueChange={value =>
            this.setState({
              minmagnitude: Math.round(10 * value) / 10,
            })
          }
        />

        <SettingsItem>
          <SettingsItemLabel text="Number of Earthquakes" />
          <Picker
            style={{ flex: 1, alignSelf: 'center' }}
            selectedValue={this.state.limit}
            onValueChange={limit => this.setState({ limit })}
          >
            <Picker.Item label="10" value={10} />
            <Picker.Item label="50" value={50} />
            <Picker.Item label="100" value={100} />
            <Picker.Item label="500" value={500} />
            <Picker.Item label="1000" value={1000} />
          </Picker>
        </SettingsItem>

        <SettingsItem>
          <SettingsItemLabel text="Set Date Range" />
          <Switch
            value={this.state.dateEnabled}
            onValueChange={dateEnabled => this.setState({ dateEnabled })}
            color={colors.accent}
          />
        </SettingsItem>

        <SettingsItem subItem disabled={!this.state.dateEnabled}>
          <SettingsItemLabel subItem text="Start Time" />
          <DatePicker
            date={this.state.starttime}
            disabled={!this.state.dateEnabled}
            onValueChange={starttime => this.setState({ starttime })}
          />
        </SettingsItem>

        <SettingsItem subItem disabled={!this.state.dateEnabled}>
          <SettingsItemLabel subItem text="End Time" />
          <DatePicker
            date={this.state.endtime}
            disabled={!this.state.dateEnabled}
            onValueChange={endtime => this.setState({ endtime })}
          />
        </SettingsItem>

        <SettingsItem>
          <SettingsItemLabel text="Order By" />
          <Picker
            style={{ flex: 1, alignSelf: 'center' }}
            selectedValue={this.state.orderby}
            onValueChange={orderby => this.setState({ orderby })}
          >
            <Picker.Item label="Time (descending)" value="time" />
            <Picker.Item label="Time (ascending)" value="time-asc" />
            <Picker.Item label="Magnitude (descending)" value="magnitude" />
            <Picker.Item label="Magnitude (ascending)" value="magnitude-asc" />
          </Picker>
        </SettingsItem>

        <SettingsItem
          style={{ height: 'auto', justifyContent: 'space-around' }}
        >
          <Button
            mode="contained"
            color="red"
            onPress={() => this.props.navigation.goBack()}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            color={colors.accent}
            onPress={() => {
              this.props.screenProps.setFilters(this.state);
              this.props.navigation.goBack();
              this.props.screenProps.onRefresh();
            }}
          >
            Save & Close
          </Button>
        </SettingsItem>
      </SettingsContainer>
    );
  }
}

const styles = {
  settingsSliderValue: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 0.2,
  },
};
