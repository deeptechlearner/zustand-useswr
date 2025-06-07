import { render, screen, fireEvent, within } from "@testing-library/react";
import AllCrypto from "../crypto/AllCrypto";
import { useCryptoData } from "../util/CallCrypto";
import { useFavoriteStore } from "../store/favoriteStore";

jest.mock("../util/CallCrypto", () => ({
  useCryptoData: jest.fn(),
}));

jest.mock("../store/favoriteStore");
let mockedAddFavorite;
let mockedRemoveFavorite;

describe("AllCrypto component", () => {
  beforeEach(() => {
    useCryptoData.mockReturnValue({
      cryptoData: [
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
      isLoading: false,
      isError: false,
    });

    mockedAddFavorite = jest.fn();
    mockedRemoveFavorite = jest.fn();

    useFavoriteStore.mockImplementation((selector) =>
      selector({
        favorites: [], // No favorites initially
        addFavorite: mockedAddFavorite,
        removeFavorite: mockedRemoveFavorite,
      })
    );
  });

  it("renders without crashing", () => {
    useCryptoData.mockReturnValue({
      cryptoData: [],
      isLoading: false,
      isError: false,
    });
    render(<AllCrypto />);
    expect(screen.getByText(/All Crypto/i)).toBeInTheDocument();
  });

  it("displays loading state", () => {
    useCryptoData.mockReturnValue({
      cryptoData: [],
      isLoading: true,
      isError: false,
    });
    render(<AllCrypto />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("displays error state", () => {
    useCryptoData.mockReturnValue({
      cryptoData: [],
      isLoading: false,
      isError: true,
    });
    render(<AllCrypto />);
    expect(screen.getByText(/Error loading data./i)).toBeInTheDocument();
  });

  it("filter data based on search ", () => {
    useCryptoData.mockReturnValue({
      cryptoData: [
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
        {
          id: "binancecoin",
          name: "BNB",
          current_price: 644.78,
          market_cap_rank: 5,
          market_cap_change_24h: -710580465.3796234,
        },
      ],
      isLoading: false,
      isError: false,
    });
    render(<AllCrypto />);
    fireEvent.change(screen.getByPlaceholderText("Search coins..."), {
      target: { value: "b" },
    });
    expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
    expect(screen.getByText(/BNB/i)).toBeInTheDocument();
  });

  it("filter addFavorite ", () => {
    useCryptoData.mockReturnValue({
      cryptoData: [
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
        {
          id: "binancecoin",
          name: "BNB",
          current_price: 644.78,
          market_cap_rank: 5,
          market_cap_change_24h: -710580465.3796234,
        },
      ],
      isLoading: false,
      isError: false,
    });
    render(<AllCrypto />);
    const btcRow = screen.getByText("Bitcoin").closest("tr");
    // Find the button within that row
    const addButton = within(btcRow).getByRole("button", {
      name: /add to favorite/i,
    });
    fireEvent.click(addButton);
    expect(mockedAddFavorite).toHaveBeenCalledWith({
      id: "bitcoin",
      name: "Bitcoin",
      current_price: 104548,
      market_cap_rank: 1,
      market_cap_change_24h: 35666976068,
    });
  });

  it("remove Favorite ", () => {
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
        ],
        addFavorite: mockedAddFavorite,
        removeFavorite: mockedRemoveFavorite,
      })
    );

    useCryptoData.mockReturnValue({
      cryptoData: [
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
        {
          id: "binancecoin",
          name: "BNB",
          current_price: 644.78,
          market_cap_rank: 5,
          market_cap_change_24h: -710580465.3796234,
        },
      ],
      isLoading: false,
      isError: false,
    });
    render(<AllCrypto />);

    const rows = screen.getAllByRole("row");
    const remBtnRow = rows.find((row) => within(row).queryByText("Bitcoin"));
    const removeButton = within(remBtnRow).getByRole("button", {
      name: /Remove from Favorite/i,
    });
    fireEvent.click(removeButton);
    expect(mockedRemoveFavorite).toHaveBeenCalledWith("bitcoin");
  });
});
