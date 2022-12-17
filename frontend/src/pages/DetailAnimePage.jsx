import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { postAnimeDetail } from "../sources/api";

const DetailAnimePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [linkDownload, setLinkDownload] = useState([]);
  const [listEpisodes, setListEpisodes] = useState([]);
  const [title, setTitle] = useState("");
  const animeUrl = process.env.REACT_APP_BASE_ANIME_URL;

  const { pathname } = window.location;
  const arrayPath = pathname.split("/");
  const anime = `/${arrayPath[arrayPath.length - 2]}`;
  const formData = new FormData();

  useEffect(() => {
    setIsLoading(true);
    formData.append("url", `${animeUrl}${anime}`);
    console.log(`URL =====> ${animeUrl}${anime}`);
    postAnimeDetail(formData)
      .then((response) => {
        setLinkDownload(response.data.response.download_link);
        setListEpisodes(response.data.response.list_of_episodes);
        setTitle(response.data.response.entry_title);
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
      <Navbar />
      {isLoading ? (
        <div className="lg:mx-72 p-4 shadow-lg rounded-lg flex flex-col space-y-4">
          <div className="animate-pulse rounded h-56 w-full bg-gray-400"></div>
          <div className="animate-pulse rounded h-56 w-full bg-gray-400"></div>
          <div className="animate-pulse rounded h-56 w-full bg-gray-400"></div>
          <div className="animate-pulse rounded h-56 w-full bg-gray-400"></div>
        </div>
      ) : (
        <div className="lg:mx-72 p-4 shadow-lg rounded-lg">
          <a href="/anime" className="text-blue-500">
            <i className="fa fa-arrow-left"></i> Kembali
          </a>
          <p className="font-bold my-4 text-center text-xl">{title}</p>
          <div className="">
            {linkDownload.map((item) => {
              return (
                <div className="mb-8">
                  <p className="text-center text-sm mb-2 text-red-500 font-bold">
                    {item.ekstensi}
                  </p>
                  <div className="w-full">
                    {item.daftar_link.map((item_daftar_link) => {
                      return (
                        <div className="">
                          <p className="text-sm font-bold mb-1">
                            {item_daftar_link.resolusi}
                          </p>
                          <div className="flex justify-between mb-2">
                            {item_daftar_link.provider_list.map(
                              (item_provider) => {
                                return (
                                  <a
                                    href={item_provider.url}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <div className="bg-red-500 text-white rounded px-2 py-1">
                                      <p>{item_provider.provider}</p>
                                    </div>
                                  </a>
                                );
                              }
                            )}
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
              Daftar episode dari anime ini
            </p>
            <div className=" h-72 overflow-auto">
              {listEpisodes.map((episode) => {
                return (
                  <a href={episode.url} className="">
                    <div className="flex space-x-2 mb-2">
                      <img src={episode.image} alt="episode" className="w-24" />
                      <div className="">
                        <p className="font-bold">{episode.title}</p>
                        <p className="text-sm text-gray-400">{episode.date}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailAnimePage;
