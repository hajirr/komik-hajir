import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAnimeNew, postAnimeNewPagination } from "../sources/api";

const AnimePage = () => {
  const [listAnime, setListAnime] = useState([]);
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
        setListAnime(response.data.response);
        setPagination(response.data.pagination);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleClickDetail = (url) => {
    const arrayPath = url.split("/");
    const anime = `/anime/${arrayPath[arrayPath.length - 2]}/`;
    navigate(anime);
  };

  useEffect(() => {
    setIsLoading(true);
    getAnimeNew()
      .then((response) => {
        setListAnime(response.data.response);
        setPagination(response.data.pagination);
        console.log(response.data.pagination);
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
      <div className="lg:mx-72 p-4 shadow-lg rounded-lg flex flex-col justify-center place-items-center ">
        <p className="font-bold">Episode Anime Terbaru</p>
        {isLoading && (
          <div className="grid grid-cols-4 gap-4 my-4 w-full">
            {skeletonList.map((item) => {
              return (
                <div className="">
                  <div className="animate-pulse h-32 bg-gray-400 rounded"></div>
                  <div className="animate-pulse h-3 bg-gray-400 rounded mt-2"></div>
                </div>
              );
            })}
          </div>
        )}
        {!isLoading && (
          <div className="grid grid-cols-4 gap-4 my-4 w-full">
            {listAnime.map((response) => {
              return (
                <div
                  key={response.url}
                  className="flex flex-col space-y-2 cursor-pointer"
                  onClick={() => handleClickDetail(response.url)}
                >
                  <img src={response.image} alt="thumbnail" />
                  <div className="">
                    <p className="truncate text-sm">{response.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex space-x-2">
          {pagination[0]?.text > 1 && (
            <div
              onClick={() => handlePagination(pagination[1].url)}
              className="bg-red-500 rounded px-3 py-1 cursor-pointer "
            >
              <i className="fa fa-arrow-left text-white"></i>
            </div>
          )}
          <div
            onClick={() => handlePagination(pagination[0].url)}
            className="bg-red-500 rounded px-3 py-1 cursor-pointer "
          >
            <p className=" text-white">{pagination[0]?.text}</p>
          </div>
          {pagination[0]?.text > 1 ? (
            <div
              onClick={() => handlePagination(pagination[2].url)}
              className="bg-red-500 rounded px-3 py-1 cursor-pointer"
            >
              <i className="fa fa-arrow-right text-white"></i>
            </div>
          ) : (
            <div
              onClick={() => handlePagination(pagination[1].url)}
              className="bg-red-500 rounded px-3 py-1 cursor-pointer"
            >
              <i className="fa fa-arrow-right text-white"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
