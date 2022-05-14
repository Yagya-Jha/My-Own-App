import AppLoading from 'expo-app-loading';
import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView, FlatList} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import firebase from 'firebase';
import db from '../Config';

let custom_font = {'customfont':require('../assets/customFont/WhaleITriedRegular.ttf')}

export default class Profile extends React.Component{
    constructor(){
        super();
        this.state = {
            fontLoaded: false,
            data: []
        };
    }

    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontLoaded: true});
    }

    fetchUser = async()=>{
        let userid = firebase.auth().currentUser.email;
        let check = await db.collection("users").where('email', '==', userid).get();
        check.docs.map(doc =>{
            let data = doc.data();
            if(data){
                this.setState({data: data});
            }
        })
    }

    componentDidMount(){
        this.fetchUser();
        this.loadFonts();
    }

    render(){
        if(! this.state.fontLoaded){
            return <AppLoading />
        }
        else{
            let images = {
                "image_1": require('../assets/Profile_Pictures/profile_img.png'),
                "image_2": require('../assets/Profile_Pictures/profile_img_2.png'),
                "image_3": require('../assets/Profile_Pictures/profile_img_3.png'),
            };
            console.log(this.state.data)
            return(
                <View style = {styles.container}>
                    <SafeAreaView style = {styles.safeview}/>
                        <View style = {{bottom:RFValue(100)}}>
                            <Text style = {styles.appTitleText}>Learning Made Easy With Yagya</Text>
                            <Text style = {styles.title}>Profile</Text>
                        </View>
                        <View style = {{marginTop: -100}}>
                            <Image source = {images[this.state.data.Profilepic]} style = {{width: RFValue(256), height: RFValue(256), alignSelf: "center"}} />
                            <Text style = {{margintop: 10, fontFamily: 'customfont', fontSize: RFValue(26)}}>Name: {this.state.data.Name}</Text>
                            <Text style = {{margintop: 10, fontFamily: 'customfont', fontSize: RFValue(26)}}>Grade: {this.state.data.Grade}</Text>
                            <Text style = {{margintop: 10, fontFamily: 'customfont', fontSize: RFValue(26)}}>Description: {this.state.data.Description}</Text>
                            <Text style = {{margintop: 10, fontFamily: 'customfont', fontSize: RFValue(26)}}>Score: {this.state.data.score}</Text>
                        </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff61',
        justifyContent: "center",
        alignItems:"center",
        height: '100%',
        width: '100%'
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
        alignSelf: 'center',
        alignItems: 'center',
    }
});