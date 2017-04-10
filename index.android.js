/**
 * Morphium
 * https://github.com/tomhosking/morphium
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator,
  TouchableHighlight,
  BackAndroid
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default class MorphiumApp extends Component {

  render() {

    return (
      <Navigator
        initialRoute={{id: 'morphium.MorphiumIndexView'}}
        renderScene={(route, navigator) =>

          {
            BackAndroid.addEventListener('hardwareBackPress', function() {
             // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
             // Typically you would use the navigator here to go to the last state.
             console.log(navigator.getCurrentRoutes());
             if(navigator.getCurrentRoutes().length > 1)
             {
               navigator.pop();
               return true;
             }
             return false;
            });
              if (route.id == 'morphium.MorphiumSettingsView') {

                return <MorphiumSettingsView nav={navigator} />
            } else {
              return <MorphiumIndexView nav={navigator} />
            }
          }
        }
        />
    );
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
          Settins
        </Text>
        <TextInput
                style={{height: 40, width:200}}
                placeholder="Drugname"
                onChangeText={(text) => this.setState({text})}
              />
        </View>
    );
  }
}

export class MorphiumIndexView extends Component {
  constructor(props)
  {
    super(props);

    this.period = new Date(1970,0,1,4,0,0,0);
    this.lastEvent = new Date(2017,3,10,10,30,0,0);

    now = new Date();
    this.state =  { timeRemaining: new Date(this.period - (now - this.lastEvent)), fillState: 100*(now - this.lastEvent)/this.period.getTime()}

    console.log(this.state.timeRemaining.getTime());
    console.log((now - this.lastEvent))
    console.log(this.period.getTime())
    console.log(this.state.fillState)
    // this.getSavedDate();
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Morphium
        </Text>
        <AnimatedCircularProgress
  size={200}
  width={30}
  fill={this.state.fillState}
  rotation={0}
  tintColor="#3d5875"
  backgroundColor="#00e0ff">
  {
    (fill) => (
      <Text style={styles.points}>
        { this.state.timeRemaining.getHours() + 'h ' + this.state.timeRemaining.getMinutes() + 'm' }
      </Text>
    )
  }
  </AnimatedCircularProgress>
  <Text onPress={() => this.props.nav.push({id: 'morphium.MorphiumSettingsView'})}>Settings</Text>
  <Text style={styles.welcome}>
    {'Drugname'}
  </Text>
  <Text style={styles.welcome}>
    {'4:00'}
  </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 82,
    left: 56,
    width: 90,
    textAlign: 'center',
    color: '#7591af',
    fontSize: 25,
    fontWeight: "100"
  },
});

AppRegistry.registerComponent('morphium', () => MorphiumApp);
