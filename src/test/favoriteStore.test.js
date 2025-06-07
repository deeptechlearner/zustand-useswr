import { act } from "react";
import { useFavoriteStore } from "../store/favoriteStore";

describe("useFavoriteStore Zustand store", () => {
  beforeEach(() => {
    // Reset the store state before each test
    useFavoriteStore.setState({ favorites: [] });
  });

  it("should add a coin to favorites", () => {
    act(() => {
      useFavoriteStore.getState().addFavorite({
        id: "bitcoin",
        name: "Bitcoin",
        current_price: 100,
      });
    });
    const favorites = useFavoriteStore.getState().favorites;
    expect(favorites).toHaveLength(1);
    expect(favorites[0].id).toBe("bitcoin");
  });

  it("should not add the same coin twice", () => {
    act(() => {
      useFavoriteStore.getState().addFavorite({
        id: "bitcoin",
        name: "Bitcoin",
        current_price: 100,
      });
      useFavoriteStore.getState().addFavorite({
        id: "bitcoin",
        name: "Bitcoin",
        current_price: 100,
      });
    });
    const favorites = useFavoriteStore.getState().favorites;
    expect(favorites).toHaveLength(1);
  });

  it("should remove a coin from favorites", () => {
    act(() => {
      useFavoriteStore.getState().addFavorite({
        id: "bitcoin",
        name: "Bitcoin",
        current_price: 100,
      });
      useFavoriteStore.getState().removeFavorite("bitcoin");
    });
    const favorites = useFavoriteStore.getState().favorites;
    expect(favorites).toHaveLength(0);
  });
});
