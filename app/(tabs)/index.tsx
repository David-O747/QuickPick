import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { genreLabels } from '@/components/feed/genreLabels';
import { dedupeMovies, fetchDiscover, fetchPopular, type TmdbMovie } from '@/components/feed/tmdbFeedApi';

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Remove legacy Identity Blade data so app no longer gets stuck on that flow.
    void AsyncStorage.multiRemove([
      'identity_blade_data',
      'identity_blade_history',
      'identity_history',
      'identity_profile',
      'identity_progress',
    ]);
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const [discover, popular] = await Promise.all([fetchDiscover(1), fetchPopular()]);
        if (!alive) return;
        setMovies(dedupeMovies([...discover, ...popular]));
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Failed to load movies');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const loadMore = async () => {
    const next = page + 1;
    setPage(next);
    const more = await fetchDiscover(next);
    setMovies((prev) => dedupeMovies([...prev, ...more]));
  };

  const empty = useMemo(
    () => (
      <View style={[styles.loading, { height }]}>
        {loading ? (
          <Text style={styles.loadingText}>Loading QuickPick...</Text>
        ) : error ? (
          <>
            <Text style={styles.loadingText}>{'⚠️ ' + error}</Text>
            <Text style={[styles.loadingText, { fontSize: 13, marginTop: 8, opacity: 0.6 }]}>
              Check your TMDB API key in .env
            </Text>
          </>
        ) : (
          <Text style={styles.loadingText}>No movies right now</Text>
        )}
      </View>
    ),
    [height, loading, error]
  );

  return (
    <View style={styles.root}>
      <FlashList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        pagingEnabled
        snapToInterval={height}
        decelerationRate="fast"
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          void loadMore();
        }}
        ListEmptyComponent={empty}
        renderItem={({ item }) => {
          const backdrop = item.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
            : item.poster_path
              ? `https://image.tmdb.org/t/p/w780${item.poster_path}`
              : undefined;

          return (
            <View style={[styles.card, { height }]}>
              {backdrop ? (
                <Image source={{ uri: backdrop }} style={styles.backdrop} contentFit="cover" />
              ) : (
                <View style={styles.backdropFallback} />
              )}
              <View style={styles.overlay} />
              <View style={styles.topBar}>
                <Text style={styles.brand}>QuickPick</Text>
              </View>
              <View style={styles.bottom}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreRow}>
                  {genreLabels(item.genre_ids).map((g) => (
                    <View key={g} style={styles.pill}>
                      <Text style={styles.pillText}>{g}</Text>
                    </View>
                  ))}
                </ScrollView>
                <Text style={styles.meta}>⭐ {item.vote_average?.toFixed(1) ?? '—'}</Text>
                <Text style={styles.overview} numberOfLines={3}>
                  {item.overview || 'No overview available.'}
                </Text>
                <Pressable
                  style={styles.saveBtn}
                  onPress={() => {
                    setWatchlist((prev) => {
                      const next = new Set(prev);
                      if (next.has(item.id)) next.delete(item.id);
                      else next.add(item.id);
                      return next;
                    });
                  }}
                >
                  <Text style={styles.saveBtnText}>
                    {watchlist.has(item.id) ? 'Saved' : 'Save to Watchlist'}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
  card: { width: '100%', backgroundColor: '#000' },
  backdrop: { ...StyleSheet.absoluteFillObject },
  backdropFallback: { ...StyleSheet.absoluteFillObject, backgroundColor: '#141414' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  topBar: { position: 'absolute', top: 60, left: 16, right: 16 },
  brand: { color: '#fff', fontSize: 24, fontWeight: '700' },
  bottom: { position: 'absolute', left: 16, right: 16, bottom: 70 },
  title: { color: '#fff', fontSize: 34, fontWeight: '800' },
  genreRow: { maxHeight: 32, marginTop: 8 },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  pillText: { color: '#fff', fontSize: 12 },
  meta: { color: '#F4B000', marginTop: 10, fontSize: 14, fontWeight: '600' },
  overview: { color: 'rgba(255,255,255,0.9)', marginTop: 8, lineHeight: 20 },
  saveBtn: {
    marginTop: 14,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F4B000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
  },
  saveBtnText: { color: '#000', fontWeight: '700' },
});
