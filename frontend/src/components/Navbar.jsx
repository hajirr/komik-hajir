import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const searchQuery = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    const url = `/search/${searchQuery.current.value}`;
    navigate(url);
  };

  return (
    <div className="bg-red-700 w-screen p-4 flex justify-between place-items-center sticky top-0">
      <a href="/" className="text-white text-2xl flex">
        Home
      </a>
      <div className="flex space-x-4 place-items-center">
        <a
          href="https://trakteer.id/baubawang.com/tip"
          target="_blank"
          rel="noreferrer"
        >
          <img
            id="wse-buttons-preview"
            src="https://cdn.trakteer.id/images/embed/trbtn-green-2.png"
            alt="Trakteer Saya"
            width={130}
          />
        </a>
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
            className="w-20 sm:w-max bg-transparent placeholder:text-red-700  py-1 px-2 focus:outline-0"
          />
          <button onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
