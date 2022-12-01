import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HotKomikUpdate from "../components/HotKomikUpdate";
import PopularManga from "../components/PopularManga";
import RilisanTerbaru from "../components/RilisanTerbaru";
import { getHome } from "../sources/api";

const HomePage = () => {
  const [hotKomikUpdate, setHotKomikUpdate] = useState([]);
  const [rilisanTerbaru, setRilisanTerbaru] = useState([]);
  const [popularManga, setPopularManga] = useState([]);

  const searchQuery = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    const url = `/search/${searchQuery.current.value}`;
    navigate(url);
  };

  useEffect(() => {
    getHome().then((response) => {
      if (response.data.status) {
        setHotKomikUpdate(response.data.hot_komik_update);
        setRilisanTerbaru(response.data.rilisan_terbaru);
        setPopularManga(response.data.popular_manga);
      }
    });
  }, []);
  return (
    <div className="w-screen min-h-screen">
      <div className="bg-sky-500 w-screen p-4 flex justify-between place-items-center">
        <a href="/" className="text-white text-2xl">
          kumik
        </a>
        <input
          type="text"
          ref={searchQuery}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Cari..."
          className="placeholder:text-sky-700 py-1 px-2 rounded bg-sky-300 text-sky-700"
        />
      </div>
      <div className="p-4">
        <HotKomikUpdate hotKomikUpdate={hotKomikUpdate} />
        <div className="flex flex-col justify-between mt-4 space-y-4 md:space-y-0 space-x-0 md:space-x-4 md:flex-row">
          <RilisanTerbaru rilisanTerbaru={rilisanTerbaru} />
          <PopularManga popularManga={popularManga} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
