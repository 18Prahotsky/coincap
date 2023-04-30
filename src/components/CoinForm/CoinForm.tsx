import React, { useState } from "react";
import { Coin } from "../../types/coin.type";
import s from "./CoinForm.module.scss";

type Props = {
  coin: Coin;
  onAddCoin: (
    id: string,
    name: string,
    symbol: string,
    priceUsd: string,
    amount: number
  ) => void;
};

const CoinForm: React.FC<Props> = ({ coin, onAddCoin }) => {
  const [amount, setAmount] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof amount === "number" && amount > 0) {
      onAddCoin(coin.id, coin.name, coin.symbol, coin.priceUsd, amount);
      setAmount("");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.input}
        type="number"
        id={coin.id}
        name={coin.name}
        step="0.0001"
        min="0"
        value={amount}
        onChange={handleAmountChange}
      />
      <button className={s.button} type="submit">
        Add to portfolio
      </button>
    </form>
  );
};

export default CoinForm;
