import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { postAnimeDetailEpisode } from "../sources/api";

const DetailEpisodeAnimePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [linkDownload, setLinkDownload] = useState([]);
  const [linkSteaming, setLinkSteaming] = useState("");
  const [listRekomendasiAnime, setListRekomendasiAnime] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const animeUrl = process.env.REACT_APP_BASE_ANIME_URL;

  const { pathname } = window.location;
  const arrayPath = pathname.split("/");
  const anime = `/${arrayPath[arrayPath.length - 2]}`;
  const formData = new FormData();

  const handleClickDetail = (url) => {
    const arrayPath = url.split("/");
    const anime = `/anime/${arrayPath[arrayPath.length - 2]}/`;
    navigate(anime);
  };

  useEffect(() => {
    setIsLoading(true);
    formData.append("url", `${animeUrl}${anime}`);
    console.log(`URL =====> ${animeUrl}${anime}`);
    postAnimeDetailEpisode(formData)
      .then((response) => {
        setLinkDownload(response.data.response.download);
        setLinkSteaming(response.data.response.url_streaming);
        setListRekomendasiAnime(response.data.response.list_rekomendasi_anime);
        setTitle(response.data.response.title);
        console.log(response.data.response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-screen min-h-screen">
      <Navbar search="anime" />
      {isLoading ? (
        <div className="lg:mx-72 p-4 shadow-lg rounded-lg flex flex-col space-y-4">
          <div className="animate-pulse rounded h-56 w-full bg-red-400"></div>
          <div className="animate-pulse rounded h-56 w-full bg-red-400"></div>
          <div className="animate-pulse rounded h-56 w-full bg-red-400"></div>
          <div className="animate-pulse rounded h-56 w-full bg-red-400"></div>
        </div>
      ) : (
        <div className="lg:mx-72 p-4 shadow-lg rounded-lg">
          <p className="font-bold my-4 text-center text-xl">{title}</p>
          <iframe
            src={linkSteaming}
            title="streaming"
            allowFullScreen
            className="w-full aspect-video"
          />
          <div className="">
            {linkDownload.map((itemLinkDownload) => {
              return (
                <div className="my-8">
                  <div className="w-full py-1 px-2 bg-red-500 mb-2">
                    <p className="text-sm text-red-500 font-bold text-white">
                      {itemLinkDownload.ekstensi.toUpperCase()}
                    </p>
                  </div>
                  <div className="w-full">
                    {itemLinkDownload.master.map((itemMaster) => {
                      return (
                        <div className="flex space-x-2 justify-between mb-2 place-items-center">
                          <div className="bg-red-500 px-2 py-1 w-20">
                            <p className="text-white text-center text-sm">
                              {itemMaster.resolusi}
                            </p>
                          </div>
                          <div className="flex space-x-4 w-full">
                            {itemMaster.list_server.map((itemListServer) => {
                              return (
                                <a
                                  href={itemListServer.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <p className="text-sm hover:text-red-400">
                                    {itemListServer.server}
                                  </p>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-1 w-full bg-gray-200"></div>
          <div className="mt-4">
            <p className="font-bold my-4 text-center text-xl">
              Rekomendasi anime hari ini
            </p>
            <div className="flex flex-wrap gap-4 justify-around">
              {listRekomendasiAnime.map((anime) => {
                return (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleClickDetail(anime.url)}
                  >
                    <img src={anime.image} alt="episode" className="w-24" />
                    <p className="font-bold text-xs w-24 text-center">
                      {anime.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailEpisodeAnimePage;
