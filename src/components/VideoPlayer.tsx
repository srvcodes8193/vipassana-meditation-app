import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import {VideoControls} from './VideoControls';
import {VIDEO_CONFIG} from '../constants/video';

interface VideoPlayerProps {
  playerRef: React.RefObject<YoutubeIframeRef | null>;
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackSpeed: number;
  isFullscreen: boolean;
  controlsVisible: boolean;
  onStateChange: (state: string) => void;
  onReady: () => void;
  onPlayPause: () => void;
  onSeek: (value: number) => void;
  onVolumeChange: (value: number) => void;
  onSpeedChange: (speed: number) => void;
  onFullscreenToggle: () => void;
  onShowControls: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  playerRef,
  playing,
  currentTime,
  duration,
  volume,
  playbackSpeed,
  isFullscreen,
  controlsVisible,
  onStateChange,
  onReady,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onSpeedChange,
  onFullscreenToggle,
  onShowControls,
}) => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const playerWidth = isFullscreen ? screenHeight : screenWidth;
  const playerHeight = isFullscreen ? screenWidth : (screenWidth * 9) / 16;

  return (
    <View
      style={[
        styles.container,
        isFullscreen && styles.fullscreenContainer,
        {width: playerWidth, height: playerHeight},
      ]}>
      <YoutubePlayer
        ref={playerRef}
        height={playerHeight}
        width={playerWidth}
        play={playing}
        videoId={VIDEO_CONFIG.videoId}
        volume={volume}
        playbackRate={playbackSpeed}
        onChangeState={onStateChange}
        onReady={onReady}
        webViewProps={{
          androidLayerType: 'hardware',
        }}
      />
      <VideoControls
        visible={controlsVisible}
        playing={playing}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        playbackSpeed={playbackSpeed}
        isFullscreen={isFullscreen}
        onPlayPause={onPlayPause}
        onSeek={onSeek}
        onVolumeChange={onVolumeChange}
        onSpeedChange={onSpeedChange}
        onFullscreenToggle={onFullscreenToggle}
        onTap={onShowControls}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    position: 'relative',
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
  },
});
