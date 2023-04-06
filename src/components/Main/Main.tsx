import { useState, useEffect, useMemo } from "react";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import { Currency } from "../../types/currency.type";
import s from "./Main.module.css";
import Pagination from "./Pagination/Pagination";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";


const COINS_TOTAL = 2000; // Data from Coincap API
const LIMIT = 10;
const PAGES_TOTAL = COINS_TOTAL / LIMIT;

function Main() {
  const [searchParams] = useSearchParams();
  const [coins, setCoins] = useState<Currency[]>([]);

  const getOffset = (page: number) => {
    return LIMIT * (page - 1);
  };

  const currentPage = useMemo(() => {
    return Number(searchParams.get("page") ?? 1);
  }, [searchParams]);




  const openModal = (item: any) => {
  // setItemDataInModal(item);
  console.log(item);
  // setCurrencyInModal(true);
};

  useEffect(() => {
    const fetchCoins = async () => {
      const offset = getOffset(currentPage);
      const res = await fetch(
        `https://api.coincap.io/v2/assets?offset=${offset}&limit=${LIMIT}`
      );
      const data = await res.json();
      setCoins(data.data);
    };
    fetchCoins();
  }, [searchParams]);

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
          {coins.map((dataItem) => (
            <CurrencyItem
              key={dataItem.id}
              data={dataItem}
              onClickItem={openModal}
            />
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={PAGES_TOTAL} />

      
    </section>
  );
}

export default Main;

// const [itemDataInModal, setItemDataInModal] = useState(null);
// const [currencyInModal, setCurrencyInModal] = useState(false);

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


