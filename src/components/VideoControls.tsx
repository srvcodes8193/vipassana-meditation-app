import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native';
import {PlayPauseButton} from './PlayPauseButton';
import {SeekBar} from './SeekBar';
import {VolumeControl} from './VolumeControl';
import {PlaybackSpeed} from './PlaybackSpeed';
import {FullscreenButton} from './FullscreenButton';

interface VideoControlsProps {
  visible: boolean;
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackSpeed: number;
  isFullscreen: boolean;
  onPlayPause: () => void;
  onSeek: (value: number) => void;
  onVolumeChange: (value: number) => void;
  onSpeedChange: (speed: number) => void;
  onFullscreenToggle: () => void;
  onTap: () => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  visible,
  playing,
  currentTime,
  duration,
  volume,
  playbackSpeed,
  isFullscreen,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onSpeedChange,
  onFullscreenToggle,
  onTap,
}) => {
  if (!visible) {
    return (
      <TouchableWithoutFeedback onPress={onTap}>
        <View style={styles.hiddenOverlay} />
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onTap}>
      <View style={styles.overlay}>
        <View style={styles.topControls}>
          <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
          <View style={styles.topRight}>
            <PlaybackSpeed speed={playbackSpeed} onSpeedChange={onSpeedChange} />
          </View>
        </View>

        <View style={styles.centerControls}>
          <PlayPauseButton playing={playing} onPress={onPlayPause} />
        </View>

        <View style={styles.bottomControls}>
          <SeekBar
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
          />
          <View style={styles.bottomRight}>
            <FullscreenButton
              isFullscreen={isFullscreen}
              onPress={onFullscreenToggle}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
  },
  hiddenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerControls: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomControls: {
    paddingBottom: 16,
  },
  bottomRight: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
