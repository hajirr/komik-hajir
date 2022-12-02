import { useEffect, useState } from "react";
import HotKomikUpdate from "../components/HotKomikUpdate";
import Navbar from "../components/Navbar";
import PopularManga from "../components/PopularManga";
import RilisanTerbaru from "../components/RilisanTerbaru";
import { getHome } from "../sources/api";

const HomePage = () => {
  const [hotKomikUpdate, setHotKomikUpdate] = useState([]);
  const [rilisanTerbaru, setRilisanTerbaru] = useState([]);
  const [popularManga, setPopularManga] = useState([]);

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
      <Navbar />
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
