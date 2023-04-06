import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import { Currency } from "../../types/currency.type";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AssetChart from "../AssetChart/AssetChart";

import ParentSize from "@visx/responsive/lib/components/ParentSize";

import s from "./App.module.css";
import Diagram from "../Diagram/Diagram";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={`/coinlist`} element={<Main />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <AssetChart />
      <ParentSize className={s.parentSize}>
        {({ width, height }) => <Diagram width={width} height={500} />}
      </ParentSize>
    </>
  );
}

export default App;
