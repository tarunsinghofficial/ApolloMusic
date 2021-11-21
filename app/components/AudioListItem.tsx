import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color';


const getThumbnailText = filename => filename[0];

const convertTime = minutes => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split('.')[0];
    const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
};

const renderPlayPauseIcon = isPlaying => {
  if (isPlaying)
    return (
      <Entypo name='controller-paus' size={24} color={color.ACTIVE_FONT} />
    );
  return <Entypo name='controller-play' size={24} color={color.ACTIVE_FONT} />;
};

const AudioListItem = ({
  title,
  duration,
  onOptionPress,
  onAudioPress,
  isPlaying,
  activeListItem,
}) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onAudioPress}>
          <View style={styles.leftContainer}>
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <Text style={styles.timeText}>{convertTime(duration)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.rightContainer}>
          <View
            style={[
              styles.thumbnail,
              {
                backgroundColor: activeListItem
                  ? color.ACTIVE_BG
                  : color.FONT_LIGHT,
              },
            ]}
          >
            <Text style={styles.thumbnailText}>
              {activeListItem
                ? renderPlayPauseIcon(isPlaying)
                : getThumbnailText(title)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />

    </>
  );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BC8CF2",
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 25,
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    alignSelf: "center",
    borderRadius: 36,
    width: 43,
    height: 43,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.FONT,
    alignSelf: "center",
    justifyContent: "center",
    top: 7

  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    width: width - 80,
    backgroundColor: '#8400ff',
    opacity: 0.3,
    height: 0.5,
    alignSelf: 'center',
    marginTop: 20,
  },
  timeText: {
    fontSize: 14,
    color: color.FONT_LIGHT,
  },
});

export default AudioListItem;
