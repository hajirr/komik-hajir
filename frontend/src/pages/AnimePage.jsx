import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAnimeNew, postAnimeNewPagination } from "../sources/api";

const AnimePage = () => {
  const [listLatestAnime, setListLatestAnime] = useState([]);
  const [listHotAnime, setListHotAnime] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formData = new FormData();
  const skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const navigate = useNavigate();

  const handlePagination = (url) => {
    formData.append("url", url);
    setIsLoading(true);
    postAnimeNewPagination(formData)
      .then((response) => {
        setListLatestAnime(response.data.response.latest);
        setListHotAnime(response.data.response.hot);
        setPagination(response.data.response.navigate);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleClickEpisodeDetail = (url) => {
    const arrayPath = url.split("/");
    const anime = `/anime/episode/${arrayPath[arrayPath.length - 2]}/`;
    navigate(anime);
  };

  useEffect(() => {
    setIsLoading(true);
    getAnimeNew()
      .then((response) => {
        setListLatestAnime(response.data.response.latest);
        setListHotAnime(response.data.response.hot);
        setPagination(response.data.response.navigate);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <div className="lg:mx-72 p-4 shadow-lg rounded-lg  ">
        <p className="font-bold text-lg">Rekomendasi anime hari ini</p>
        {!isLoading && (
          <div className="flex justify-around my-4 w-full">
            {listHotAnime.map((anime) => {
              return (
                <div
                  className="cursor-pointer"
                  onClick={() => handleClickEpisodeDetail(anime.url)}
                >
                  <img src={anime.image} alt="episode" className="w-24" />
                  <p className="font-bold text-xs w-24 text-center">
                    {anime.title}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <p className="font-bold text-lg">Episode Anime Terbaru</p>
        {isLoading && (
          <div className="grid grid-cols-4 gap-4 my-4 w-full">
            {skeletonList.map((item) => {
              return (
                <div className="">
                  <div className="animate-pulse h-32 bg-red-400 rounded"></div>
                  <div className="animate-pulse h-3 bg-red-400 rounded mt-2"></div>
                  <div className="animate-pulse h-3 bg-red-400 rounded mt-2"></div>
                </div>
              );
            })}
          </div>
        )}
        {!isLoading && (
          <div className=" my-4 ">
            {listLatestAnime.map((response) => {
              return (
                <div
                  key={response.url}
                  className="flex space-x-2 mx-2 mb-4 cursor-pointer"
                  onClick={() => handleClickEpisodeDetail(response.url)}
                >
                  <img src={response.image} alt="thumbnail" className="w-20" />
                  <div className="w-full">
                    <p className="text-sm font-bold">{response.title}</p>
                    <div className="flex justify-between place-items-center mt-1">
                      <div className="">
                        {response.info.map((info) => {
                          return (
                            <p className="text-sm text-gray-400">{info}</p>
                          );
                        })}
                      </div>
                      <div className="rounded px-2 py-1 bg-yellow-500 h-max w-max">
                        <p className="text-xs text-white">{response.score}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex space-x-4 w-full justify-center">
          {pagination.map((item) => {
            return (
              <div
                onClick={() => handlePagination(item.url)}
                className="px-3 py-1 rounded bg-red-500 cursor-pointer"
              >
                <p className="text-white">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
