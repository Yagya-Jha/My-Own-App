import AppLoading from 'expo-app-loading';
import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView, FlatList} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import db from '../Config';
import Animation from './Logo'

let custom_font = {'customfont':require('../assets/customFont/WhaleITriedRegular.ttf')}

export default class Score extends React.Component{
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
            let score = this.props.route.params.score;
            return(
                <View style = {styles.container}>
                    <SafeAreaView style = {styles.safeview}/>
                    <Text style = {styles.appTitleText}>Learning Made Easy With Yagya</Text>
                    {score === 200?(<Text style = {{fontSize: RFValue(31), fontFamily: 'customfont', color: 'rgba(50, 220, 50, 255)'}}>Yay! Correct Answer</Text>):(<Text style = {{fontSize: RFValue(24), fontFamily: 'customfont', color: 'red'}}>Nice Try! But wrong Answer</Text>)}
                    <Text style = {styles.title}>Your Score: {score}</Text>
                    {score===200?(<Animation src = {require('../assets/Lottie_Animations/6271-winning-badge.json')} width = '50%' height = '50%'/>):(<Animation src = {require('../assets/Lottie_Animations/lf30_editor_odbk97me.json')} width = '35%' height = '35%'/>)}
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'skyblue',
        justifyContent: "center",
        alignItems:"center",
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
        marginTop: 15,
        fontSize: RFValue(25),
        fontFamily: 'customfont',
    }
});