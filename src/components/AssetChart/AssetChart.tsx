import { useState, useEffect, useMemo } from "react";

import { Currency } from "../../types/currency.type";
import s from "./AssetChart.module.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";




function AssetChart() {
//   const [searchParams] = useSearchParams();
  const [coinStock, setCoinStock] = useState<Currency[]>([]);

console.log(coinStock)
//   const currentPage = useMemo(() => {
//     return Number(searchParams.get("page") ?? 1);
//   }, [searchParams]);




//   const openModal = (item: any) => {
//   // setItemDataInModal(item);
//   console.log(item);
//   // setCurrencyInModal(true);
// };

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1", {
        method: 'GET',
        redirect: 'follow',
      })
        .then(response => response.json())
        .then(result => setCoinStock(result.data))
        .catch(error => console.log('error', error));
  
    
  }, [])

  

//   useEffect(() => {
//     const fetchCoins = async () => {
//         // const offset = getOffset(currentPage);
//         const res = await fetch(
//           `https://api.coincap.io/v2/assets`
//         );
//         const data = await res.json();
//         console.log(data.data);
//       };
//       fetchCoins();
//   }, []);

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
        
        </tbody>
      </table>
    
    </section>
  );
}

export default AssetChart;