import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button
} from 'react-native';

var styles = require('../styles.js').styles


export default class MorphiumHelpView extends Component {
  constructor(props)
  {
    super(props)
  }
  render()
  {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Morphium</Text>
        <Text style={styles.instructions}>Morphium is a pain medication helper app.</Text>
        <Text style={styles.instructions}>Most medication apps remind you that you need to take something - Morphium will help you keep track of when you are allowed to take pain relief.</Text>
        <Text style={styles.instructions}>Set the name of your medication, and the minimum interval that you have been advised or prescribed by your doctor. When you press start, the app will count down that time for you. It keeps track of it even if you turn your phone off or cross into a different time zone.</Text>
        <Text style={styles.instructions}>This app does not give medical advice! Always follow the instructions that were given to you by your doctor.</Text>
        <Button onPress={() => {this.props.nav.pop()}} title='Close' />
      </View>
    )
  }
}
