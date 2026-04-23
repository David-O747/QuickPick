/** TMDb movie genre id → label */
export const TMDB_GENRE_NAMES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-fi',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export function genreLabels(ids: number[] | undefined): string[] {
  if (!ids?.length) return [];
  return ids
    .map((id) => TMDB_GENRE_NAMES[id] ?? null)
    .filter((x): x is string => x != null)
    .slice(0, 4);
}
