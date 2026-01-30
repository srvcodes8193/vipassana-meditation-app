import {useState, useCallback, useRef, useEffect} from 'react';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import {CONTROLS_HIDE_DELAY, DEFAULT_PLAYBACK_SPEED} from '../constants/video';

export interface VideoPlayerState {
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackSpeed: number;
  isFullscreen: boolean;
  controlsVisible: boolean;
}

export const useVideoPlayer = () => {
  const playerRef = useRef<YoutubeIframeRef>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [state, setState] = useState<VideoPlayerState>({
    playing: false,
    currentTime: 0,
    duration: 0,
    volume: 100,
    playbackSpeed: DEFAULT_PLAYBACK_SPEED,
    isFullscreen: false,
    controlsVisible: true,
  });

  const updateState = useCallback((updates: Partial<VideoPlayerState>) => {
    setState(prev => ({...prev, ...updates}));
  }, []);

  const togglePlay = useCallback(() => {
    updateState({playing: !state.playing});
  }, [state.playing, updateState]);

  const setPlaying = useCallback(
    (playing: boolean) => {
      updateState({playing});
    },
    [updateState],
  );

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
  }, []);

  const setVolume = useCallback(
    (volume: number) => {
      updateState({volume: Math.max(0, Math.min(100, volume))});
    },
    [updateState],
  );

  const setPlaybackSpeed = useCallback(
    (speed: number) => {
      updateState({playbackSpeed: speed});
    },
    [updateState],
  );

  const toggleFullscreen = useCallback(() => {
    updateState({isFullscreen: !state.isFullscreen});
  }, [state.isFullscreen, updateState]);

  const setFullscreen = useCallback(
    (isFullscreen: boolean) => {
      updateState({isFullscreen});
    },
    [updateState],
  );

  const showControls = useCallback(() => {
    updateState({controlsVisible: true});

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    if (state.playing) {
      controlsTimeoutRef.current = setTimeout(() => {
        updateState({controlsVisible: false});
      }, CONTROLS_HIDE_DELAY);
    }
  }, [state.playing, updateState]);

  const hideControls = useCallback(() => {
    updateState({controlsVisible: false});
  }, [updateState]);

  const onStateChange = useCallback(
    (playerState: string) => {
      if (playerState === 'ended') {
        updateState({playing: false});
      }
    },
    [updateState],
  );

  const onReady = useCallback(async () => {
    const duration = await playerRef.current?.getDuration();
    if (duration) {
      updateState({duration});
    }
  }, [updateState]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (state.playing) {
      interval = setInterval(async () => {
        const currentTime = await playerRef.current?.getCurrentTime();
        if (currentTime !== undefined) {
          updateState({currentTime});
        }
      }, 500);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.playing, updateState]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return {
    playerRef,
    state,
    togglePlay,
    setPlaying,
    seekTo,
    setVolume,
    setPlaybackSpeed,
    toggleFullscreen,
    setFullscreen,
    showControls,
    hideControls,
    onStateChange,
    onReady,
  };
};
