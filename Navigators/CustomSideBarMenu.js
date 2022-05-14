import * as React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'firebase';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default class CustomSideBarMenu extends React.Component{
    constructor(){
        super();
        this.state = {}
    }

    render(){
        let props = this.props;
        return(
            <View style = {{flex: 1, justifyContent: "center", backgroundColor: 'white'}}>
                <SafeAreaView style = {{flex: 0.1, backgroundColor: 'white'}} />
                <Image source = {require('../assets/MyPic.png')} style = {styles.iconImage} />
                <DrawerContentScrollView {...props} >
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconImage: {
        width: RFValue(250),
        height: RFValue(250),
        borderRadius: RFValue(70),
        alignSelf:"center",
        bottom: RFValue(-10),
        resizeMode:"contain",
        position: "relative"
    },
});