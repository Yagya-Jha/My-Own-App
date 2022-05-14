import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HelpingHand from '../Screens/HelpingHand';
import LevelSelect from '../Screens/LevelSelect';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends React.Component{
    constructor(){
        super();
        this.state = {};
    }

    render(){
        return (
            <Tab.Navigator
            labeled = {false}
            barStyle = {styles.bottomtabstyle}
            screenOptions = {({route})=>({
              tabBarIcon: ({focused, color, size})=>{
              let iconname;
    
              if(route.name==='Helping-Hand'){
                iconname = focused?'chatbox-ellipses':'chatbox-ellipses-outline';
              }else if(route.name === 'Level-Select'){
                iconname = focused?'game-controller':'game-controller-outline'
              }
              return < Ionicons name = {iconname} itemname size = {RFValue(25)} color = {color} style = {styles.icons}/>
              },})}
              tabBarOptions = {{
                activeTintColor: 'black',
                inactiveTintColor: 'white'
              }}>
              <Tab.Screen name = "Helping-Hand" component = {HelpingHand} options = {{unmountOnBlur: true}}/>
              <Tab.Screen name = "Level-Select" component = {LevelSelect} options = {{unmountOnBlur: true}} />
              </Tab.Navigator>
        );
      }
      }
    
      const styles = StyleSheet.create({
        bottomtabstyle:{
          backgroundColor: "#2f345d",
          height: '8%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          overflow: "hidden",
          position: "absolute",
          borderColor: 'black',
          borderWidth: 5
        },
        icons: {
          width: RFValue(35),
          height: RFValue(35),
        }
      });