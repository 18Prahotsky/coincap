import { useState, useEffect } from "react";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import { Currency } from "../../types/currency.type";
import s from "./Main.module.css";

// https://api.coincap.io/v2/assets?limit=5

interface MainProps {
  value: Array<Currency>;
}

function Main({ value }: MainProps) {
  // const [coins, setCoins] = useState<Currency[]>([]);
  const [limit, setLimit] = useState(5);

  // useEffect(() => {
  //   const fetchCoins = async () => {
  //     const res = await fetch(
  //       `https://api.coincap.io/v2/assets?limit=${limit}`
  //     );
  //     const data = await res.json();
  //     console.log(data.data);
  //     setCoins(data.data);
  //   };

  //   fetchCoins();
  // }, [limit]);

  const handleRefresh = () => {
    setLimit(5);
    window.scrollTo(0, 0);
  };

  const [itemDataInModal, setItemDataInModal] = useState(null);
  const [currencyInModal, setCurrencyInModal] = useState(false);

  const openModal = (item: any) => {
    setItemDataInModal(item);
    console.log(item);
    setCurrencyInModal(true);
  };

  return (
    <section className={s.main}>
      <table>
        <thead className={s.thead}>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {value.map((dataItem) => (
            <CurrencyItem data={dataItem} onClickItem={openModal} />
          ))}
        </tbody>
      </table>

      <div className="buttons">
        <button onClick={() => setLimit(limit + 5)}>Next</button>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    </section>
  );
}

export default Main;
