import * as React from 'react'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen  from "../screens/TabScreens/HomeScreen"
// import PostScreen from "../screens/TabScreens/PostScreen"
import PostScreen from '../screens/TabScreens/PostScreen';
import SearchScreen from '../screens/TabScreens/SearchScreen';
import NotificationScreen from '../screens/TabScreens/NotificationScreen';
import  ProfileScreen  from '../screens/TabScreens/ProfileScreen';
import { FontAwesome } from '@expo/vector-icons'


const Tab = createMaterialBottomTabNavigator();

export default function MyTabs(){
    return(
        <Tab.Navigator 
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: '#00c4cc' }}
            >
            <Tab.Screen name="Home" 
            
            component={HomeScreen} 
             options={({ route}) => ({
                tabBarIcon: ({color, size }) => (
                    <FontAwesome name='home' color={color} size={25} />
                )
            })} 
            />
            <Tab.Screen name="Search" component={SearchScreen} 
             options={({ route}) => ({
                tabBarIcon: ({color, size }) => (
                    <FontAwesome name='search' color={color} size={25} />
                )
            })} 
            />
            <Tab.Screen name="Post" component={PostScreen} 
              options={({ route}) => ({
                tabBarIcon: ({color, size }) => (
                    <FontAwesome name='plus' color={color} size={25} />
                )
            })} 
            />
            <Tab.Screen name="Newspaper" component={NotificationScreen} 
            options={({ route}) => ({
                tabBarIcon: ({color, size }) => (
                    <FontAwesome name='newspaper-o' color={color} size={24} />
                )
            })} 
            />
            
            <Tab.Screen name="Profile" component={ProfileScreen}
            options={({ route}) => ({
                tabBarIcon: ({color, size }) => (
                    <FontAwesome name='user' color={color} size={25} />
                )
            })}
            />
        </Tab.Navigator>
    )
}