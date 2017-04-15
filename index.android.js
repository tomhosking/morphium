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


var styles = require('./styles.js').styles
import ConnectedItemEditor from './components/ItemEditor'
import MorphiumItemWidget from './components/ItemWidget'
import HelpView from './components/HelpView'
import SettingsView from './components/SettingsView'
import MainView from './components/MainView'

import { connect, Provider } from 'react-redux'
import { compose, createStore } from 'redux'
import morphiumReducer from './reducers'


import {persistStore, autoRehydrate} from 'redux-persist'

const initState = {triggerTime: new Date(0), interval: new Date(1000*60*60*4)}

const store = compose(autoRehydrate())(createStore)(morphiumReducer, initState)



export default class MorphiumApp extends Component {
  componentWillMount()
  {
    persistStore(store, {storage: AsyncStorage}, (err, state) => {
      console.log('rehydration complete')
      console.log('loaded: ' + state.triggerTime)
    })
  }

  render() {

    return (
      <Provider store={store}>
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
              return <MainView nav={navigator} />
            }
          }
        }
        />
        </Provider>
    );
  }
}

AppRegistry.registerComponent('morphium', () => MorphiumApp);
