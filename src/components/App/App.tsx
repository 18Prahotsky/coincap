import { useState, useEffect } from "react";
import CurrencyItem from "../Main/CurrencyItem/CurrencyItem";
import { Currency } from "../../types/currency.type";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

// https://api.coincap.io/v2/assets?limit=5

function App() {
  const [coins, setCoins] = useState<Currency[]>([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        `https://api.coincap.io/v2/assets?limit=${limit}`
      );
      const data = await res.json();
      console.log(data.data);
      setCoins(data.data);
    };

    fetchCoins();
  }, [limit]);

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
      <Main value={coins} />
      <Footer />
    </>
  );
}

export default App;
