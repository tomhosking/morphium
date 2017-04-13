import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button
} from 'react-native';

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


const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const ConnectedItemEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(MorphiumItemEditor);

export default ConnectedItemEditor;
