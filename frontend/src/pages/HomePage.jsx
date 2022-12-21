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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getHome()
      .then((response) => {
        if (response.data.status) {
          setHotKomikUpdate(response.data.hot_komik_update);
          setRilisanTerbaru(response.data.rilisan_terbaru);
          setPopularManga(response.data.popular_manga);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-screen min-h-screen">
      <Navbar search="komik" />
      <div className="p-4">
        <div className="h-4"></div>
        <HotKomikUpdate hotKomikUpdate={hotKomikUpdate} isLoading={isLoading} />
        <div className="flex flex-col justify-between mt-4 space-y-4 md:space-y-0 space-x-0 md:space-x-4 md:flex-row">
          <RilisanTerbaru
            rilisanTerbaru={rilisanTerbaru}
            isLoading={isLoading}
          />
          <PopularManga popularManga={popularManga} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
