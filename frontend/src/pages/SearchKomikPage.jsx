import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { postSearch } from "../sources/api";

const SearchKomikPage = () => {
  const [daftarKomik, setDaftarKomik] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const list = [1, 2, 3, 4, 5, 6];

  const { pathname } = window.location;
  const arrayPath = pathname.split("/");
  const komik = arrayPath[arrayPath.length - 1];
  const formData = new FormData();
  const navigate = useNavigate();

  const handleClick = (url) => {
    const arrayPath = url.split("/");
    const komik = `/${arrayPath[arrayPath.length - 3]}/${
      arrayPath[arrayPath.length - 2]
    }/`;
    navigate(komik);
  };

  useEffect(() => {
    setIsLoading(true);
    const query = komik.split("%20").join("+");
    formData.append("query", query);
    postSearch(formData)
      .then((response) => {
        setDaftarKomik(response.data.response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [pathname]);
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      {!isLoading && daftarKomik.length < 1 && (
        <p className="text-center mt-10">Ngga ketemu</p>
      )}
      <div className="lg:mx-32 p-4 shadow-lg grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {isLoading &&
          list.map((item) => {
            return (
              <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-20 bg-sky-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-sky-700 rounded col-span-2"></div>
                        <div className="h-2 bg-sky-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-sky-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {!isLoading &&
          daftarKomik.map((response) => {
            return (
              <div
                className="cursor-pointer"
                onClick={() => handleClick(response.url)}
                key={response.url}
              >
                <div key={response.title} className="w-28">
                  <div
                    className="h-40 w-28"
                    style={{
                      backgroundImage: `url(${response.image})`,
                      backgroundSize: "cover",
                    }}
                  >
                    {/* <img src={response.image} alt="komik" /> */}
                  </div>
                  <p className="font-semibold text-xs truncate my-1">
                    {response.title}
                  </p>
                  <div className="flex justify-between mt-2">
                    <p className="text-xs">{response.chapter}</p>
                    <p className="text-yellow-500 text-xs">
                      ★ {response.rating}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchKomikPage;
