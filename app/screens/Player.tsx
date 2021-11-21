import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider';
import {
  changeAudio,
  moveAudio,
  pause
} from '../misc/audioController';
import { convertTime } from '../misc/helper';
import { selectAudio } from '../misc/audioController';

const { width } = Dimensions.get('window');



const Player = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const context = useContext(AudioContext);
  const { playbackPosition, playbackDuration, currentAudio } = context;

  const rendered = () => {
    const isRendered = true
    return setIsRendered(isRendered);
  }

  const calculateSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }

    if (currentAudio.lastPosition) {
      return currentAudio.lastPosition / (currentAudio.duration * 1000);
    }

    return 0;
  };

  useEffect(() => {
    context.loadPreviousAudio();
    rendered();
  }, []);

  const handlePlayPause = async () => {
    await selectAudio(context.currentAudio, context);
    // // play
    // if (context.soundObj === null) {
    //   const audio = context.currentAudio;
    //   const status = await play(context.playbackObj, audio.uri);
    //   context.playbackObj.setOnPlaybackStatusUpdate(
    //     context.onPlaybackStatusUpdate
    //   );
    //   return context.updateState(context, {
    //     soundObj: status,
    //     currentAudio: audio,
    //     isPlaying: true,
    //     currentAudioIndex: context.currentAudioIndex,
    //   });
    // }
    // // pause
    // if (context.soundObj && context.soundObj.isPlaying) {
    //   const status = await pause(context.playbackObj);
    //   return context.updateState(context, {
    //     soundObj: status,
    //     isPlaying: false,
    //   });
    // }
    // // resume
    // if (context.soundObj && !context.soundObj.isPlaying) {
    //   const status = await resume(context.playbackObj);
    //   return context.updateState(context, {
    //     soundObj: status,
    //     isPlaying: true,
    //   });
    // }
  };

  const handleNext = async () => {
    await changeAudio(context, 'next');
    // const { isLoaded } = await context.playbackObj.getStatusAsync();
    // const isLastAudio =
    //   context.currentAudioIndex + 1 === context.totalAudioCount;
    // let audio = context.audioFiles[context.currentAudioIndex + 1];
    // let index;
    // let status;

    // if (!isLoaded && !isLastAudio) {
    //   index = context.currentAudioIndex + 1;
    //   status = await play(context.playbackObj, audio.uri);
    // }

    // if (isLoaded && !isLastAudio) {
    //   index = context.currentAudioIndex + 1;
    //   status = await playNext(context.playbackObj, audio.uri);
    // }

    // if (isLastAudio) {
    //   index = 0;
    //   audio = context.audioFiles[index];
    //   if (isLoaded) {
    //     status = await playNext(context.playbackObj, audio.uri);
    //   } else {
    //     status = await play(context.playbackObj, audio.uri);
    //   }
    // }

    // context.updateState(context, {
    //   currentAudio: audio,
    //   playbackObj: context.playbackObj,
    //   soundObj: status,
    //   isPlaying: true,
    //   currentAudioIndex: index,
    //   playbackPosition: null,
    //   playbackDuration: null,
    // });
    // storeAudioForNextOpening(audio, index);
  };

  const handlePrevious = async () => {
    await changeAudio(context, 'previous');
    // const { isLoaded } = await context.playbackObj.getStatusAsync();
    // const isFirstAudio = context.currentAudioIndex <= 0;
    // let audio = context.audioFiles[context.currentAudioIndex - 1];
    // let index;
    // let status;

    // if (!isLoaded && !isFirstAudio) {
    //   index = context.currentAudioIndex - 1;
    //   status = await play(context.playbackObj, audio.uri);
    // }

    // if (isLoaded && !isFirstAudio) {
    //   index = context.currentAudioIndex - 1;
    //   status = await playNext(context.playbackObj, audio.uri);
    // }

    // if (isFirstAudio) {
    //   index = context.totalAudioCount - 1;
    //   audio = context.audioFiles[index];
    //   if (isLoaded) {
    //     status = await playNext(context.playbackObj, audio.uri);
    //   } else {
    //     status = await play(context.playbackObj, audio.uri);
    //   }
    // }

    // context.updateState(context, {
    //   currentAudio: audio,
    //   playbackObj: context.playbackObj,
    //   soundObj: status,
    //   isPlaying: true,
    //   currentAudioIndex: index,
    //   playbackPosition: null,
    //   playbackDuration: null,
    // });
    // storeAudioForNextOpening(audio, index);
  };

  const renderCurrentTime = () => {

    if (!context.soundObj && currentAudio.lastPosition) {
      return convertTime(currentAudio.lastPosition / 1000);
    }
    return convertTime(context.playbackPosition / 1000);
  };

  if (!context.currentAudio) return null;

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/wave.png')} style={{ width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center' }} />
      <View style={styles.audioCountContainer}>
        <Text style={{ color: 'white', bottom: 220, marginLeft: '35%', fontWeight: 'bold', fontSize: 20 }}>Now Playing</Text>
        <View style={{ flexDirection: 'row' }}>
          {context.isPlayListRunning && (
            <>
              <Text style={{ fontWeight: 'bold' }}>From Playlist: </Text>
              <Text>{context.activePlayList.title}</Text>
            </>
          )}
        </View>
        <Text style={styles.audioCount}>{`${context.currentAudioIndex + 1
          } / ${context.totalAudioCount}`}</Text>
      </View>
      <View style={styles.midBannerContainer}>
        {context.isPlaying ? <Image source={require('../../assets/images/playergif.gif')} style={{ width: 300, height: 300 }} /> : <Image source={require('../../assets/images/player-0.png')} style={{ width: 300, height: 300 }} />}
      </View>
      <View style={styles.audioPlayerContainer}>
        <Text numberOfLines={1} style={styles.audioTitle}>
          {context.currentAudio.filename}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ color: "#8400ff", bottom: 70 }} >{convertTime(context.currentAudio.duration)}</Text>
          <Text style={{ color: "#8400ff", bottom: 70 }} >
            {currentPosition ? currentPosition : renderCurrentTime()}
          </Text>
        </View>
        <Slider
          style={[{ bottom: 70 }, { width: width, height: 40, color: '#8400ff', }]}
          minimumValue={0}
          maximumValue={1}
          value={calculateSeebBar()}
          minimumTrackTintColor={"#8400ff"}
          maximumTrackTintColor={"#8400ff"}
          onValueChange={value => {
            setCurrentPosition(
              convertTime(value * context.currentAudio.duration)
            );
          }}
          onSlidingStart={async () => {
            if (!context.isPlaying) return;

            try {
              await pause(context.playbackObj);
            } catch (error) {
              console.log('error inside onSlidingStart callback', error);
            }
          }}
          onSlidingComplete={async value => {
            await moveAudio(context, value);
            setCurrentPosition(0);
          }}
        />
        <View style={styles.audioControllers}>
          <PlayerButton iconType='PREV' onPress={handlePrevious} size={170} style={{ left: 50, color: '#8400ff', }} />
          <PlayerButton
            onPress={handlePlayPause}
            size={160}
            iconType={context.isPlaying ? 'PLAY' : 'PAUSE'}
            style={{
              color: '#8400ff',
            }}
          />
          <PlayerButton iconType='NEXT' onPress={handleNext} size={170} style={{ right: 50, color: '#8400ff', }} />
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  audioControllers: {
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 80,
    paddingBottom: 20,
    paddingTop: 20,
  },
  audioCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  audioCount: {
    textAlign: 'right',
    /* color: color.FONT_LIGHT, */
    color: '#000',
    fontSize: 14,
  },
  midBannerContainer: {
    flex: 1,
    /* justifyContent: 'center', */
    alignItems: 'center',
    position: 'relative',
    bottom: 200
  },
  audioTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: "bold",
    padding: 15,
    bottom: 70
  },
});

export default Player;
