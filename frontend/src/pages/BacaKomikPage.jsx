import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { postBacaKomik } from "../sources/api";

const BacaKomikPage = () => {
  const [daftarChapter, setDaftarChapter] = useState({
    title: "",
    detail_komik: "",
    gambar: [],
    navigasi: [],
    list: [],
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

  const handleNavigasi = (url) => {
    const arrayPath = url.split("/");
    const komik = `/${arrayPath[arrayPath.length - 3]}/${
      arrayPath[arrayPath.length - 2]
    }/`;
    navigate(komik);
  };

  const handleSelected = (url) => {
    const arrayPath = url.split("/");
    const komik = `/${arrayPath[arrayPath.length - 3]}/${
      arrayPath[arrayPath.length - 2]
    }/`;
    navigate(komik);
  };

  useEffect(() => {
    setIsLoading(true);
    formData.append("url", `${komikUrl}${komik}`);
    postBacaKomik(formData)
      .then((response) => {
        setDaftarChapter(response.data.response);
        setIsLoading(false);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [komik]);

  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <div className="lg:mx-96 p-4 shadow-lg rounded-lg flex flex-col justify-center place-items-center ">
        <p className="font-bold text-2xl text-center">{daftarChapter.title}</p>
        <p className="text-gray-400 text-sm">
          Semua chapter ada di{" "}
          <span
            className="cursor-pointer text-red-500"
            onClick={() => handleNavigasi(daftarChapter.detail_komik)}
          >
            sini
          </span>{" "}
        </p>

        <select
          className="rounded bg-red-500 text-white px-2 py-1 text-sm mt-5 mb-4"
          name="chapter"
          onChange={(e) => handleSelected(e.target.value)}
        >
          <option>Pilih Chapter</option>
          {daftarChapter.list.map((response) => {
            return (
              <option key={response.url} value={response.url}>
                {response.title}
              </option>
            );
          })}
        </select>
        <div className="mt-4">
          {daftarChapter.gambar.map((response) => {
            return (
              <img
                key={response.url}
                src={response.url}
                alt="chapter"
                className="w-full"
              />
            );
          })}
        </div>
        <div className="flex justify-center space-x-4 my-4 mt-10">
          {daftarChapter.navigasi.map((response) => {
            return (
              <div
                onClick={() => handleNavigasi(response.url)}
                className="rounded px-4 py-1 bg-red-500 text-white cursor-pointer text-sm"
                key={response.url}
              >
                <p>{response.title.replace("Â", " ")}</p>
              </div>
            );
          })}
        </div>
        <select
          className="mx-auto rounded bg-red-500 text-white px-2 py-1 text-sm my-5 mb-4"
          name="chapter"
          onChange={(e) => handleSelected(e.target.value)}
        >
          <option>Pilih Chapter</option>
          {daftarChapter.list.map((response) => {
            return (
              <option key={response.url} value={response.url}>
                {response.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default BacaKomikPage;
