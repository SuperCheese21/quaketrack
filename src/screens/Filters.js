import React, { useContext, useState } from 'react';
import { Picker, Text } from 'react-native';
import { Button, Switch } from 'react-native-paper';

import DatePicker from '../components/DatePicker';
import { QuakesContext } from '../components/QuakesProvider';
import SettingsContainer from '../components/SettingsContainer';
import SettingsItem from '../components/SettingsItem';
import SettingsItemLabel from '../components/SettingsItemLabel';
import Slider from '../components/Slider';

import colors from '../config/colors.json';

const styles = {
  settingsSliderValue: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 0.2,
  },
};

const Filters = ({ navigation }) => {
  const { filters, onRefresh, setFilters } = useContext(QuakesContext);
  const [updatedFilters, setUpdatedFilters] = useState({ ...filters });

  const updateFilters = update =>
    setUpdatedFilters(oldFilters => ({
      ...oldFilters,
      ...update,
    }));

  const {
    dateEnabled,
    endtime,
    limit,
    minmagnitude,
    orderby,
    starttime,
  } = updatedFilters;

  return (
    <SettingsContainer>
      <SettingsItem>
        <SettingsItemLabel text="Minimum Magnitude" />
        <Text style={styles.settingsSliderValue}>{minmagnitude}</Text>
      </SettingsItem>

      <Slider
        label="Minimum Magnitude"
        minimumValue={1}
        maximumValue={9}
        step={0.1}
        value={minmagnitude}
        onValueChange={value =>
          updateFilters({
            minmagnitude: Math.round(10 * value) / 10,
          })
        }
      />

      <SettingsItem>
        <SettingsItemLabel text="Number of Earthquakes" />
        <Picker
          style={{ flex: 1, alignSelf: 'center' }}
          selectedValue={limit}
          onValueChange={value => updateFilters({ limit: value })}
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
          value={dateEnabled}
          onValueChange={value => updateFilters({ dateEnabled: value })}
          color={colors.accent}
        />
      </SettingsItem>

      <SettingsItem subItem disabled={!dateEnabled}>
        <SettingsItemLabel subItem text="Start Time" />
        <DatePicker
          date={starttime}
          disabled={!dateEnabled}
          onValueChange={value => updateFilters({ starttime: value })}
        />
      </SettingsItem>

      <SettingsItem subItem disabled={!dateEnabled}>
        <SettingsItemLabel subItem text="End Time" />
        <DatePicker
          date={endtime}
          disabled={!dateEnabled}
          onValueChange={value => updateFilters({ endtime: value })}
        />
      </SettingsItem>

      <SettingsItem>
        <SettingsItemLabel text="Order By" />
        <Picker
          style={{ flex: 1, alignSelf: 'center' }}
          selectedValue={orderby}
          onValueChange={value => updateFilters({ orderby: value })}
        >
          <Picker.Item label="Time (descending)" value="time" />
          <Picker.Item label="Time (ascending)" value="time-asc" />
          <Picker.Item label="Magnitude (descending)" value="magnitude" />
          <Picker.Item label="Magnitude (ascending)" value="magnitude-asc" />
        </Picker>
      </SettingsItem>

      <SettingsItem style={{ height: 'auto', justifyContent: 'space-around' }}>
        <Button
          mode="contained"
          color="red"
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          color={colors.accent}
          onPress={() => {
            setFilters(updatedFilters);
            navigation.goBack();
            onRefresh();
          }}
        >
          Save & Close
        </Button>
      </SettingsItem>
    </SettingsContainer>
  );
};

export default Filters;
