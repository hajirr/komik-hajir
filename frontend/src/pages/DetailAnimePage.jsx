import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { postAnimeDetail } from "../sources/api";

const DetailAnimePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailAnime, setDetailAnime] = useState({
    info: [],
    list_of_episodes: [],
    genre: [],
  });

  const navigate = useNavigate();
  const animeUrl = process.env.REACT_APP_BASE_ANIME_URL;

  const { pathname } = window.location;
  const arrayPath = pathname.split("/");
  const anime = `/anime/${arrayPath[arrayPath.length - 2]}`;
  const formData = new FormData();

  const handleClickEpisodeDetail = (url) => {
    const arrayPath = url.split("/");
    const anime = `/anime/episode/${arrayPath[arrayPath.length - 2]}/`;
    navigate(anime);
  };

  const handleClickGenre = (url) => {
    const arrayPath = url.split("/");
    const anime = `/anime/genres/${arrayPath[arrayPath.length - 2]}/`;
    navigate(anime);
  };

  useEffect(() => {
    setIsLoading(true);
    formData.append("url", `${animeUrl}${anime}`);
    postAnimeDetail(formData)
      .then((response) => {
        setDetailAnime(response.data.response);
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
        <div className="">
          <div className="lg:mx-72 p-4 shadow-lg rounded-lg flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row space-x-4">
              <div className="w-full">
                <img
                  src={detailAnime.image}
                  alt="thumbnail"
                  className="mx-auto"
                />
                <p className="text-center mt-2 text-sm mb-4">
                  ⭐ {detailAnime.rating}
                </p>
              </div>
              <div className="text-sm">
                <p className="font-bold text-lg mb-1">{detailAnime.title}</p>
                <p>{detailAnime.min_desc}</p>
                <p>{detailAnime.alter}</p>
                <div className="mt-3 grid grid-cols-2">
                  {detailAnime.info.map((info) => {
                    return (
                      <div className="flex space-x-1 place-items-center">
                        <div className="bg-red-500 w-2 h-2 rounded" />
                        <p>{info}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="my-3 flex gap-2 flex-wrap">
                  {detailAnime.genre.map((genre) => {
                    return (
                      <div
                        onClick={() => handleClickGenre(genre.url)}
                        className="cursor-pointer text-xs rounded border border-red-500 px-2 py-1 hover:bg-red-500 hover:text-white"
                      >
                        <p className="">{genre.title}</p>
                      </div>
                    );
                  })}
                </div>
                <p>{detailAnime.desc}</p>
              </div>
            </div>
          </div>
          <div className="lg:mx-72 p-4 shadow-lg rounded-lg flex flex-col space-y-4 mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Episode
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailAnime.list_of_episodes.map((episode) => {
                    return (
                      <tr
                        className="bg-white border-b cursor-pointer"
                        onClick={() => handleClickEpisodeDetail(episode.url)}
                      >
                        <td class="py-4 px-6">{episode.title}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailAnimePage;
