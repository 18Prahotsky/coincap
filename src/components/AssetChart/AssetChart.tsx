import { useState, useEffect } from "react";
import { Coin } from "../../types/coin.type";
import s from "./AssetChart.module.css";
import { ParentSize } from "@visx/responsive";
import Diagram from "../Diagram/Diagram";
import { useParams } from "react-router-dom";

function AssetChart() {
  let { coinId } = useParams();

  const [coin, setCoin] = useState<Coin | null>(null);

  const fetchCoin = async () => {
    try {
      const res = await fetch(`https://api.coincap.io/v2/assets/${coinId}`);
      const result: any = await res.json();
      setCoin(result.data as Coin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [coinId]);

  if (coin === null) return null;

  return (
    <section className={s.section}>
      <div className={s.description}>
        <div className={s.block}>
          <h2 className={s.name}>{coin.name}</h2>
        </div>
        <div className={s.block}>
          <p className={s.text}>Rank</p>
          <div className={s.number}>{coin.rank}</div>
        </div>
        <div className={s.block}>
          <p className={s.text}>PriceUSD</p>
          <div className={s.number}>{`${Number(coin.priceUsd).toFixed(2)} $`}</div>
        </div>
        <div className={s.block}>
          <p className={s.text}>Average</p>
          <div className={s.number}>{`${Number(coin.vwap24Hr).toFixed(2)} $`}</div>
        </div>
        <div className={s.block}>
          <p className={s.text}>Price change in 24 hours</p>
          <div className={s.number}>
            {`${Number(coin.changePercent24Hr).toFixed(2)} %`}
          </div>
        </div>
      </div>
      <ParentSize className={s.parentSize}>
        {(parent) => <Diagram width={parent.width} height={500} id={coinId} />}
      </ParentSize>
    </section>
  );
}

export default AssetChart;
