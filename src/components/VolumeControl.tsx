import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  onVolumeChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={volume}
        onValueChange={onVolumeChange}
        minimumTrackTintColor="#8B5CF6"
        maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
        thumbTintColor="#8B5CF6"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 150,
  },
  slider: {
    flex: 1,
    height: 40,
    marginLeft: 8,
  },
  icon: {
    fontSize: 18,
  },
});
