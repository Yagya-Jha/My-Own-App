import AppLoading from 'expo-app-loading';
import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView, FlatList} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import db from '../Config';

let custom_font = {'customfont':require('../assets/customFont/WhaleITriedRegular.ttf')}

export default class LevelSelect extends React.Component{
    constructor(){
        super();
        this.state = {fontLoaded: false};
    }

    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontLoaded: true});
    }

    componentDidMount(){
        this.loadFonts();
    }

    render(){
        if(! this.state.fontLoaded){
            return <AppLoading />
        }else{
            console.log(this.props);
            return(
                <View style = {styles.container}>
                    <SafeAreaView style = {styles.safeview}/>
                    <Text style = {styles.appTitleText}>Learning Made Easy With Yagya</Text>
                    <Text style = {styles.title}>Select an Operation: </Text>
                    <ScrollView style = {{marginTop: 10, width: '100%', height: '100%'}} >
                        <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('PlayScreen', {operation: 'addition'})}} style = {[styles.selectbttn, {marginTop: 50}]}><Text style = {{fontSize: RFValue(80), bottom: RFValue(20),alignSelf:'center', fontFamily: 'customfont'}}>+</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('PlayScreen', {operation: 'subtraction'})}} style = {styles.selectbttn}><Text style = {{fontSize: RFValue(80), bottom: RFValue(20),alignSelf:'center', fontFamily: 'customfont'}}>-</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('PlayScreen', {operation: 'multiplication'})}} style = {styles.selectbttn}><Text style = {{fontSize: RFValue(80), bottom: RFValue(35),alignSelf:'center', fontFamily: 'customfont'}}>x</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('PlayScreen', {operation: 'division'})}} style = {styles.selectbttn}><Text style = {{fontSize: RFValue(80), bottom: RFValue(20),alignSelf:'center', fontFamily: 'customfont'}}>÷</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        alignItems:"center",
        width: '100%',
        height: '100%'
    },
    safeview: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitleText: {
        fontSize: RFValue(30),
        fontFamily: 'customfont',
        textAlign: 'center'
    },
    title: {
        fontSize: RFValue(25),
        fontFamily: 'customfont',
    },
    selectbttn: {
        backgroundColor: 'white',
        width: '85%',
        height: RFValue(95),
        alignItems:"center",
        alignSelf:"center",
        marginTop: 25,
        bottom: 15,
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 7
    }
});