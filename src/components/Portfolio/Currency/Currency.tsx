import s from "./Currency.module.scss";
import { LocalStorageCoin } from "../../../types/coin.type";

interface Props {
  currency: LocalStorageCoin;
  onDelete: (id: string) => void;
}

const Currency = ({ currency, onDelete }: Props) => {
  const handleDelete = () => {
    onDelete(currency.priceUsd);
  };

  const totalCost = (Number(currency.priceUsd) * currency.amount).toFixed(2);

  const price = Number(currency.priceUsd).toFixed(2);

  const amount = currency.amount.toFixed(4);

  return (
    <tr className={s.row}>
      <td className={s.name}>{currency.name}</td>
      <td>{currency.symbol}</td>
      <td>{amount}</td>
      <td className={s.price}>{`$${price}`}</td>
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
