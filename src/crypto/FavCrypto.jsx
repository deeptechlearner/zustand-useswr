import React from 'react';
import {useFavoriteStore} from '../store/favoriteStore';

export const FavCrypto = () => {
  const favorites = useFavoriteStore(state => state.favorites);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Fav Crypto</h1>
      {favorites.length === 0 ? (
        <p className="text-lg">No favorite coins added.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Current Price</th>
              <th className="px-4 py-2 border">Market Cap Rank</th>
              <th className="px-4 py-2 border">Market Cap Change 24h</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((coin, idx) => (
              <tr key={coin.id}>
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{coin.name}</td>
                <td className="px-4 py-2 border">${coin.current_price}</td>
                <td className="px-4 py-2 border">{coin.market_cap_rank}</td>
                <td className="px-4 py-2 border">{coin.market_cap_change_24h}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
