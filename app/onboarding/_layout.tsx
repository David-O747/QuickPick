import { ResizeMode, Video } from 'expo-av';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { VideoProvider, useSharedVideo } from '@/lib/VideoContext';

// Mounts the video hidden so it's buffered & playing before welcome screen appears
function PreloadedVideo() {
  const videoRef = useSharedVideo();
  return (
    <Video
      ref={videoRef}
      source={require('@/assets/videos/quickpick-bg.mp4')}
      style={styles.hidden}
      resizeMode={ResizeMode.COVER}
      shouldPlay
      isLooping
      isMuted
      useNativeControls={false}
    />
  );
}

export default function OnboardingLayout() {
  return (
    <VideoProvider>
      <View style={styles.root}>
        <PreloadedVideo />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </View>
    </VideoProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  // Off-screen but still mounted and playing
  hidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
