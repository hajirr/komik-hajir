import { useEffect, useState } from "react";
import HotKomikUpdate from "../components/HotKomikUpdate";
import PopularManga from "../components/PopularManga";
import RilisanTerbaru from "../components/RilisanTerbaru";
import {
  getHome,
  getHotKomikUpdate,
  getPopularManga,
  getRilisanTerbaru,
} from "../sources/api";

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
    // getHotKomikUpdate().then((response) => {
    //   if (response.data.status) {
    //     setHotKomikUpdate(response.data.response);
    //   }
    // });
    // getRilisanTerbaru().then((response) => {
    //   if (response.data.status) {
    //     setRilisanTerbaru(response.data.response);
    //   }
    // });
    // getPopularManga().then((response) => {
    //   if (response.data.status) {
    //     setPopularManga(response.data.response);
    //   }
    // });
  }, []);
  return (
    <div className="w-screen min-h-screen">
      <div className="bg-sky-500 w-screen p-4 flex justify-between place-items-center">
        <p className="text-white text-2xl">kumik</p>
        <input
          type="text"
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
