import s from "./Header.module.css";
import logo from "../../logo.svg";
import { Coin } from "../../types/coin.type";
import { useEffect, useState } from "react";
import TopCoin from "./TopCoin/TopCoin";

function Header() {
  const [topCoins, setTopCoins] = useState<Coin[]>([]);

  const fetchTopCoins = async () => {
    try {
      const res = await fetch(`https://api.coincap.io/v2/assets?limit=3`);
      const result = await res.json();
      setTopCoins(result.data as Coin[]);
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
    </header>
  );
}

export default Header;
