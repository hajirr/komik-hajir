import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const searchQuery = useRef();
  const navigate = useNavigate();

  const { pathname } = window.location;
  const arrayPath = pathname.split("/");
  const isAnimePage = `/${arrayPath[arrayPath.length - 1]}`;

  const handleSearch = () => {
    const url = `/search/${searchQuery.current.value}`;
    navigate(url);
  };

  return (
    <div className="bg-red-700 w-screen p-4 flex justify-between place-items-center sticky top-0">
      <div className="flex space-x-4 place-items-center">
        <a href="/" className="text-white text-xl flex">
          Home
        </a>
        {isAnimePage !== "/anime" && (
          <div className="flex place-items-center bg-red-300 text-red-700 pr-2 rounded">
            <input
              type="text"
              ref={searchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Cari..."
              className="bg-transparent placeholder:text-red-700 py-1 px-2 focus:outline-0"
            />
            <button onClick={handleSearch}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        )}
      </div>
      <a href="/anime">
        <p className="text-white text-xs text-center ml-2">Download Anime</p>
      </a>
    </div>
  );
};

export default Navbar;
