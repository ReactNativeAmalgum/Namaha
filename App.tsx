import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SwitchNavigator from './navigation/LoginNavigation'
import thunkMiddleware  from 'redux-thunk';
import reducer from './reducers/index'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
const middleware = applyMiddleware(thunkMiddleware)
const store =  createStore(reducer, middleware)

export default class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
          <SwitchNavigator />
      </Provider>
    )
  }
}

