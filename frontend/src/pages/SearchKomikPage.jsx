import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { postSearch } from "../sources/api";

const SearchKomikPage = () => {
  const [daftarKomik, setDaftarKomik] = useState([]);

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
    const query = komik.split("%20").join("+");
    formData.append("query", query);
    postSearch(formData)
      .then((response) => {
        setDaftarKomik(response.data.response);
        console.log(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pathname]);
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      {daftarKomik.length < 1 && (
        <p className="text-center mt-10">Ngga ketemu</p>
      )}
      <div className="lg:mx-32 p-4 shadow-lg grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {daftarKomik.map((response) => {
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
                  <p className="text-yellow-500 text-xs">★ {response.rating}</p>
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
