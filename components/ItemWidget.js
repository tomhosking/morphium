import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
  AsyncStorage
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const Palette = require('google-material-color-palette-json')
var styles = require('../styles.js').styles


export default class MorphiumItemWidget extends Component
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
