import { Video } from 'expo-av';
import React, { createContext, useContext, useRef } from 'react';

const VideoContext = createContext<React.RefObject<Video | null> | null>(null);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<Video>(null);
  return <VideoContext.Provider value={videoRef}>{children}</VideoContext.Provider>;
}

export function useSharedVideo() {
  const ctx = useContext(VideoContext);
  if (!ctx) throw new Error('useSharedVideo must be used inside VideoProvider');
  return ctx;
}
