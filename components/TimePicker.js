import React, { Component } from 'react';
import {
  Text,
  TimePickerAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Palette = require('google-material-color-palette-json')



export class TimePicker extends Component
{
  constructor(props)
  {
    super(props)
    this.showPicker = this.showPicker.bind(this)
  }
  componentWillMount()
  {
    this.setState({value: this.props.value, hours: Math.floor(this.props.value/(1000*60*60)), minutes: Math.floor(this.props.value/(1000*60) % 60)})
  }
  render()
  {
    return(
      <Text onPress={this.showPicker}>
      {this.state.hours + 'h ' + this.state.minutes+'m'}
      <Icon name="edit" size={30} color={Palette.orange.shade_500} />
      </Text>

    )
  }

  async showPicker()
  {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: this.state.hours,
        minute: this.state.minutes,
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        newVal = 1000*60 * (hour*60 + minute)
        this.setState({
          value: newVal,
          hours: Math.floor(newVal/(1000*60*60)),
          minutes: Math.floor(newVal/(1000*60) % 60)
        })
        this.props.onChange(newVal)
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

}
