import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper'


const OnboardingScreen = ({ navigation }) => {

    const dot = () => {
        return (
            <View style={{
                backgroundColor: '#A96CE2'
            }}>
            </View>
        )
    }

    return (
        <Onboarding
            bottomBarHighlight={false}
            DotComponent={dot}
            onDone={()=> navigation.replace("Root")}
            pages={[
                {
                    backgroundColor: '#A96CE2',
                    image: <Image source={require('../assets/images/stream.png')} />,
                    title: 'Welcome to Apollo streaming',
                    subtitle: 'Find your music and dive into Nirvana',
                },
            ]}
        />
    )
}

export default OnboardingScreen