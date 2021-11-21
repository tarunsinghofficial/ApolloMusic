import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,

} from 'react-native';
import { Sound } from "expo-av/build/Audio/Sound";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

export type Props = {
    title: string;
    image: string;
    uri: string;
};

const RadioCard = (props: Props) => {

    const [sound, setSound] = useState<Sound | null>(null)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const onPlayBackStatusUpdate = (status) => {
        setIsPlaying(status.isPlaying)
    }

    const playCurrentRadio = async () => {
        const { sound: newSound } = await Sound.createAsync(
            { uri: props.uri },
            { shouldPlay: isPlaying },
            onPlayBackStatusUpdate
        )
        setSound(newSound)
    }
    useEffect(() => {

        playCurrentRadio();
    }, []);

    const onPlayPause = async () => {
        if (!sound) {
            return;
        }
        if (isPlaying) {
            await sound.stopAsync()
        } else {
            await sound.playAsync()
        }
    }

    return (
        <View style={{
            padding: 20,
        }}>
            <View style={styles.container}>
                <Image source={{ uri: props.image }} style={{
                    width: 50,
                    height: 50,
                }} />
                <View style={{
                    paddingLeft: 10,
                    justifyContent: 'space-between'
                }}>
                    <Text numberOfLines={1} style={styles.text}>{props.title}</Text>
                    <TouchableOpacity style={{
                        backgroundColor: '#8400ff',
                        borderRadius: 20,
                        width: 70,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }} onPress={onPlayPause}>
                        <FontAwesome name={isPlaying ? 'pause' : 'play'} size={30} color={"white"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default RadioCard;