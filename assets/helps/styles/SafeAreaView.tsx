import React from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView,Dimensions } from 'react-native';

export default props => (
  <SafeAreaView style={styles.AndroidSafeArea} {...props} >
    {props.children}
  </SafeAreaView>
);
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  AndroidSafeArea: {
      flex:1,
  }
});