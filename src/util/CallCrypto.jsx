import axios from 'axios';
import useSWR from 'swr';

export const fetcher = url => axios.get(url).then(res => res.data);

export const useCryptoData = () => {
  const { data, error, isLoading } = useSWR(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
    fetcher
  );

  return {
    cryptoData: data
      ? data.map(coin => ({
          id: coin.id, // include id for favorite management
          name: coin.name,
          current_price: coin.current_price,
          market_cap_rank: coin.market_cap_rank,
          market_cap_change_24h: coin.market_cap_change_24h
        }))
      : [],
    isLoading,
    isError: error
  };
};


