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

const mapStateToProps = (state) => {
  // console.log('got state: ' + state.triggerTime)
  return {
    lastEvent: new Date(state.triggerTime),
    interval: state.interval,
    title: state.title
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}


export class MorphiumSettingsView extends Component {
  constructor(props)
  {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Settings
        </Text>
        <ConnectedItemEditor />
        <Button onPress={() => {this.props.nav.pop()}} title="Done" />
      </View>
    );
  }
}

const VisibleMorphiumSettingsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MorphiumSettingsView)
export default VisibleMorphiumSettingsView;
