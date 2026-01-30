import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {formatTime} from '../utils/formatTime';

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (value: number) => void;
}

export const SeekBar: React.FC<SeekBarProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(currentTime)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration || 1}
        value={currentTime}
        onSlidingComplete={onSeek}
        minimumTrackTintColor="#8B5CF6"
        maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
        thumbTintColor="#8B5CF6"
      />
      <Text style={styles.time}>{formatTime(duration)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  time: {
    color: '#FFFFFF',
    fontSize: 12,
    fontVariant: ['tabular-nums'],
    minWidth: 40,
    textAlign: 'center',
  },
});
