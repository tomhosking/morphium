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

const MK = require('react-native-material-kit');
const {
  MKButton,
  MKColor,
} = MK;
const ColoredFab = MKButton.coloredFab().withBackgroundColor(MKColor.Orange).build();

MK.setTheme({
  primaryColor: MKColor.Orange,
  accentColor: MKColor.Grey,
});


export default class MainView extends Component {
  constructor(props)
  {
    super(props);

    this.interval = new Date(1970,0,1,0,2,0,0);
    this.lastEvent = new Date(2017,3,10,10,30,0,0);

    // this.getSavedDate();

    // interval={this.interval} lastEvent={this.lastEvent}
  }


  render() {
    console.log(styles)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Morphium
        </Text>
        <VisibleMorphiumItemWidget  />

        <ColoredFab
          position='absolute'
          top={5}
          left={5}
          onPress={() => this.props.nav.push({id: 'morphium.MorphiumHelpView'})}
        >
          <Icon name="help" size={30} color={Palette.white} />
        </ColoredFab>
        <ColoredFab
          position='absolute'
          top={5}
          right={5}
          onPress={() => this.props.nav.push({id: 'morphium.MorphiumSettingsView'})}onPress={() => this.props.nav.push({id: 'morphium.MorphiumSettingsView'})}
        >
          <Icon name="settings" size={30} color={Palette.white} />
        </ColoredFab>

      </View>

    );
  }
}
