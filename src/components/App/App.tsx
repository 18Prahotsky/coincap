import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AssetChart from "../AssetChart/AssetChart";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter basename="/coincap">
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path="/:coinId" element={<AssetChart />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
