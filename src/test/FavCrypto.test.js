import { render, screen } from "@testing-library/react";
import { FavCrypto } from "../crypto/FavCrypto";
import { useFavoriteStore } from "../store/favoriteStore";

jest.mock("../store/favoriteStore");

let mockedAddFavorite;
let mockedRemoveFavorite;

describe("FavCrypto component", () => {
  it("Favorites table renders correctly", () => {
    mockedAddFavorite = jest.fn();
    mockedRemoveFavorite = jest.fn();

    useFavoriteStore.mockImplementation((selector) =>
      selector({
        favorites: [
          {
            id: "bitcoin",
            name: "Bitcoin",
            current_price: 104548,
            market_cap_rank: 1,
            market_cap_change_24h: 35666976068,
          },
          {
            id: "ethereum",
            name: "Ethereum",
            current_price: 2497.58,
            market_cap_rank: 2,
            market_cap_change_24h: -8892841834.978882,
          },
        ],
        addFavorite: mockedAddFavorite,
        removeFavorite: mockedRemoveFavorite,
      })
    );

    render(<FavCrypto />);
    expect(screen.getByText(/Fav Crypto/i)).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  it("Favorites when no favourites are present", () => {
    mockedAddFavorite = jest.fn();
    mockedRemoveFavorite = jest.fn();

    useFavoriteStore.mockImplementation((selector) =>
      selector({
        favorites: [],
        addFavorite: mockedAddFavorite,
        removeFavorite: mockedRemoveFavorite,
      })
    );

    render(<FavCrypto />);
    expect(screen.getByText(/Fav Crypto/i)).toBeInTheDocument();
    expect(screen.getByText("No favorite coins added.")).toBeInTheDocument();
  });
});
