import React, { useContext, useState } from 'react';
import { Text, Image, View, TouchableOpacity, Alert, Modal } from 'react-native';

import styles from './styles';
import { Song } from "../../types";
import { AppContext } from '../../Appcontext';
import { FontAwesome } from '@expo/vector-icons';



export type SongListItemProps = {
  song: Song
}

const SongListItem = (props: SongListItemProps) => {
  const { song } = props;

  const { setSongId } = useContext(AppContext);

  const onPlay = () => {
    setSongId(song.id);
  }


  const [post, setPost] = useState(props.song.post);
  const [isLiked, setIsLiked] = useState(false);

  const onLikePress = () => {
    const LikesToAdd = isLiked ? -1 : 1;
    setPost({ ...song, likes: song.likes + LikesToAdd });
    setIsLiked(!isLiked);
    Alert.alert(isLiked ? 'Unliked' : 'Liked' );

  }

  return (
    <TouchableOpacity onPress={onPlay}>
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text numberOfLines={1} style={styles.title}>{song.title}</Text>
          <Text style={styles.artist}>{song.artist}</Text>
        </View>
        <View>
          <Text style={{
            color: 'white'
          }}>{song.duration}</Text>
        </View>
        <Image source={{ uri: song.imageUri }} style={styles.image} />
        <TouchableOpacity style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}
          onPress={onLikePress}
        >
          <FontAwesome
            name={'heart'}
            size={25}
            color={isLiked ? 'red' : 'white'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default SongListItem;