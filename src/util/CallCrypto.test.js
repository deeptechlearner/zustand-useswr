import { renderHook } from "@testing-library/react";
import { useCryptoData, fetcher } from "./CallCrypto";
import useSWR from "swr";
import axios from "axios";

jest.mock("swr");
jest.mock("axios");

describe("useCryptoData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns loading state", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useCryptoData());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.cryptoData).toEqual([]);
    expect(result.current.isError).toBeUndefined();
  });

  it("returns error state", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("Failed to fetch"),
      isLoading: false,
    });

    const { result } = renderHook(() => useCryptoData());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.cryptoData).toEqual([]);
    expect(result.current.isError).toBeInstanceOf(Error);
  });

  it("returns crypto data when loaded", () => {
    const mockData = [
      {
        id: "bitcoin",
        name: "Bitcoin",
        current_price: 100,
        market_cap_rank: 1,
        market_cap_change_24h: 123,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        current_price: 200,
        market_cap_rank: 2,
        market_cap_change_24h: 456,
      },
    ];

    useSWR.mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useCryptoData());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBeUndefined();
    expect(result.current.cryptoData).toEqual([
      {
        id: "bitcoin",
        name: "Bitcoin",
        current_price: 100,
        market_cap_rank: 1,
        market_cap_change_24h: 123,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        current_price: 200,
        market_cap_rank: 2,
        market_cap_change_24h: 456,
      },
    ]);
  });

  it("returns empty array if data is empty", () => {
    useSWR.mockReturnValue({
      data: [],
      error: undefined,
      isLoading: false,
    });
    const { result } = renderHook(() => useCryptoData());
    expect(result.current.cryptoData).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBeUndefined();
  });

  it("returns empty array if data is undefined", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });
    const { result } = renderHook(() => useCryptoData());
    expect(result.current.cryptoData).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBeUndefined();
  });
});

describe("fetcher function", () => {
  it("calls axios.get and returns data", async () => {
    const mockData = { foo: "bar" };
    axios.get.mockResolvedValueOnce({ data: mockData });
    const result = await fetcher("http://test-url");
    expect(axios.get).toHaveBeenCalledWith("http://test-url");
    expect(result).toEqual(mockData);
  });
});
