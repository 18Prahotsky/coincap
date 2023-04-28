import { useState, useEffect, useMemo, MouseEvent } from "react";
import CoinRow from "./CoinRow/CoinRow";
import { Coin } from "../../types/coin.type";
import s from "./Main.module.scss";
import Pagination from "./Pagination/Pagination";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../httpClient";

const COINS_TOTAL = 2000; // Data from Coincap API
const LIMIT = 10;
const PAGES_TOTAL = COINS_TOTAL / LIMIT;

function Main() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [coins, setCoins] = useState<Coin[]>([]);

  const getOffset = (page: number) => {
    return LIMIT * (page - 1);
  };

  const currentPage = useMemo(() => {
    return Number(searchParams.get("page") ?? 1);
  }, [searchParams]);

  const onCoinClick = (e: MouseEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      const coinId = e.currentTarget.dataset.id;
      if (coinId) {
        navigate(coinId);
      }
    }
  };

  const fetchCoins = async () => {
    const offset = getOffset(currentPage);
    try {
      const res = await axiosInstance(`assets?offset=${offset}&limit=${LIMIT}`);
      const result = await res.data;
      setCoins(result.data as Coin[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
          {coins.map((coin) => (
            <CoinRow key={coin.id} coin={coin} onCoinClick={onCoinClick} />
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={PAGES_TOTAL} />
    </section>
  );
}

export default Main;
