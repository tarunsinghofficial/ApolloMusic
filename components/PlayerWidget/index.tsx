import React, { useContext, useEffect, useState } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { API, graphqlOperation } from 'aws-amplify';
import AudioNotification from "react-native-audio-notification";

import styles from './styles';
import { Sound } from "expo-av/build/Audio/Sound";

import { AppContext } from '../../Appcontext';
import { getSong } from "../../src/graphql/queries";


const PlayerWidget = () => {

  const [song, setSong] = useState(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  const { songId } = useContext(AppContext);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await API.graphql(graphqlOperation(getSong, { id: songId }))
        setSong(data.data.getSong);
      } catch (e) {
        console.log(e);
      }
    }

    fetchSong();
  }, [songId])

  const snd = {
    title: "Secrets",
    description: "OneRepublic",
    cover: "data:image/jpeg;base64,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",
    is_play: true,
    is_like: true
  }

  const notice = AudioNotification(snd);

  const onPlaybackStatusUpdate = (status) => {
    setIsPlaying(status.isPlaying);
    setDuration(status.durationMillis);
    setPosition(status.positionMillis);
    notice.update();
  }

  const playCurrentSong = async () => {
    if (sound) {
      await sound.unloadAsync();
      notice.setAudioConfig(snd);
    }

    const { sound: newSound } = await Sound.createAsync(

      { uri: song.uri },
      { shouldPlay: isPlaying },
      onPlaybackStatusUpdate

    )

    setSound(newSound)
  }



  /* const setNotifications = () => {
    MusicControl.setNowPlaying({
      title: song.title,
      artwork: song.imageUri,
      artist: song.artistsHeadline
    })
  } */

  useEffect(() => {
    if (song) {
      playCurrentSong();
      notice.notify();
    }
  }, [song])



  const onPlayPausePress = async () => {
    if (!sound) {
      return;
    }
    notice.notify();
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
      console.log(song);
    }
  }

  const getProgress = () => {
    if (sound === null || duration === null || position === null) {
      return 0;
    }

    return (position / duration) * 100;
  }

  if (!song) {
    return null;
  }


  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${getProgress()}%` }]} />
      <View style={styles.row}>
        <Image source={{ uri: song.imageUri }} style={styles.image} />
        <View style={styles.rightContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.title}>{song.title}</Text>
            <Text style={styles.artist}>{song.artist}</Text>
          </View>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={onPlayPausePress}>
              <FontAwesome name={isPlaying ? 'pause' : 'play'} size={30} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PlayerWidget;