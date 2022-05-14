import AppLoading from 'expo-app-loading';
import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, View, TextInput, Alert, StyleSheet} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import firebase from 'firebase';
import Animation from './Logo';

let custom_font = {'customfont':require('../assets/customFont/WhaleITriedRegular.ttf')}

export default class Form extends React.Component{
    constructor(){
        super();
        this.state = {
            fontLoaded: false,
            emailID: '',
            password: '',
        };
    }

    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontLoaded: true});
    }
    
    componentDidMount(){
        this.loadFonts();
    }

    userSignup = (email, password)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password).then((resopnse)=>{ this.props.navigation.navigate('FormScreen') }).catch(function (error){
            return(Alert.alert(error.message))
        })
    }

    userSignIn(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password).then((resopnse)=>{ this.props.navigation.navigate('Dashboard') }).catch(function (error){
            return(Alert.alert(error.message))
        })
    }

    render(){
        if(! this.state.fontLoaded){
            return <AppLoading />
        }
        else{
            return(
                <View style = {styles.container}>
                        <KeyboardAvoidingView style = {{marginTop:20}} behaviour = "padding" enabled>
                        <Text style = {styles.appTitleText}>Learning Made Easy With Yagya</Text>
                        <Animation src = {require('../assets/Lottie_Animations/65012-learning-concept.json')} width = '50%' height = '50%'/>
                        <View style = {styles.inputContainer}>
                            <Text style = {styles.inputText}>
                                EmailID: 
                            </Text>
                            <TextInput textAlign = "center" style = {styles.textInputStyle} placeholder = 'emailID' keyboardType = {'email-address'} onChangeText = {(text)=>{this.setState({emailID: text})}}></TextInput>
                        </View>
                        <View style = {styles.inputContainer}>
                            <Text style = {styles.inputText}>
                                Password: 
                            </Text>
                            <TextInput textAlign = "center" style = {styles.textInputStyle} placeholder = 'Password' maxLength = {10} secureTextEntry = {true} onChangeText = {(text)=>{this.setState({password: text})}}></TextInput>
                        </View>
                        <View style = {[styles.otherContainer, {marginTop: RFValue(-100)}]}>
                            <View>
                                <Text style = {[styles.inputText, {fontSize: RFValue(18)}]}>Already Have an </Text>
                                <Text style = {[styles.inputText, {fontSize: RFValue(18)}]}>account?</Text>
                            </View>
                            <TouchableOpacity style = {styles.submitButton} onPress = {()=>this.userSignIn(this.state.emailID, this.state.password)}>
                                <Text style = {styles.inputText}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style = {styles.otherContainer}>
                            <Text style = {styles.inputText}>New User?</Text>
                            <TouchableOpacity style = {styles.submitButton} onPress = {()=>this.userSignup(this.state.emailID, this.state.password)} ><Text style = {styles.inputText}>SignUp</Text></TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue',
        alignItems:"center",
        justifyContent:"center",
    },
    inputContainer: {
        marginTop: 75,
        marginBottom: 20,
        bottom: RFValue(190),
        marginLeft: 20,
        flex: 0.05,
        flexDirection: 'row',
        justifyContent: "center",
    },
    otherContainer: {
        marginTop: 50,
        marginBottom: 20,
        marginLeft: 20,
        flex: 0.09,
        flexDirection: 'row',
        justifyContent: "center",
    },
    textInputStyle:{
        backgroundColor: 'white',
        marginLeft: 20,
        alignSelf:"center",
        width: RFValue(200),
        borderWidth: 5,
        height: RFValue(55),
        borderRadius: 30,
    },
    appTitleText: {
        marginTop: 20,
        fontSize: RFValue(30),
        fontFamily: 'customfont',
        textAlign: 'center'
    },
    inputText: {
        fontSize: RFValue(25),
        fontFamily: 'customfont',
        alignSelf: 'center'
    },
    submitButton:{
        backgroundColor: 'white',
        borderRadius: 25,
        width: RFValue(200),
        alignItems: 'center',
        height: RFValue(50),
        marginTop: 0
    },
});