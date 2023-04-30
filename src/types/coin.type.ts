export interface Coin {
  id: string;
  rank: string;
  symbol: string;
  priceUsd: string;
  name: string;
  vwap24Hr: string;
  changePercent24Hr: string;
}

export interface LocalStorageCoin {
  id: string;
  amount: number;
  symbol: string;
  priceUsd: string;
  name: string;
}
