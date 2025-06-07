import { create } from "zustand";

export const useFavoriteStore = create((set) => ({
  favorites: [],
  addFavorite: (coin) =>
    set((state) => {
      if (state.favorites.some((fav) => fav.id === coin.id)) {
        return state; // Coin already exists, do nothing
      }
      return { favorites: [...state.favorites, coin] };
    }),

  removeFavorite: (coinId) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== coinId),
    })),
}));
