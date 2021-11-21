import React, { useContext } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import { Song } from "../../types";
import { AppContext } from '../../Appcontext';

export type SongListItemProps = {
  song: Song
}

const SongListItem = (props: SongListItemProps) => {
  const { song } = props;

  const { setSongId } = useContext(AppContext);

  const onPlay = () => {
    setSongId(song.id);
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
      </View>
    </TouchableOpacity>
  )
}

export default SongListItem;