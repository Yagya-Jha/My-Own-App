import AppLoading from 'expo-app-loading';
import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView, FlatList} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import firebase from 'firebase';
import db from '../Config';

let custom_font = {'customfont':require('../assets/customFont/WhaleITriedRegular.ttf')}

export default class PostDoubt extends React.Component{
    constructor(){
        super();
        this.state = {fontLoaded: false, doubt: ''};
    }

    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontLoaded: true});
    }

    componentDidMount(){
        this.loadFonts();
    }

    postDoubt = async(doubt) =>{
        let mydoubt = doubt;
        if(mydoubt.trim !== ''){
            db.collection("Doubts").add({
                'doubt': mydoubt,
                'id': ''
            }).then(response=>{
                console.log(response.id)
                db.collection('Doubts').doc(response.id.toString()).update({
                    'id':response.id
                });
            }).catch(e=>{
                console.log(e)
            })
            Alert.alert('Doubt Posted Successfully !!')
            this.setState({doubt: ''});
            this.props.navigation.navigate('Helping-Hand');
        }else{
            Alert.alert("Error", "Please write something", [{text: 'Ok',onPress: ()=>console.log("ok pressed")}], {cancelable: false})
        }
    }

    render(){
        if(! this.state.fontLoaded){
            return <AppLoading />
        }else{
            return(
                <View style = {styles.container}>
                    <SafeAreaView style = {styles.safeview}/>
                    <Text style = {styles.appTitleText}>Learning Made Easy With Yagya</Text>
                    <Text style = {styles.title}>Post doubt</Text>
                    <View>
                        <View style = {styles.inputContainer}>
                            <TextInput textAlign = "center" multiline = {true} style = {styles.textInputStyle} placeholder = 'Write your doubt here' onChangeText = {(text)=>{this.setState({doubt: text})}}></TextInput>
                        </View>
                        <TouchableOpacity onPress = {()=>this.postDoubt(this.state.doubt)} style = {styles.postbutton}><Text style = {{fontFamily: 'customfont', fontSize: RFValue(25)}}>Post</Text></TouchableOpacity>
                    </View>
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
    textInputStyle:{
        backgroundColor: 'white',
        marginLeft: 20,
        alignSelf:"center",
        width: RFValue(230),
        borderWidth: 5,
        height: RFValue(55),
        borderRadius: 30,
        bottom: RFValue(100),
        marginLeft: RFValue(-10)
    },
    inputText: {
        fontSize: RFValue(25),
        fontFamily: 'customfont',
        alignSelf: 'center',
        marginTop: RFValue(10)
    },
    appTitleText: {
        fontSize: RFValue(30),
        fontFamily: 'customfont',
        textAlign: 'center'
    },
    title: {
       // marginTop: RFValue(10),
        fontSize: RFValue(35),
        fontFamily: 'customfont',
        bottom: RFValue(235),
    },
    inputContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        flex: 0.05,
        justifyContent: "center",
    },
    postbutton: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: RFValue(20),
        width: '100%',
        height: RFValue(50),
        backgroundColor: 'white',
        justifyContent: 'center',
    },
});