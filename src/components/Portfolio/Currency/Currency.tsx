import React from "react";
import s from "./Currency.module.scss";
import { LocalStorageCoin } from "../../../types/coin.type";

interface CurrencyProps {
  currency: LocalStorageCoin;
  onDelete: (id: string) => void;
}

const Currency = ({ currency, onDelete }: CurrencyProps) => {
  const handleDelete = () => {
    onDelete(currency.priceUsd);
  };

  const totalCost = (Number(currency.priceUsd) * currency.amount).toFixed(2);

  return (
    <tr className={s.row}>
      <td className={s.name}>{currency.name}</td>
      <td>{currency.symbol}</td>
      <td>{currency.amount.toFixed(4)}</td>
      <td className={s.price}>{`$${Number(currency.priceUsd).toFixed(2)}`}</td>
      <td>{`$${totalCost}`}</td>
      <td>
        <button className={s.delete} onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Currency;
