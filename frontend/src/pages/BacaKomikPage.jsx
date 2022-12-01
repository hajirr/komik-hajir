import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBacaKomik } from "../sources/api";

const BacaKomikPage = () => {
  const [daftarChapter, setDaftarChapter] = useState({
    gambar: [],
    navigasi: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const komikUrl = process.env.REACT_APP_BASE_KOMIK_URL;

  const { pathname } = window.location;
  const arrayPath = pathname.split("/");
  const komik = `/${arrayPath[arrayPath.length - 3]}/${
    arrayPath[arrayPath.length - 2]
  }`;
  const formData = new FormData();

  const searchQuery = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    const url = `/search/${searchQuery.current.value}/`;
    navigate(url);
  };

  const handleNavigasi = (url) => {
    const arrayPath = url.split("/");
    const komik = `/${arrayPath[arrayPath.length - 3]}/${
      arrayPath[arrayPath.length - 2]
    }/`;
    navigate(komik);
  };

  useEffect(() => {
    setIsLoading(true);
    const body = {
      url: `${komikUrl}${komik}`,
    };
    formData.append("url", `${komikUrl}${komik}`);
    console.log(body.url);
    postBacaKomik(formData)
      .then((response) => {
        setDaftarChapter(response.data.response);
        console.log(response.data.response);
        setIsLoading(false);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [komik]);

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
      <div className="lg:mx-32 p-4 shadow-lg rounded-lg flex flex-col justify-center place-items-center">
        {daftarChapter.gambar.map((response) => {
          return <img src={response.url} alt="chapter" />;
        })}
      </div>
      <div className="flex justify-center space-x-4 my-4">
        {daftarChapter.navigasi.map((response) => {
          return (
            <div
              onClick={() => handleNavigasi(response.url)}
              className="rounded px-4 py-1 bg-sky-500 text-white cursor-pointer"
            >
              {/* <p>{response.title}</p> */}
              <p>{response.title.replace("Â", " ")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BacaKomikPage;
