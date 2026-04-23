import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: '#F4B000',
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <IconSymbol size={22} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ color }) => <IconSymbol size={22} name="magnifyingglass" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#050505',
    borderTopColor: '#141414',
    borderTopWidth: 1,
    height: 64,
    paddingTop: 6,
    paddingBottom: 8,
  },
  tabLabel: {
    fontSize: 11,
  },
});
