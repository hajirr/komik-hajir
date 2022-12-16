import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import { ContextProvider } from "./contexts/ContextProvider";

const HomePage = lazy(() => import("./pages/HomePage"));
const DetailKomikPage = lazy(() => import("./pages/DetailKomikPage"));
const BacaKomikPage = lazy(() => import("./pages/BacaKomikPage"));
const SearchKomikPage = lazy(() => import("./pages/SearchKomikPage"));
const DaftarKomikPage = lazy(() => import("./pages/DaftarKomikPage"));
const AnimePage = lazy(() => import("./pages/AnimePage"));
const DetailAnimePage = lazy(() => import("./pages/DetailAnimePage"));

function App() {
  return (
    <ContextProvider>
      <div className="font-nunito">
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
            <Routes>
              <Route path="/search/:query" element={<SearchKomikPage />} />
            </Routes>
            <Routes>
              <Route path="/daftar-komik" element={<DaftarKomikPage />} />
            </Routes>
            <Routes>
              <Route path="/komik/:komik" element={<DetailKomikPage />} />
            </Routes>
            <Routes>
              <Route path="/chapter/:chapter" element={<BacaKomikPage />} />
            </Routes>
            <Routes>
              <Route path="/anime" element={<AnimePage />} />
            </Routes>
            <Routes>
              <Route path="/anime/:anime" element={<DetailAnimePage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </ContextProvider>
  );
}

export default App;
