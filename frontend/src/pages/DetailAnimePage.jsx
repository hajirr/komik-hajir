import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { postAnimeDetail } from "../sources/api";

const DetailAnimePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [linkDownload, setLinkDownload] = useState([]);
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
        console.log(response.data);
        setLinkDownload(response.data.response);
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
      <div className="lg:mx-96 p-4 shadow-lg rounded-lg">
        <p>Detail Anime Page</p>
        <div className="">
          {linkDownload.map((item) => {
            return (
              <div className="mb-8">
                <p className="text-center mb-2">{item.ekstensi}</p>
                <div className="w-full">
                  {item.daftar_link.map((item_daftar_link) => {
                    return (
                      <div className="flex justify-between mb-2">
                        <p>{item_daftar_link.resolusi}</p>
                        {item_daftar_link.provider_list.map((item_provider) => {
                          return (
                            <a href={item_provider.url}>
                              <div className="bg-red-500 text-white rounded px-2 py-1">
                                <p>{item_provider.provider}</p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailAnimePage;
