import React from 'react'
import LottieView from 'lottie-react-native'

export default function Animator({visible = false}) {

    if(!visible) return null;

    return (
        <LottieView
            autoPlay
            loop
            source={require('../assets/animation/loading1.json')}
        />
    )
}