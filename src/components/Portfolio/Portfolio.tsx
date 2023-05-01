import React, { useState, useEffect } from "react";
import s from "./Portfolio.module.scss";
import Currency from "./Currency/Currency";
import { LocalStorageCoin, Totals } from "../../types/coin.type";
import axiosInstance from "../../httpClient";

const Portfolio: React.FC = () => {
  const [currencies, setCurrencies] = useState<LocalStorageCoin[]>([]);
  const [currenciesAfterDelete, setCurrenciesAfterDelete] = useState<
    LocalStorageCoin[]
  >([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [currencyLocalStorage, setCurrencyLocalStorage] = useState<Totals[]>(
    []
  );
  const [apiPortfolioValue, setApiPortfolioValue] = useState(0);
  const [portfolioChange, setPortfolioChange] = useState(0);

  const calculatePortfolioValue = (currencies: LocalStorageCoin[]) => {
    const totalValue = currencies.reduce((sum, currency) => {
      return sum + currency.amount * Number(currency.priceUsd);
    }, 0);
    return totalValue;
  };

  useEffect(() => {
    const storedCurrencies = localStorage.getItem("portfolio");
    if (storedCurrencies) {
      setCurrencies(JSON.parse(storedCurrencies));
    }
  }, [currenciesAfterDelete]);

  useEffect(() => {
    const portfolioValue = calculatePortfolioValue(currencies);
    setPortfolioValue(portfolioValue);
    const totalsLocalStorage = calculateCurrencyTotalsLocalStorage(currencies);
    setCurrencyLocalStorage(totalsLocalStorage);
  }, [currencies]);

  useEffect(() => {
    getApiPortfolioValue(currencyLocalStorage);
    console.log(currencyLocalStorage);
  }, [currencyLocalStorage]);

  const calculateCurrencyTotalsLocalStorage = (
    currencies: LocalStorageCoin[]
  ) => {
    const totals: Totals[] = [];

    currencies.forEach((item: LocalStorageCoin) => {
      const existingAssetSummary = totals.find(
        (summary) => summary.id === item.id
      );

      if (existingAssetSummary) {
        existingAssetSummary.amount += item.amount;
        existingAssetSummary.totalPriceUsd +=
          item.amount * Number(item.priceUsd);
      } else {
        totals.push({
          id: item.id,
          amount: item.amount,
          symbol: item.symbol,
          priceUsd: item.priceUsd,
          name: item.name,
          totalPriceUsd: item.amount * Number(item.priceUsd),
        });
      }
    });
    return totals;
  };

  async function getApiPortfolioValue(portfolio: Totals[]) {
    const result = [];

    for (const coin of portfolio) {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${coin.id}`
      );
      const data = await response.json();
      const priceUsd = data.data.priceUsd;
      const totalPriceUsd = priceUsd * coin.amount;

      result.push({ id: coin.id, amount: coin.amount, totalPriceUsd });
    }
    const value = result.reduce((sum, currency) => {
      return sum + Number(currency.totalPriceUsd);
    }, 0);
    setApiPortfolioValue(value);
  }
  useEffect(() => {
    const getPortfolioChange = () => {
      const result = (portfolioValue - apiPortfolioValue) / portfolioValue;
      setPortfolioChange(result);
    };
    getPortfolioChange();
  }, [portfolioValue, apiPortfolioValue]);

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
      setCurrenciesAfterDelete(newPortfolio);
    }
  };

  const valueClass = portfolioChange > 0 ? "positive" : "negative";

  return (
    <div className={s.portfolio}>
      <p className={s.value}>
        SUM {portfolioValue.toFixed(2)} USD
        <p className={`${s.value} ${s[valueClass]}`}>
          {portfolioChange.toFixed(5)}% {portfolioChange > 0 ? "↑" : "↓"}
        </p>
      </p>

      <ul className={s.list}>
        {currencies.map((currency, index) => (
          <Currency currency={currency} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
