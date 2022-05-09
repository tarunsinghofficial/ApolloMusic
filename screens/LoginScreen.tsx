import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import LoginForm from '../components/LoginForms/LoginForm';

const INSTAGRAM_LOGO = 'https://cdn4.iconfinder.com/data/icons/social-media-2210/24/Instagram-512.png'

function LoginScreen({ }) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={{uri: INSTAGRAM_LOGO, height: 100, width: 100}}
                /> 
            </View>
            <LoginForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 50, 
        paddingHorizontal: 12,
    },
    logoContainer: {
        alignItems: 'center',
    }
});

export default LoginScreen;