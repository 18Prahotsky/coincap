import React, { useState, useEffect, useMemo } from "react";
import s from "./Portfolio.module.scss";
import Currency from "./Currency/Currency";
import { LocalStorageCoin, CoinTotal, Coin } from "../../types/coin.type";

const Portfolio: React.FC = () => {
  const [coins, setCoins] = useState<LocalStorageCoin[]>([]);
  const [portfolioTotal, setPortfolioTotal] = useState(0);

  const [groupedCoins, setGroupedCoins] = useState<CoinTotal[]>([]);
  const [apiPortfolioTotal, setApiPortfolioTotal] = useState(0);

  const calculatePortfolioTotal = (coins: LocalStorageCoin[]) => {
    const totalValue = coins.reduce((sum, currency) => {
      return sum + currency.amount * Number(currency.priceUsd);
    }, 0);
    return totalValue;
  };

  useEffect(() => {
    getStorageCoins();
  }, []);

  const getStorageCoins = () => {
    const storedCurrencies = localStorage.getItem("portfolio");
    if (storedCurrencies) {
      setCoins(JSON.parse(storedCurrencies));
    }
  };

  useEffect(() => {
    const portfolioTotal = calculatePortfolioTotal(coins);
    setPortfolioTotal(portfolioTotal);
    const groupedCouns = groupCoinsById(coins);
    setGroupedCoins(groupedCouns);
  }, [coins]);

  const groupCoinsById = (coins: LocalStorageCoin[]): CoinTotal[] => {
    const result: CoinTotal[] = [];

    coins.forEach((coin: LocalStorageCoin) => {
      const coinResult = result.find((coinResult) => coinResult.id === coin.id);

      if (coinResult) {
        coinResult.amount += coin.amount;
        coinResult.totalPriceUsd += coin.amount * Number(coin.priceUsd);
      } else {
        result.push({
          ...coin,
          totalPriceUsd: coin.amount * Number(coin.priceUsd),
        });
      }
    });
    return result;
  };

  const getApiCoins = async (portfolio: CoinTotal[]) => {
    const coinIds = portfolio.map((coin) => {
      return coin.id;
    });

    const response = await fetch(
      `https://api.coincap.io/v2/assets/?ids=${coinIds.join(",")}`
    );
    const data = await response.json();

    return data;
  };

  const calculateApiPortfolioTotal = (coins: CoinTotal[], apiCoins: Coin[]) => {
    return apiCoins.reduce((sum, apiCoin) => {
      const coin = coins.find((coin) => {
        return coin.id === apiCoin.id;
      }) as CoinTotal;

      return sum + coin.amount * Number(apiCoin.priceUsd);
    }, 0);
  };

  useEffect(() => {
    const getApiTotal = async () => {
      if (groupedCoins?.length) {
        const apiCoins = await getApiCoins(groupedCoins);

        const apiPortfolioTotal = calculateApiPortfolioTotal(
          groupedCoins,
          apiCoins.data
        );
        setApiPortfolioTotal(apiPortfolioTotal);
      }
    };
    getApiTotal();
  }, [groupedCoins]);

  const portfolioChange = useMemo(() => {
    if (!portfolioTotal || !apiPortfolioTotal) return 0;
    return 100 - (portfolioTotal / apiPortfolioTotal) * 100;
  }, [portfolioTotal, apiPortfolioTotal]);

  const onDelete = (priceUsd: string) => {
    onDeleteCoin(priceUsd);
  };

  const onDeleteCoin = (priceUsd: string) => {
    const localPortfolio = localStorage.getItem("portfolio");

    if (localPortfolio) {
      const parsedPortfolio = JSON.parse(localPortfolio);
      const newPortfolio = parsedPortfolio.filter(
        (coin: LocalStorageCoin) => coin.priceUsd !== priceUsd
      );

      localStorage.setItem("portfolio", JSON.stringify(newPortfolio));
      setCoins(newPortfolio);
    }
  };

  const valueClass = portfolioChange > 0 ? "positive" : "negative";

  return (
    <div className={s.portfolio}>
      <div className={s.value}>
        SUM {portfolioTotal.toFixed(2)} USD
        <p className={`${s.value} ${s[valueClass]}`}>
          {portfolioChange.toFixed(5)}% {portfolioChange > 0 ? "↑" : "↓"}
        </p>
      </div>
      <table className={s.list}>
        <tbody>
          {coins.map((currency, index) => (
            <Currency
              key={currency.id + index}
              currency={currency}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
