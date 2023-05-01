import s from "./Header.module.scss";
import logo from "../../images/logo.svg";
import portfolio from "../../images/portfolio.svg";
import { Coin } from "../../types/coin.type";
import { useEffect, useState } from "react";
import TopCoin from "./TopCoin/TopCoin";
import axiosInstance from "../../httpClient";
import Modal from "../Modal/Modal";
import Portfolio from "../Portfolio/Portfolio";

function Header() {
  const [topCoins, setTopCoins] = useState<Coin[]>([]);

  const [formInModal, setFormInModal] = useState(false);

  const openModal = () => {
    setFormInModal(true);
  };

  const closeModal = () => {
    setFormInModal(false);
  };

  const fetchTopCoins = async () => {
    try {
      const res = await axiosInstance.get(`/assets?limit=3`);
      setTopCoins(res.data.data as Coin[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopCoins();
  }, []);

  return (
    <header className={s.header}>
      <div className={s.coincap}>
        <img src={logo} className={`${s.logo}`} alt="logo" />
        <p className={s.name}>Coincap</p>
      </div>
      <div className={s.topCoins}>
        {topCoins.map((topCoin) => (
          <TopCoin key={topCoin.id} topCoin={topCoin} />
        ))}
      </div>
      <button className={s.portfolio} onClick={openModal}>
        <img src={portfolio} className={`${s.portfolioIcon}`} alt="logo" />
      </button>
      {formInModal && (
        <Modal description={`Portfolio`} onClose={closeModal}>
          <Portfolio />
        </Modal>
      )}
    </header>
  );
}

export default Header;
