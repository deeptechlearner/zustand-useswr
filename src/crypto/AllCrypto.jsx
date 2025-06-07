import { useCryptoData } from "../util/CallCrypto";
import { useFavoriteStore }  from "../store/favoriteStore";
import { useState } from "react";

const AllCrypto = () => {
  const { cryptoData, isLoading, isError } = useCryptoData();
  const favorites = useFavoriteStore((state) => state.favorites);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
  const [search, setSearch] = useState("");

  const filteredData = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">All Crypto</h1>
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">All Crypto</h1>
        <p className="text-lg text-red-500">Error loading data.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">All Crypto</h1>
      <input
        type="text"
        placeholder="Search coins..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-2 py-1 border rounded"
      />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Current Price</th>
            <th className="px-4 py-2 border">Market Cap Rank</th>
            <th className="px-4 py-2 border">Market Cap Change 24h</th>
            <th className="px-4 py-2 border">Favorite</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((coin, idx) => {
            const isFavorite =
              Array.isArray(favorites) && favorites.length > 0
                ? favorites.some((fav) => fav.id === coin.id)
                : false;
            return (
              <tr key={coin.id}>
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{coin.name}</td>
                <td className="px-4 py-2 border">${coin.current_price}</td>
                <td className="px-4 py-2 border">{coin.market_cap_rank}</td>
                <td className="px-4 py-2 border">
                  {coin.market_cap_change_24h}
                </td>
                <td className="px-4 py-2 border">
                  {isFavorite ? (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => removeFavorite(coin.id)}
                    >
                      Remove from Favorite
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => addFavorite(coin)}
                    >
                      Add to Favorite
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllCrypto;
