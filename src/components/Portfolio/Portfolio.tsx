import React, { useState, useEffect } from "react";
import s from "./Portfolio.module.scss";

interface Currency {
  name: string;
  symbol: string;
  amount: number;
  priceUsd: string;
  id: string;
}

const Portfolio: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [portfolioValue, setPortfolioValue] = useState(10);
  const [portfolioChange, setPortfolioChange] = useState(20);

  useEffect(() => {
    const storedCurrencies = localStorage.getItem("portfolio");
    if (storedCurrencies) {
      setCurrencies(JSON.parse(storedCurrencies));
      console.log(currencies);
    }
  }, []);

  return (
    <div className={s.portfolio}>
      <p className={s.value}>
        {portfolioValue.toFixed(2)} USD {portfolioChange.toFixed(2)}%{" "}
        {portfolioChange > 0 ? "↑" : "↓"}
      </p>
      <ul className={s.list}>
        {currencies.map((currency) => (
          <li key={currency.name} className={s.item}>
            <span className={s.symbol}>{currency.symbol}</span>{" "}
            {currency.amount} ${currency.priceUsd}
          </li>
        ))}
      </ul>
      <button className={s.button} onClick={() => console.log("click")}>
        Delete
      </button>
    </div>
  );
};

export default Portfolio;
