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
    this.setState({value: this.props.value})
  }
  render()
  {
    return(
      <Text onPress={this.showPicker}>
      {this.state.value.getHours() + 'h ' + this.state.value.getMinutes()+'m'}
      <Icon name="edit" size={30} color={Palette.orange.shade_500} />
      </Text>

    )
  }

  async showPicker()
  {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: this.state.value.getHours(),
        minute: this.state.value.getMinutes(),
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        newVal = new Date(0)
        newVal.setHours(hour, minute, 0,0)
        this.setState({
          value: newVal
        })
        this.props.onChange(newVal)
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

}
