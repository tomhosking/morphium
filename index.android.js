/**
 * Morphium
 * https://github.com/tomhosking/morphium
 * @flow
 *
 * Dependencies: https://github.com/bgryszko/react-native-circular-progress
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
  BackAndroid,
  Button,
  AsyncStorage
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Palette = require('google-material-color-palette-json')



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
            } else if (route.id == 'morphium.MorphiumHelpView') {

              return <MorphiumHelpView nav={navigator} />
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
        <MorphiumItemEditView />
        <Text onPress={() => {this.props.nav.pop()}}>Done</Text>
      </View>
    );
  }
}

export class MorphiumItemEditView extends Component {
  constructor(props)
  {
    super(props)
  }

  render()
  {
    return (
      <View>
      <TextInput
              style={{height: 40, width:200}}
              placeholder="Drugname"
              onChangeText={(text) => this.setState({text})}
            />
      <TextInput
              style={{height: 40, width:200}}
              placeholder="Interval"
              onChangeText={(text) => this.setState({text})}
            />
      </View>
    )
  }
}

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

export class MorphiumIndexView extends Component {
  constructor(props)
  {
    super(props);

    this.interval = new Date(1970,0,1,0,2,0,0);
    this.lastEvent = new Date(2017,3,10,10,30,0,0);

    // this.getSavedDate();

  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Morphium
        </Text>
        <MorphiumItemWidget interval={this.interval} lastEvent={this.lastEvent} />
  <Text style={styles.menu_right} onPress={() => this.props.nav.push({id: 'morphium.MorphiumSettingsView'})}><Icon name="settings" size={30} color={Palette.orange.shade_500} /></Text>
  <Text style={styles.menu_left}  onPress={() => this.props.nav.push({id: 'morphium.MorphiumHelpView'})}><Icon name="help" size={30} color={Palette.orange.shade_500} /></Text>


      </View>
    );
  }
}

export class MorphiumItemWidget extends Component
{
  constructor(props)
  {
    super(props);

    now = new Date();
    this.state =  {
      lastEvent: this.props.lastEvent,
      timeRemaining: new Date(0),
      fillState: 100,
      enabled: false
    }
    this.getLastEvent()

    this.onTrigger = this.onTrigger.bind(this)
    this.onTick = this.onTick.bind(this)

  }
  componentDidMount()
  {
    this.onTick();

  }
  getLastEvent = async () => {
    try {
      // await AsyncStorage.removeItem(STORAGE_KEY);

      var value = await AsyncStorage.getItem('morphium.lastEvent');
      var newTgt = Date.parse(value)
      if (value !== null){
        this.setState({lastEvent: newTgt});
        console.log('Recovered selection from disk: ' + value);
        requestAnimationFrame(this.onTick);

      } else {
        console.log('Initialized with no selection on disk.');
      }
      this.onTick();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  };

  setLastEvent = async (t) => {
   try {
     await AsyncStorage.setItem('morphium.lastEvent', t.toUTCString());
     console.log('Saved selection to disk: ' + t);
   } catch (error) {
     console.log('AsyncStorage error: ' + error.message);
   }
 };
  onTrigger()
  {
    // This should all be handled higher up really - then lastEvent can be removed from state
    let now = new Date()
    this.setLastEvent(now)
    console.log('On trigger! ' + now);
    this.setState({'lastEvent': now});
    this.setState({
      'timeRemaining':  new Date(this.props.interval - (now - now)),
      'fillState': Math.min(100*(now - now)/this.props.interval.getTime(), 100),
      'enabled': this.props.interval - (now - now) < 0
    })
    requestAnimationFrame(this.onTick);
  }
  onTick()
  {
    now = new Date();
    this.setState({
      'timeRemaining':  new Date(this.props.interval - (now - this.state.lastEvent)),
      'fillState': Math.min(100*(now - this.state.lastEvent)/this.props.interval.getTime(), 100),
      'enabled': this.props.interval - (now - this.state.lastEvent) < 0
    })


    console.log(this.state.timeRemaining);
    console.log(this.state.lastEvent)
    console.log(this.props.interval.getTime())
    console.log(now - this.state.lastEvent)
    console.log(this.state.fillState)
    if(!this.state.enabled)
    {
      setTimeout(this.onTick, 2000);
    }
  }
  render()
  {

    return (
      <View>
      <AnimatedCircularProgress
        size={200}
        width={30}
        fill={this.state.fillState}
        rotation={0}
        tintColor={(this.state.enabled) ? Palette.pink.shade_500 : Palette.cyan.shade_100 }
        backgroundColor={(this.state.enabled) ? Palette.pink.shade_800 : Palette.cyan.shade_700  }>
        {
          (fill) => {
            if(!this.state.enabled)
            {
              return (<Text style={styles.points}>
              {this.state.timeRemaining.getHours() + 'h ' + this.state.timeRemaining.getMinutes() + 'm'}
              </Text>)

            }
            else
              {

               return <Text style={styles.points} onPress={this.onTrigger}>Start</Text>

               }
          }
        }
      </AnimatedCircularProgress>
      <Text style={styles.instructions}>
        {'Drugname'} - {'4:00'}
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
    position: 'absolute',
    top:0,
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
  menu_right: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  menu_left: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});

AppRegistry.registerComponent('morphium', () => MorphiumApp);
