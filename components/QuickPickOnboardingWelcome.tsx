import { ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useSharedVideo } from '@/lib/VideoContext';

const BRAND_YELLOW = '#F4B000';

export function QuickPickOnboardingWelcome() {
  const router = useRouter();
  const sharedRef = useSharedVideo();
  const localRef = useRef<Video>(null);

  // When this screen mounts, make the shared (already-playing) video fill the screen
  // by syncing position to 0 and ensuring it's playing
  useEffect(() => {
    if (sharedRef.current) {
      sharedRef.current.playAsync().catch(() => null);
    }
  }, [sharedRef]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Full-screen video — uses the already-buffered shared ref if available, else local fallback */}
      <Video
        ref={sharedRef.current ? sharedRef : localRef}
        source={require('@/assets/videos/quickpick-bg.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
        useNativeControls={false}
      />

      {/* Dark overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          <Text style={styles.quick}>Quick</Text>
          <Text style={styles.pick}>Pick</Text>
        </Text>
        <Text style={styles.subtitle}>Find what to watch in seconds.</Text>
      </View>

      <Pressable style={styles.cta} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.ctaText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 120,
    paddingBottom: 48,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.52)',
  },
  content: {
    gap: 12,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  quick: {
    color: BRAND_YELLOW,
  },
  pick: {
    color: '#fff',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
    lineHeight: 24,
  },
  cta: {
    backgroundColor: BRAND_YELLOW,
    borderRadius: 14,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '700',
  },
});
