import React, { useEffect, useRef } from 'react';
import { Animated, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

const BLUE_A = '#F4B000';

function FilmPickIcon() {
  return (
    <View style={styles.iconOuter}>
      <Image
        source={require('@/assets/images/video-camera.png')}
        style={styles.iconImage}
        resizeMode="contain"
      />
    </View>
  );
}

export function QuickPickOnboardingIntro() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({ BebasNeue_400Regular });
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const slam = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1.2,
          friction: 4,
          tension: 130,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 90,
        useNativeDriver: true,
      }),
      Animated.delay(450),
    ]);

    slam.start(() => {
      router.replace('/onboarding/welcome');
    });

    return () => slam.stop();
  }, [opacity, scale, router]);

  if (!fontsLoaded) return <View style={styles.screen} />;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Animated.View
        style={[
          styles.brandBlock,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <View style={styles.iconSlot}>
          <FilmPickIcon />
        </View>
        <View style={styles.logoRow}>
          <Text style={styles.logoQuickFirst}>Q</Text>
          <Text style={styles.logoQuickRest}>uick</Text>
          <Text style={styles.logoPickFirst}>P</Text>
          <Text style={styles.logoPickRest}>ick</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  brandBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconSlot: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOuter: {
    width: 96,
    height: 84,
    borderRadius: 18,
    backgroundColor: BLUE_A,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconImage: {
    width: '62%',
    height: '62%',
    alignSelf: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoQuickFirst: {
    fontFamily: 'BebasNeue_400Regular',
    fontSize: 58,
    color: BLUE_A,
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(244, 176, 0, 0.75)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 22,
      },
      default: {},
    }),
    transform: [{ scaleX: 1.06 }],
  },
  logoQuickRest: {
    fontFamily: 'BebasNeue_400Regular',
    fontSize: 58,
    color: BLUE_A,
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(244, 176, 0, 0.75)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 22,
      },
      default: {},
    }),
    transform: [{ scaleX: 1.06 }],
  },
  logoPickFirst: {
    fontFamily: 'BebasNeue_400Regular',
    fontSize: 58,
    color: '#FFFFFF',
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(0,0,0,0.45)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
      },
      default: {},
    }),
    transform: [{ scaleX: 1.08 }],
  },
  logoPickRest: {
    fontFamily: 'BebasNeue_400Regular',
    fontSize: 58,
    color: '#FFFFFF',
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(0,0,0,0.45)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
      },
      default: {},
    }),
    transform: [{ scaleX: 1.08 }],
  },
});
