import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AssetChart from "../AssetChart/AssetChart";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={`/coinlist`} element={<Main />} />
          <Route path="/coinlist/:coinId" element={<AssetChart />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
