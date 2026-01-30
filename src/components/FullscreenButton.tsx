import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onPress: () => void;
}

export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  isFullscreen,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>{isFullscreen ? '⤓' : '⤢'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  icon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
