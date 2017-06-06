import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const Palette = require('google-material-color-palette-json')
var styles = require('../styles.js').styles

import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  console.log('got state: ' + JSON.stringify(state.title))
  return {
    lastEvent: new Date(state.triggerTime),
    interval: (state.interval),
    title: state.title
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTrigger: () => {
      console.log('trigger activated')
      dispatch({type: 'TRIGGER', id: 0})
    }
  }
}

export class MorphiumItemWidget extends Component
{
  constructor(props)
  {
    super(props);

    now = new Date();
    this.state =  {
      // lastEvent: this.props.lastEvent,
      timeRemaining: new Date(0),
      fillState: 100,
      enabled: false
    }
    // this.getLastEvent()

    // this.onTrigger = this.onTrigger.bind(this)
    this.onTick = this.onTick.bind(this)

  }
  componentDidMount()
  {
    this.onTick();

  }
  // onTrigger()
  // {
  //   // This should all be handled higher up really - then lastEvent can be removed from state
  //   let now = new Date()
  //   this.setLastEvent(now)
  //   console.log('On trigger! ' + now);
  //   this.setState({'lastEvent': now});
  //   this.setState({
  //     'timeRemaining':  new Date(this.props.interval - (now - now)),
  //     'fillState': Math.min(100*(now - now)/this.props.interval.getTime(), 100),
  //     'enabled': this.props.interval - (now - now) < 0
  //   })
  //   requestAnimationFrame(this.onTick);
  //
  // }
  componentWillReceiveProps()
  {
    // This feels dirty... maybe tidy it once things are mostly working
    requestAnimationFrame(this.onTick);
  }
  onTick()
  {
    now = new Date();
    timeRemaining = this.props.interval - (now - this.props.lastEvent)
    this.setState({
      'timeRemaining':  {hours: Math.floor(timeRemaining/(1000*60*60)),minutes: Math.floor(timeRemaining/(1000*60) % 60)},
      'fillState': Math.min(100*(now - this.props.lastEvent)/this.props.interval, 100),
      'enabled': this.props.interval - (now - this.props.lastEvent) < 0
    })

    console.log('TICK')
    console.log((this.props.interval - (now - this.props.lastEvent))/1000/60);
    console.log(this.props.lastEvent)
    console.log(now)
    // console.log(now - this.props.lastEvent)
    // console.log(this.state.fillState)
    if(!this.state.enabled)
    {
      setTimeout(this.onTick, 20000);
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
              {this.state.timeRemaining.hours + 'h ' + this.state.timeRemaining.minutes + 'm'}
              </Text>)

            }
            else
              {

               return <Text style={styles.points} onPress={this.props.onTrigger}>Start</Text>

               }
          }
        }
      </AnimatedCircularProgress>
      <Text style={styles.instructions}>
        {this.props.title} - {Math.floor(this.props.interval/(1000*60*60))+'h '+Math.floor(this.props.interval/(1000*60) % 60)+'m'}
      </Text>
      </View>
  );
  }
}

const VisibleMorphiumItemWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(MorphiumItemWidget)
export default VisibleMorphiumItemWidget;
