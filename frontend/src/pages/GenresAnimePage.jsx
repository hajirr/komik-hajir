import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { postAnimeGenrePagination, postGenresAnime } from "../sources/api";

const GenresAnimePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultGenres, setResultGenres] = useState([]);
  const [title, setTitle] = useState("");
  const [pagination, setPagination] = useState([]);
  const formData = new FormData();
  const skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const navigate = useNavigate();
  const animeUrl = process.env.REACT_APP_BASE_ANIME_URL;

  const { pathname } = window.location;
  const arrayPath = pathname.split("/");

  const handleClickDetail = (url) => {
    const arrayPath = url.split("/");
    const anime = `/anime/${arrayPath[arrayPath.length - 2]}/`;
    navigate(anime);
  };

  const handlePagination = (url) => {
    setIsLoading(true);

    formData.append("url", url);
    postAnimeGenrePagination(formData)
      .then((response) => {
        setResultGenres(response.data.response.result);
        setTitle(response.data.response.title);
        setPagination(response.data.response.pagination);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    formData.append(
      "url",
      `${animeUrl}/genres/${arrayPath[arrayPath.length - 2]}/`
    );
    postGenresAnime(formData)
      .then((response) => {
        setResultGenres(response.data.response.result);
        setTitle(response.data.response.title);
        setPagination(response.data.response.pagination);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [pathname]);

  return (
    <div className="w-screen min-h-screen">
      <Navbar search="anime" />
      <div className="lg:mx-72 p-4 shadow-lg rounded-lg  ">
        <p className="font-bold text-lg mb-4">{title}</p>
        {isLoading && (
          <div className="flex flex-wrap gap-4 justify-around w-full">
            {skeletonList.map((item) => {
              return (
                <div className="">
                  <div className="animate-pulse h-32 w-24 bg-red-400 rounded"></div>
                  <div className="animate-pulse h-3 w-24 bg-red-400 rounded mt-2"></div>
                  <div className="animate-pulse h-3 w-24 bg-red-400 rounded mt-2"></div>
                </div>
              );
            })}
          </div>
        )}
        {!isLoading && (
          <div className="flex flex-wrap gap-4 justify-around w-full">
            {resultGenres.map((anime) => {
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
        )}
        {!isLoading && (
          <div className="flex space-x-4 w-full justify-center mt-8">
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
        )}
      </div>
    </div>
  );
};

export default GenresAnimePage;
