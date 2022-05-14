import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import DrawerNavigator from '../Navigators/DrawerNavigator';

export default class Dashboard extends React.Component{
    render(){
        return(
            <NavigationContainer>
                <DrawerNavigator />
            </NavigationContainer>
        )
    }
}