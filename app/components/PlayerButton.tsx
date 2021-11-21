import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../misc/color';

const PlayerButton = props => {
  const { iconType, size = 80, iconColor = color.FONT, onPress } = props;
  const getIconName = type => {
    switch (type) {
      case 'PLAY':
        return 'pause-circle';
      case 'PAUSE':
        return 'play-circle';
      case 'NEXT':
        return 'menu-right';
      case 'PREV':
        return 'menu-left';
    }
  };
  return (
    <MaterialCommunityIcons
      {...props}
      onPress={onPress}
      name={getIconName(iconType)}
      size={size}
      color={iconColor}
    />
  );
};

export default PlayerButton;
