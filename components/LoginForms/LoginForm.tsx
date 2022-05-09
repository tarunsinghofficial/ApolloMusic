import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';


const LoginForm = () => {

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    })

    return (
        <View>
            <TextInput 
                placeholder="Email"
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                autoFocus={true}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            />
            
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                textContentType='password'
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            />
            <Button title="Login" />

            <View style={{ flexDirection: 'row', marginTop: 40, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Don't have an account?</Text>
                <Button title="Sign Up" />
            </View>

        </View>

    )
}

export default LoginForm;