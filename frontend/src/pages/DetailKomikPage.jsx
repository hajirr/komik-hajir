import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postDetailKomik } from "../sources/api";

const DetailKomikPage = () => {
  const [daftarChapter, setDaftarChapter] = useState({
    title: "",
    info_komik: [],
    image: "",
    daftar_chapter: [],
    genre: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const komikUrl = process.env.REACT_APP_BASE_KOMIK_URL;

  const { pathname } = window.location;
  const arrayPath = pathname.split("/");
  const komik = `/${arrayPath[arrayPath.length - 3]}/${
    arrayPath[arrayPath.length - 2]
  }`;
  const formData = new FormData();
  const navigate = useNavigate();

  const handleClickChapter = (url) => {
    // setUrlChapterKomik(url);
    const arrayPath = url.split("/");
    const chapter = `/${arrayPath[arrayPath.length - 3]}/${
      arrayPath[arrayPath.length - 2]
    }/`;
    navigate(chapter);
  };

  const searchQuery = useRef();

  const handleSearch = () => {
    const url = `/search/${searchQuery.current.value}`;
    navigate(url);
  };

  useEffect(() => {
    setIsLoading(true);
    const body = {
      url: `${komikUrl}${komik}`,
    };
    formData.append("url", `${komikUrl}${komik}`);
    console.log(body.url);
    postDetailKomik(formData)
      .then((response) => {
        setDaftarChapter(response.data.response);
        console.log(response.data.response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen min-h-screen flex justify-center place-items-center">
        Loading
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen">
      <div className="bg-sky-500 w-screen p-4 flex justify-between place-items-center">
        <a href="/" className="text-white text-2xl">
          kumik
        </a>
        <input
          type="text"
          ref={searchQuery}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Cari..."
          className="placeholder:text-sky-700 py-1 px-2 rounded bg-sky-300 text-sky-700"
        />
      </div>
      <div className="lg:mx-32 p-4 shadow-lg rounded-lg">
        <div className="flex flex-wrap mb-4">
          <div className="w-96 pb-4 pr-4">
            <img src={daftarChapter.image} alt="thubnail" />
          </div>
          <div className="w-72 ">
            <p className="font-semibold text-lg">{daftarChapter.title}</p>
            <div className="flex flex-wrap sm:grid-cols-2 gap-2 mt-2 mb-6">
              {daftarChapter.genre.map((genre) => {
                return (
                  <div className="rounded bg-sky-600 text-white px-2 py-1 h-max w-max">
                    <p className="text-xs">{genre}</p>
                  </div>
                );
              })}
            </div>
            {daftarChapter.info_komik.map((info) => {
              return (
                <p className="text-sm text-gray-400">
                  {info.split(":")[0]}:
                  <span className="text-sky-500 font-semibold">
                    {info.split(":")[1]}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
        <div className="border-b mb-4 py-2 text-sky-500">
          <p>Chapter</p>
        </div>
        {daftarChapter.daftar_chapter.map((response) => {
          return (
            <div
              className="cursor-pointer flex space-x-2 text-xs w-full justify-between border-b mb-2 py-2 font-semibold"
              onClick={() => handleClickChapter(response.url)}
            >
              <p>{response.title}</p> <p>{response.updated_at}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailKomikPage;
