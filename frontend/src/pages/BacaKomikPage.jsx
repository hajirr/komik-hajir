import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBacaKomik } from "../sources/api";

const BacaKomikPage = () => {
  const [daftarChapter, setDaftarChapter] = useState([]);
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
    window.location.reload();
  };

  useEffect(() => {
    const body = {
      url: `${komikUrl}${komik}`,
    };
    formData.append("url", `${komikUrl}${komik}`);
    console.log(body.url);
    postBacaKomik(formData)
      .then((response) => {
        setDaftarChapter(response.data.response);
        console.log(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [komik]);

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
        {daftarChapter.map((response) => {
          return <img src={response.url} alt="chapter" />;
        })}
      </div>
    </div>
  );
};

export default BacaKomikPage;
