import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button
} from 'react-native';
import {TimePicker} from './TimePicker'

import { connect } from 'react-redux'



export class MorphiumItemEditor extends Component {
  constructor(props)
  {
    super(props)
  }

  render()
  {
    return (
      <View>
        <Text>
          Drug name:
        </Text>
        <TextInput
          style={{height: 40, width:200}}
          placeholder="Drug name"
          onChangeText={(e) => this.props.onChangeTitle(e)}
          defaultValue={this.props.title}
        />
        <Text>
          Interval:
        </Text>
        <TimePicker value={this.props.interval} onChange={(t) => this.props.onChangeInterval(t)}/>

      </View>
    )
  }
}


const mapStateToProps = (state) => {
  // console.log('got state: ' + state.triggerTime)
  return {
    lastEvent: new Date(state.triggerTime),
    interval: (state.interval),
    title: state.title
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTitle: (t) => {
      // console.log('title changed')
      dispatch({type: 'SET_TITLE', id: 0, title: t})
    },
    onChangeInterval: (i) => {
      // console.log('interval changed')
      dispatch({type: 'SET_INTERVAL', id: 0, interval: i})
    }
  }
}

const ConnectedItemEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(MorphiumItemEditor);

export default ConnectedItemEditor;
