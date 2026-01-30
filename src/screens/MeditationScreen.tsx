import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {VideoPlayer} from '../components/VideoPlayer';
import {useVideoPlayer} from '../hooks/useVideoPlayer';
import {VIDEO_CONFIG} from '../constants/video';

export const MeditationScreen: React.FC = () => {
  const {
    playerRef,
    state,
    togglePlay,
    seekTo,
    setVolume,
    setPlaybackSpeed,
    toggleFullscreen,
    setFullscreen,
    showControls,
    onStateChange,
    onReady,
  } = useVideoPlayer();

  useEffect(() => {
    if (state.isFullscreen) {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
    } else {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    }

    return () => {
      Orientation.unlockAllOrientations();
      StatusBar.setHidden(false);
    };
  }, [state.isFullscreen]);

  return (
    <View style={[styles.container, state.isFullscreen && styles.fullscreenMode]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#111827"
        hidden={state.isFullscreen}
      />

      {!state.isFullscreen && (
        <View style={styles.header}>
          <Text style={styles.title}>{VIDEO_CONFIG.title}</Text>
          <Text style={styles.subtitle}>Find peace in the present moment</Text>
        </View>
      )}

      <View style={[styles.playerWrapper, state.isFullscreen && styles.fullscreenPlayer]}>
        <VideoPlayer
          playerRef={playerRef}
          playing={state.playing}
          currentTime={state.currentTime}
          duration={state.duration}
          volume={state.volume}
          playbackSpeed={state.playbackSpeed}
          isFullscreen={state.isFullscreen}
          controlsVisible={state.controlsVisible}
          onStateChange={onStateChange}
          onReady={onReady}
          onPlayPause={togglePlay}
          onSeek={seekTo}
          onVolumeChange={setVolume}
          onSpeedChange={setPlaybackSpeed}
          onFullscreenToggle={toggleFullscreen}
          onShowControls={showControls}
        />
      </View>

      {!state.isFullscreen && (
        <View style={styles.content}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>About Vipassana</Text>
            <Text style={styles.infoText}>
              Vipassana is one of India's most ancient meditation techniques.
              The bell sound helps mark the beginning and end of meditation
              sessions, guiding practitioners into a state of mindfulness and
              awareness.
            </Text>
          </View>

          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>Instructions</Text>
            <Text style={styles.instructionItem}>1. Find a quiet, comfortable place</Text>
            <Text style={styles.instructionItem}>2. Sit with your spine straight</Text>
            <Text style={styles.instructionItem}>3. Close your eyes gently</Text>
            <Text style={styles.instructionItem}>4. Focus on the bell sound</Text>
            <Text style={styles.instructionItem}>5. Let thoughts pass without judgment</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  fullscreenMode: {
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  playerWrapper: {
    alignItems: 'center',
  },
  fullscreenPlayer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  infoCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 22,
  },
  instructions: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  instructionItem: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 28,
  },
});
