import { useState, useEffect } from "react";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import { Currency } from "../../types/currency.type";
import s from "./Main.module.css";
import PaginationList from "./PaginationList/PaginationList";

// https://api.coincap.io/v2/assets?limit=5

interface MainProps {
  value: Array<Currency>;
  offset: number;
  totalPages: number;
  getCurrencyList: (data: number) => void;
}

function Main({ value, offset, totalPages, getCurrencyList }: MainProps) {
  const [itemDataInModal, setItemDataInModal] = useState(null);
  const [currencyInModal, setCurrencyInModal] = useState(false);

  const openModal = (item: any) => {
    setItemDataInModal(item);
    console.log(item);
    setCurrencyInModal(true);
  };

  return (
    <section className={s.main}>
      <table className={s.table}>
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
      <PaginationList totalPages={totalPages} getCurrencyList={getCurrencyList} />
    </section>
  );
}

export default Main;

{
  /* <div className="buttons">
<button onClick={() => setLimit(limit + 5)}>Next</button>
<button onClick={handleRefresh}>Refresh</button>
</div> */
}

// const handleRefresh = () => {
//   setLimit(5);
//   window.scrollTo(0, 0);
// };
