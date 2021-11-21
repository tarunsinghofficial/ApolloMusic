import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { Album } from '../../types';
import styles from './style';

export type AlbumHeaderProps = {
    album: Album;
}


const ALbumHeader = (props: AlbumHeaderProps) => {
    const { album } = props;
    return (
        <View style={styles.container}>
            <Image source={{ uri: album.imageUri }} style={styles.image} />
            <Text style={styles.name}> {album.name} </Text>
            <View style={styles.creatorContainer} >
                <Text style={{ color: colors.white }}>By {album.by}</Text>
                <Text style={styles.likes}>{album.numberOfLikes} Likes </Text>
            </View>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Enjoy Listening</Text>
            </View>
        </View>
    )
}

export default ALbumHeader;


