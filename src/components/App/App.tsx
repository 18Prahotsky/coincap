import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Currency } from "../../types/currency.type";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function App() {
  const maxTotalCoins = Number(2000); // Data from API Coins
  const [coins, setCoins] = useState<Currency[]>([]);
  const [limit, setLimit] = useState(10);

  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);

  const getCurrencyList = (numberPage: number) => {
    setOffset(limit * (numberPage - 1));
    setCurrentPage(numberPage);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        `https://api.coincap.io/v2/assets?offset=${offset}&limit=${limit}`
      );
      const data = await res.json();
      setCoins(data.data);
      setTotalPages(maxTotalCoins / limit);
    };
    fetchCoins();
  }, [offset, currentPage]);

  // const handleRefresh = () => {
  //   setLimit(5);
  //   window.scrollTo(0, 0);
  // };

  // const [itemDataInModal, setItemDataInModal] = useState(null);
  // const [currencyInModal, setCurrencyInModal] = useState(false);

  // const openModal = (item: any) => {
  //   setItemDataInModal(item);
  //   console.log(item)
  //   setCurrencyInModal(true);
  // };

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path={`/coinlist/${currentPage}`}
            element={
              <Main
                value={coins}
                offset={offset}
                totalPages={totalPages}
                getCurrencyList={getCurrencyList}
              />
            }
          />
        </Routes>
      </BrowserRouter>

      {/* <Main
            value={coins}
            offset={offset}
            totalPages={totalPages}
            getCurrencyList={getCurrencyList}
          /> */}

      <Footer />
    </>
  );
}

export default App;
