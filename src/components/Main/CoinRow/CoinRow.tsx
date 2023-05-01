import s from "./CoinRow.module.scss";
import { Coin } from "../../../types/coin.type";
import { MouseEventHandler } from "react";

interface Props {
  coin: Coin;
  onCoinClick: MouseEventHandler<HTMLTableRowElement>;
}

const CoinRow = ({ coin, onCoinClick }: Props) => {
  return (
    <tr className={s.coinRowBlock} data-id={coin.id} onClick={onCoinClick}>
      <td>{coin.rank}</td>
      <td>{coin.name}</td>
      <td>{coin.symbol}</td>
      <td>{Number(coin.priceUsd).toFixed(2)}</td>
    </tr>
  );
};

export default CoinRow;
