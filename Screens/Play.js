import AppLoading from 'expo-app-loading';
import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView, FlatList, ToastAndroid} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import firebase from 'firebase'
import db from '../Config';

let custom_font = {'customfont':require('../assets/customFont/WhaleITriedRegular.ttf')}

export default class Logout extends React.Component{
    constructor(){
        super();
        this.state = {fontLoaded: false, data: []};
    }

    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontLoaded: true});
    }

    componentDidMount(){
        this.loadFonts();
    }

    addscore = async(numtoadd)=>{
        let userid = firebase.auth().currentUser.email;
        let check = await db.collection("users").where('email', '==', userid).get();
        check.docs.map(doc =>{
            let data = doc.data();
            if(data){
                this.setState({data: data});
            }
        });
        
        db.collection("users").doc(this.state.data.id.toString()).update({
            'score': this.state.data.score + numtoadd*200
        });
        this.props.navigation.navigate('ScoreScreen', {score: numtoadd===1?+'200':'0'});
    }

    tryGetDivisible() {
        var firstRandomNumber = Math.floor(Math.random() * 100) + 1;
        var secondRandomNumber = Math.floor(Math.random() * 100) + 1;
        if (firstRandomNumber % secondRandomNumber === 0) {
          console.log(firstRandomNumber, secondRandomNumber);
          return ([firstRandomNumber,secondRandomNumber,firstRandomNumber / secondRandomNumber]);
        }
      }

      shuffle(array, seed) {                // <-- ADDED ARGUMENT
        var m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(this.random(seed) * m--);        // <-- MODIFIED LINE
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
          ++seed                                     // <-- ADDED LINE
        }
      
        return array;
      }
      
      random(seed) {
        var x = Math.sin(seed++) * 10000; 
        return x - Math.floor(x);
      }

      rand_Seed(){
        var seed = Math.round(0 + (Math.random() * (100-0)))
        return seed;
      }

    render(){
        if(! this.state.fontLoaded){
            return <AppLoading />
        }else{
            let operation = this.props.route.params.operation;
            let questions = [];
            let answers = [];
            let a = Math.round(0 + (Math.random() * (100-0)));
            let b = Math.round(0 + (Math.random() * (100-0)));
            
            if(operation==='addition'){

                while(a+b===4 || a+b===10 || a+b===8 || a+b===6 || a+b===9 || a+b===199 ){
                    a = Math.round(0 + (Math.random() * (100-0)));
                    b = Math.round(0 + (Math.random() * (100-0)));
                }
                
                questions = ['🍒 + 🍒', '🍎🍎🍎🍎🍎 + 🍎🍎🍎🍎🍎','🍉🍉🍉🍉 + 🍉🍉🍉🍉', '🍋🍋🍋 + 🍋🍋🍋', '1+8', '100+99', a.toString()+'+'+ b.toString()];
                answers = ['4', '10', '8', '6', '9', '199', a+b];
            }else if(operation==='subtraction'){

                while(a-b===0 || a-b===1 || a-b===3 || a-b===2 || a-b===10 || a-b===9 ){
                    a = Math.round(0 + (Math.random() * (100-0)));
                    b = Math.round(0 + (Math.random() * (100-0)));
                }

                if(a<b){
                    let c = a;
                    a=b;
                    b=c;
                }
                questions = ['🍒 - 🍒', '🍎🍎🍎 - 🍎🍎', '🍆🍆🍆🍆🍆 - 🍆🍆', '🍋🍋🍋🍋 - 🍋🍋', '35-25', '100-91' , a.toString()+'-'+ b.toString()];
                answers = ['0', '1', '3', '2', '10', '9', a-b];
            }else if(operation==='multiplication'){
                while(a*b===4 || a*b===6 || a*b===1 || a*b===8 || a*b===50 || a*b===42 ){
                    a = Math.round(0 + (Math.random() * (100-0)));
                    b = Math.round(0 + (Math.random() * (100-0)));
                }
                questions = ['🍒 x 🍒', '🍎🍎🍎 x 🍎🍎', '🍅 x 🍅', '🍍🍍🍍🍍 x 🍍🍍', '25 x 2', '6 x 7', a.toString()+'x'+ b.toString()];
                answers = ['4', '6', '1', '8', '50', '42', a*b];
            }else if(operation==='division'){
                let result;
                while(a/b===1 || a/b===2 || a/b===3 || a/b===4 || a/b===5 || a/b===7 ){
                    while (!result) result = this.tryGetDivisible();
                }
                const arr = result;
                a=arr[0]
                b=arr[1]
                questions = ['🍒 ÷ 🍒','🍅🍅🍅🍅 ÷ 🍅🍅','🍍🍍🍍🍍🍍🍍 ÷ 🍍🍍','🍎🍎🍎🍎 ÷ 🍎','🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆 ÷ 🍆🍆','77 ÷ 11',a.toString()+'÷'+ b.toString()];
                answers = ['1', '2', '3', '4', '5', '7', arr[2]];
            }

            let s = this.rand_Seed();
            this.shuffle(answers, s);
            this.shuffle(questions, s);
            let min = 0;
            let max = questions.length;
            let ques = Math.round(min + (Math.random() * (max-min)));
            let question = questions[ques];
            
            return(
                <View style = {styles.container}>
                    <View style = {styles.topcontainer}>
                        <SafeAreaView style = {styles.safeview}/>
                        <Text style = {styles.appTitleText}>Learning Made Easy With Yagya</Text>
                        <Text style = {styles.title}>Let the Game Begin!!</Text>
                    </View>
                    <View style = {styles.questions}>
                        <Text style = {styles.quesHeading}>Question: </Text>
                        <Text style = {styles.questionText}>{question}</Text>
                    </View>
                    <ScrollView style = {{width: '100%', height: 50}}>
                        <TouchableOpacity onPress = {()=>{answers[ques]===answers[0]?this.addscore(1):this.addscore(0)}} style = {styles.option}><Text style = {{fontSize: RFValue(40), fontFamily: 'customfont'}}>{answers[0]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{answers[ques]===answers[1]?this.addscore(1):this.addscore(0)}} style = {styles.option}><Text style = {{fontSize: RFValue(40), fontFamily: 'customfont'}}>{answers[1]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{answers[ques]===answers[2]?this.addscore(1):this.addscore(0)}} style = {styles.option}><Text style = {{fontSize: RFValue(40), fontFamily: 'customfont'}}>{answers[2]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{answers[ques]===answers[3]?this.addscore(1):this.addscore(0)}} style = {styles.option}><Text style = {{fontSize: RFValue(40), fontFamily: 'customfont'}}>{answers[3]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{answers[ques]===answers[4]?this.addscore(1):this.addscore(0)}} style = {styles.option}><Text style = {{fontSize: RFValue(40), fontFamily: 'customfont'}}>{answers[4]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{answers[ques]===answers[5]?this.addscore(1):this.addscore(0)}} style = {styles.option}><Text style = {{fontSize: RFValue(40), fontFamily: 'customfont'}}>{answers[5]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{answers[ques]===answers[6]?this.addscore(1):this.addscore(0)}} style = {styles.option}><Text style = {{fontSize: RFValue(40), fontFamily: 'customfont'}}>{answers[6]}</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a7ff4a',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    topcontainer: {
        width: '100%',
        height: '20%',
        backgroundColor: '#b32e37',
        justifyContent: "center",
        alignItems:"center",
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
    },
    quesHeading: {
        fontFamily: 'customfont',
        fontSize: RFValue(70),
    },
    questions: {
        width: '100%',
        alignItems: 'center'
    },
    questionText: {
        fontSize: RFValue(30),
        fontFamily: 'customfont'
    },
    option: {
        marginTop: 10,
        width: '90%',
        height: RFValue(60),
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
    }
});