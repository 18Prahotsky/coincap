import { useState, useEffect } from "react";
import { Coin } from "../../types/coin.type";
import s from "./AssetChart.module.scss";
import { ParentSize } from "@visx/responsive";
import Diagram from "../Diagram/Diagram";
import { useParams } from "react-router-dom";
import axiosInstance from "../../httpClient";
import Modal from "../Modal/Modal";
import CoinForm from "../CoinForm/CoinForm";
import { LocalStorageCoin } from "../../types/coin.type";

function AssetChart() {
  let { coinId } = useParams();

  const [coin, setCoin] = useState<Coin | null>(null);

  const [formInModal, setFormInModal] = useState(false);

  const openModal = () => {
    setFormInModal(true);
  };

  const closeModal = () => {
    setFormInModal(false);
  };

  const onAddCoin = (
    id: string,
    name: string,
    symbol: string,
    priceUsd: string,
    amount: number
  ) => {
    const localPortfolio = localStorage.getItem("portfolio");

    let newPortfolio: LocalStorageCoin[] = [];

    if (localPortfolio) {
      const parsedPortfolio = JSON.parse(localPortfolio);
      newPortfolio = [
        ...parsedPortfolio,
        {
          id: id,
          name: name,
          amount: amount,
          symbol: symbol,
          priceUsd: priceUsd,
        },
      ];
    } else {
      newPortfolio = [
        {
          id: id,
          name: name,
          amount: amount,
          symbol: symbol,
          priceUsd: priceUsd,
        },
      ];
    }

    localStorage.setItem("portfolio", JSON.stringify(newPortfolio));
    closeModal();
  };

  const fetchCoin = async () => {
    try {
      const res = await axiosInstance.get(`/assets/${coinId}`);
      setCoin(res.data.data as Coin);
    } catch (error) {
      console.error(error);
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
          <div className={s.number}>{`${Number(coin.priceUsd).toFixed(
            2
          )} $`}</div>
        </div>
        <div className={s.block}>
          <p className={s.text}>Average</p>
          <div className={s.number}>{`${Number(coin.vwap24Hr).toFixed(
            2
          )} $`}</div>
        </div>
        <div className={s.block}>
          <p className={s.text}>Price change in 24 hours</p>
          <div className={s.number}>
            {`${Number(coin.changePercent24Hr).toFixed(2)} %`}
          </div>
        </div>
        <div className={s.block} onClick={openModal}>
          <p className={s.text}>Add to portfolio</p>
        </div>
      </div>
      <ParentSize className={s.parentSize}>
        {(parent) => <Diagram width={parent.width} height={500} id={coinId} />}
      </ParentSize>
      {formInModal && (
        <Modal
          description={`Amount of ${coin.name} (${coin.symbol})`}
          onClose={closeModal}
        >
          <CoinForm coin={coin} onAddCoin={onAddCoin} />
        </Modal>
      )}
    </section>
  );
}

export default AssetChart;
