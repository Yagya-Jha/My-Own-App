import AppLoading from 'expo-app-loading';
import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView, FlatList} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import firebase from 'firebase';
import db from '../Config';

let custom_font = {'customfont':require('../assets/customFont/WhaleITriedRegular.ttf')}

export default class ResolveDoubt extends React.Component{
    constructor(){
        super();
        this.state = {fontLoaded: false, answer: '', data: []};
    }

    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontLoaded: true});
    }

    componentDidMount(){
        this.loadFonts();
    }

    addscore = async()=>{
        let userid = firebase.auth().currentUser.email;
        let check = await db.collection("users").where('email', '==', userid).get();
        check.docs.map(doc =>{
            let dat = doc.data();
            if(dat){
                this.setState({data: dat});
            }
        });
        
        db.collection("users").doc(this.state.data.id.toString()).update({
            'score': this.state.data.score + 100
        });
        console.log("Score", this.state.data.score)
        this.props.navigation.navigate('Helping-Hand');
    }

    answer = async(answer)=>{
        let ans = answer;
        let ques = this.props.route.params.id;
        if(ans.trim !== ''){
            db.collection("Doubts").doc(ques.toString()).update({
                'answer_1':ans
            });

            this.setState({answer: ''});
            this.addscore();
        }else{
            Alert.alert("Error", "Please write something", [{text: 'Ok'}], {cancelable: false})
        }
    }

    render(){
        if(! this.state.fontLoaded){
            return <AppLoading />
        }
        else{
            let data = this.props.route.params.doubt;
            return(
                <View style = {styles.container}>
                    <SafeAreaView style = {styles.safeview}/>
                        <Text style = {styles.appTitleText}>Learning Made Easy With Yagya</Text>
                        <Text style = {styles.title}>Resolve Doubt</Text>
                        <View style = {styles.ques}>
                            <Text style = {{fontSize: RFValue(55), fontFamily: 'customfont', marginTop: 15, bottom: 5}}>{data}</Text>
                        </View>
                        <View>
                            <TextInput textAlign = "center" multiline = {true} style = {styles.textInputStyle} placeholder = 'Answer' onChangeText = {(text)=>{this.setState({answer: text})}}></TextInput>
                        </View>
                        <View>
                            <TouchableOpacity onPress = {()=>this.answer(this.state.answer)} style = {styles.postbutton}><Text style = {{fontFamily: 'customfont', fontSize: RFValue(25)}}>Post</Text></TouchableOpacity>
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
    textInputStyle:{
        backgroundColor: 'white',
        marginLeft: 20,
        alignSelf:"center",
        width: RFValue(230),
        borderWidth: 5,
        height: RFValue(55),
        borderRadius: 30,
        marginLeft: RFValue(-10)
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