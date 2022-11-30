import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const DetailKomikPage = lazy(() => import("./pages/DetailKomikPage"));
const BacaKomikPage = lazy(() => import("./pages/BacaKomikPage"));

function App() {
  return (
    <div className="font-nunito">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Routes>
            <Route path="/detail" element={<DetailKomikPage />} />
          </Routes>
          <Routes>
            <Route path="/baca" element={<BacaKomikPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
