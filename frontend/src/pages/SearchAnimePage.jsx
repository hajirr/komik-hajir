import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { postSearchAnime } from "../sources/api";

const SearchAnimePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const formData = new FormData();
  const skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const navigate = useNavigate();

  const { pathname } = window.location;
  const arrayPath = pathname.split("/");
  const animeQuery = arrayPath[arrayPath.length - 1];

  const handleClickDetail = (url) => {
    const arrayPath = url.split("/");
    const anime = `/anime/${arrayPath[arrayPath.length - 2]}/`;
    navigate(anime);
  };

  useEffect(() => {
    setIsLoading(true);
    const query = animeQuery.split("%20").join("+");
    console.log(query);
    formData.append("query", query);
    postSearchAnime(formData)
      .then((response) => {
        setSearchResult(response.data.response);
        console.log(response.data.response);
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
        <p className="font-bold text-lg mb-4">Search Result</p>
        {isLoading && (
          <div className="grid grid-cols-4 gap-4 my-4 w-full">
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
            {searchResult.map((anime) => {
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
      </div>
    </div>
  );
};

export default SearchAnimePage;
