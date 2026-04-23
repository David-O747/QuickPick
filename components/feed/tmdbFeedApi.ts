const API = 'https://api.themoviedb.org/3';

export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
};

function getApiKey() {
  const key = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  if (!key) throw new Error('Missing EXPO_PUBLIC_TMDB_API_KEY');
  return key;
}

async function tmdbGet(path: string, params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  query.set('api_key', getApiKey());
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) query.set(k, String(v));
  });

  const res = await fetch(`${API}${path}?${query.toString()}`);
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);
  return res.json();
}

export async function fetchDiscover(page = 1) {
  const json = await tmdbGet('/discover/movie', {
    page,
    sort_by: 'popularity.desc',
    include_adult: 'false',
    'vote_average.gte': 6,
  });
  return (json.results ?? []) as TmdbMovie[];
}

export async function fetchPopular() {
  const json = await tmdbGet('/movie/popular', { page: 1 });
  return (json.results ?? []) as TmdbMovie[];
}

export function dedupeMovies(items: TmdbMovie[]) {
  const seen = new Set<number>();
  return items.filter((m) => {
    if (seen.has(m.id)) return false;
    seen.add(m.id);
    return true;
  });
}
