# Crypto Dashboard

A React dashboard for tracking cryptocurrencies, built with Zustand for state management and SWR for data fetching. Features include:

- **Live crypto data** from CoinGecko
- **Search and filter** coins
- **Add/remove favorites** (persisted in Zustand store)
- **Favorites dashboard**
- **Robust Jest test coverage** for all logic and UI

## Features

- View top cryptocurrencies with real-time price and market data
- Search coins by name
- Add coins to your favorites list
- Remove coins from favorites
- Favorites are managed globally using Zustand
- Data is fetched efficiently using SWR
- Fully tested with Jest and React Testing Library

## Tech Stack

- React
- Zustand (state management)
- SWR (data fetching)
- Axios (HTTP requests)
- React Router (navigation)
- Jest & React Testing Library (testing)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the app:**
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

3. **Run tests:**
   ```bash
   npm test
   ```

4. **View coverage report:**
   ```bash
   npm run test -- --coverage
   # Open coverage/lcov-report/index.html in your browser
   ```

## Project Structure

```
src/
  App.js            # Main app component
  AppRouter.js      # Routing setup
  crypto/
    AllCrypto.jsx   # All coins dashboard
    FavCrypto.jsx   # Favorites dashboard
  store/
    favoriteStore.js # Zustand store for favorites
  util/
    CallCrypto.jsx  # SWR/axios data fetching hook
  test/             # All Jest test files
```

## API
- [CoinGecko Markets API](https://www.coingecko.com/en/api/documentation)

## Author
- [deeptechlearner](https://github.com/deeptechlearner)

---

Feel free to fork, contribute, or open issues!

To add new remote

git remote set-url origin https://github.com/deeptechlearner/zustand-useswr.git
PS C:\ReactLearning\CryptoDashboard\crypto-dashboard> git push origin master
Enumerating objects: 44, done.
Counting objects: 100% (44/44), done.
Delta compression using up to 20 threads
Compressing objects: 100% (42/42), done.
Writing objects: 100% (44/44), 182.07 KiB | 5.20 MiB/s, done.
Total 44 (delta 6), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (6/6), done.
To https://github.com/deeptechlearner/zustand-useswr.git
 * [new branch]      master -> master