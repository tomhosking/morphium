import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
} from 'react-native';

var styles = require('../styles.js').styles
import VisibleMorphiumItemWidget from './ItemWidget'
import Icon from 'react-native-vector-icons/MaterialIcons';
const Palette = require('google-material-color-palette-json')

import { connect } from 'react-redux'

const mapStateToPropsTrig = (state) => {
  return {
  }
}

const mapDispatchToPropsTrig = (dispatch) => {
  return {
    onTrigger: () => {
      console.log('trigger activated')
      dispatch({type: 'TRIGGER', id: 0})
    }
  }
}

const mapStateToPropsRec = (state) => {
  return {
    output: state.triggerTime.toString()
  }
}

const mapDispatchToPropsRec = (dispatch) => {
  return {
    }

}




// const Trigger = ({onTrigger}) => (
//         <Text onPress={() => onTrigger()}>Trigger</Text>
//   );
class Trigger extends Component {
  // constructor(props)
  // {
  //   super(props)
  // }
  // static propTypes = {
  //   onTrigger: PropTypes.func.isRequired,
  // }
  render()
  {
    return(
      <Text onPress={this.props.onTrigger}>Trigger</Text>
    )
  }
}


class Receiver extends Component {
  render()
  {
    return(
      <Text>Out: {this.props.output}</Text>
    )
  }
}

const VisibleTrigger = connect(
  mapStateToPropsTrig,
  mapDispatchToPropsTrig
)(Trigger)
const VisibleReceiver = connect(
  mapStateToPropsRec,
  mapDispatchToPropsRec
)(Receiver)






export default class MainView extends Component {
  constructor(props)
  {
    super(props);

    this.interval = new Date(1970,0,1,0,2,0,0);
    this.lastEvent = new Date(2017,3,10,10,30,0,0);

    // this.getSavedDate();

  }


  render() {
    console.log(styles)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Morphium
        </Text>
        <VisibleMorphiumItemWidget interval={this.interval} lastEvent={this.lastEvent} />
  <Text style={styles.menu_right} onPress={() => this.props.nav.push({id: 'morphium.MorphiumSettingsView'})}><Icon name="settings" size={30} color={Palette.orange.shade_500} /></Text>
  <Text style={styles.menu_left}  onPress={() => this.props.nav.push({id: 'morphium.MorphiumHelpView'})}><Icon name="help" size={30} color={Palette.orange.shade_500} /></Text>
        <VisibleTrigger />
        <VisibleReceiver />

      </View>

    );
  }
}
