import React from 'react'
import LottieView from 'lottie-react-native'

export default class Animation extends React.Component{
    render(){
        return(
            <LottieView 
            source = {this.props.src}
            style = {{width: this.props.width, height: this.props.height, alignSelf: 'center', alignItems: 'center'}}
            autoPlay loop
            />
        );
    }
}