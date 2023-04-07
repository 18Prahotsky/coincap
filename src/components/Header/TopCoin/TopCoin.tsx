import { Coin } from "../../../types/coin.type";
import s from "./TopCoin.module.css";

interface TopCoinProps {
  topCoin: Coin;
}

function TopCoin({ topCoin }: TopCoinProps) {
  return (
    <div className={s.topCoin}>
      <div className={s.block}>
        <h2>{topCoin.rank}</h2>
        <h2 className={s.name}>{topCoin.name}</h2>
      </div>
      <div className={s.block}>
        <p>USD</p>
        <div>{`${Number(topCoin.priceUsd).toFixed(2)} $`}</div>
      </div>
    </div>
  );
}

export default TopCoin;
