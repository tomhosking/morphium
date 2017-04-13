import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button
} from 'react-native';

import { connect } from 'react-redux'
import ConnectedItemEditor from './ItemEditor'
var styles = require('../styles.js').styles


export default class MorphiumSettingsView extends Component {
  constructor(props)
  {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Settins
        </Text>
        <ConnectedItemEditor />
        <Text onPress={() => {this.props.nav.pop()}}>Done</Text>
      </View>
    );
  }
}
