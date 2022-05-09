import React, { Component, useState } from 'react'
import { Text, TouchableOpacity, View, TextInput, StatusBar, Alert, ScrollView } from 'react-native';

import { ref, set } from "firebase/database";
import { db } from '../components/firebase';

export default function TrackScreen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    function create () {
        set(ref(db, 'users/' + name), {
          name: name,
          email: email,
          phone: phone,
          message: message
        }).then(() => {
            Alert.alert('Success', 'Your message has been sent');
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        }).catch(error => {
            Alert.alert(error);
        });
    }

        return (
            <ScrollView style={{
                flex: 1,
                backgroundColor: '#fff',
            }}>
                <StatusBar backgroundColor={'#8400ff'} />
                <View style={{
                    backgroundColor: 'transparent',
                    height: 60,
                }}>
                    <Text style={{
                        color: '#8400ff',
                        marginTop: 18,
                        marginLeft: 20,
                        fontSize: 30,
                        fontWeight: 'bold',
                    }}>Send us a Message!</Text>
                    <Text style={{
                        color: '#8400ff',
                        marginLeft: 20,
                        fontSize: 15,
                    }}>Report a Bug or need Improvement.</Text>
                </View>
                <View style={{
                    marginTop: 20,
                }}>
                <Text style={{ fontSize: 20, color: '#8400ff', marginLeft: 20, marginTop: 20 }}>Name</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        margin: 20,
                        padding: 10,
                        borderRadius: 20
                    }}
                    keyboardType="default"
                    placeholder="Enter your Name"
                    placeholderTextColor={'#C9C6CC'}
                    value={name}
                    onChangeText={(name) => {setName(name)}}
                />
                <Text style={{ fontSize: 20, color: '#8400ff', marginLeft: 20 }}>Email</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        margin: 20,
                        padding: 10,
                        borderRadius: 20
                    }}
                    keyboardType="email-address"
                    placeholder="Enter your Email"
                    placeholderTextColor={'#C9C6CC'}
                    value={email}
                    onChangeText={(email) => {setEmail(email)}}
                />
                <Text style={{ fontSize: 20, color: '#8400ff', marginLeft: 20 }}>Contact</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        margin: 20,
                        padding: 10,
                        borderRadius: 20
                    }}
                    keyboardType="phone-pad"
                    placeholder="Enter your Phone number"
                    placeholderTextColor={'#C9C6CC'}
                    value={phone}
                    onChangeText={(phone) => {setPhone(phone)}}
                />
                <Text style={{ fontSize: 20, color: '#8400ff', marginLeft: 20 }}>Mesage</Text>
                <TextInput
                    style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        margin: 20,
                        padding: 10,
                        borderRadius: 10,
                        height: 200,
                    }}
                    placeholder="Enter your Message"
                    placeholderTextColor={'#C9C6CC'}
                    value={message}
                    onChangeText={(message) => {setMessage(message)}}
                >

                </TextInput>
                <TouchableOpacity style={{
                    backgroundColor: '#8400ff',
                    margin: 20,
                    padding: 10,
                    borderRadius: 60,
                    alignItems: 'center',
                }}
                onPress={create}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>Submit</Text>
                </TouchableOpacity>

                <Text style={{
                    fontSize: 15,
                    color: '#8400ff',
                    textAlign: 'center',
                }}>
                    v1.2.0
                </Text>
                </View>
            </ScrollView>
        )
}