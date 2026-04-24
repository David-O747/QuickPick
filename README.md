<img width="1284" height="2778" alt="IMG_3935 5" src="https://github.com/user-attachments/assets/08cdf3f5-7414-41b6-8985-36c5a08c98ac" />
<img width="1284" height="2778" alt="IMG_3937 3" src="https://github.com/user-attachments/assets/a0022c57-9a52-409a-87a8-166e2a030a12" />
<img width="1284" height="2778" alt="IMG_3938 2" src="https://github.com/user-attachments/assets/d466a3fa-458f-4391-aa2c-f707d969d2e2" />



QuickPick is a mobile movie discovery app built with Expo and React Native.  
It shows a swipe-style feed of movies from TMDB, with quick details and watchlist save toggles.

## Features

- Full-screen movie discovery feed
- TMDB-powered popular + discover results
- Genre tags, ratings, and overview preview
- Simple in-app watchlist toggle
- Onboarding-first app flow

## Tech Stack

- Expo + React Native
- Expo Router
- FlashList
- TMDB API

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

3. Start the app:

```bash
npm run start
```

4. Open on your device/simulator:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR with Expo Go

## Scripts

- `npm run start` - Start Expo dev server
- `npm run ios` - Start for iOS
- `npm run android` - Start for Android
- `npm run web` - Start for web
- `npm run lint` - Run lint checks

## Notes

- Keep your TMDB API key private.
- `.env` is ignored by git and should not be committed.
