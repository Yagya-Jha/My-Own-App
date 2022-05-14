import * as React from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase'
import db from '../Config'

export default class Logout extends React.Component{
    componentDidMount(){
        firebase.auth().signOut();
    }

    render(){
        return(
            <View style = {{flex: 1, justifyContent:"center", alignItems:"center", backgroundColor: 'pink'}}>
                <Text>
                    Successfully Logged Out
                </Text>
            </View>
        )
    }
}