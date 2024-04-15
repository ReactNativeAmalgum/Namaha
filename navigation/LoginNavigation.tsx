// In App.js in a new project

import * as React from 'react';
import { View, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Login from '../screens/AuthScreens/Login';
import Signup from '../screens/AuthScreens/Signup';
import Welcome from '../screens/AuthScreens/Welcome';
import StackNavigation from './StackNavigator'
import Apploading from 'expo'
import ProfilePicture from '../screens/AuthScreens/ProfilePicture';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
const Stack = createNativeStackNavigator()
export default function App(){
    let [fontsLoaded] = useFonts({
        'logofont': require('../assets/fonts/MochiyPopPOne-Regular.ttf')
    })

    if(!fontsLoaded) return <View />
    return(
        <NavigationContainer >
            <Stack.Navigator >
                <Stack.Screen name="Welcome" component={Welcome}  options={{title:"Welcome", headerShown: false}} />
                <Stack.Screen name="Login" component={Login}  options={{title:"Login", headerShown: false}} />
                <Stack.Screen name="Signup" component={Signup} options={{
                    headerStyle:{
                        backgroundColor: "white",
                        
                    },
                    headerTitle:'Sign up'
                }} />
                <Stack.Screen name="ProfilePicture" component={ProfilePicture} options={{
                    headerStyle:{
                        backgroundColor: "white"
                    },
                    headerTitle:'Create Profile'
                }} />
                <Stack.Screen name="StackNavigator" component={StackNavigation}  options={{title:"Welcome", headerShown: false}}  />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{title:"Welcome", headerShown: false}}  />

            </Stack.Navigator>
        </NavigationContainer>
    )
}