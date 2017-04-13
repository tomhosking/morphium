import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button
} from 'react-native';

var styles = require('../styles.js').styles


export class MorphiumHelpView extends Component {
  constructor(props)
  {
    super(props)
  }
  render()
  {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Morphium</Text>
        <Text>Morphium is a pain medication helper app</Text>
        <Text onPress={() => {this.props.nav.pop()}}>Close</Text>
      </View>
    )
  }
}
