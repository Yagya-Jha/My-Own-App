import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Profile from '../Screens/Profile'
import StackNavigator from './StackNavigator'
import BottomTabNavigator from './TabNavigator';
import Logout from '../Screens/Logout';
import firebase from 'firebase';
import CustomSideBarMenu from './CustomSideBarMenu'

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component{
    constructor(){
        super();
        this.state = {};
    }

    render(){
        return(
            <Drawer.Navigator 
            drawerContentOptions = {{activeTintColor: '#e91e63', inactiveTintColor: 'gray'}}
            drawerContent = {(props)=><CustomSideBarMenu{...props} />}
            >
                <Drawer.Screen name = "Home" component = {StackNavigator} options = {{unmountOnBlur: true}}></Drawer.Screen>
                <Drawer.Screen name = "Profile" component = {Profile} options = {{unmountOnBlur: true}}></Drawer.Screen>
                <Drawer.Screen name = "Logout" component = {Logout} options = {{unmountOnBlur: true}}></Drawer.Screen>
            </Drawer.Navigator>
        );
    }
}