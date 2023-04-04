import { Interface } from "readline";
import s from "./CurrencyItem.module.css";
import { Currency } from "../../../types/currency.type";

interface Props {
  data: Currency;
  onClickItem: (data: Currency) => void;
}

const CurrencyItem = ({ data, onClickItem }: Props) => {
  return (
    <tr
      key={data.id}
      className={s.currencyBlock}
      onClick={() => {
        onClickItem(data);
      }}
    >
      <td>{data.rank}</td>
      <td>{data.name}</td>
      <td>{data.symbol}</td>
      <td>{Number(data.priceUsd).toFixed(2)}</td>
    </tr>
  );
};

export default CurrencyItem;
