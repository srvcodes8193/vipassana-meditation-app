import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface PlayPauseButtonProps {
  playing: boolean;
  onPress: () => void;
}

export const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  playing,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>{playing ? '⏸' : '▶'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    color: '#FFFFFF',
  },
});
