import { useNavigate } from "react-router-dom";

const PopularManga = ({ popularManga, isLoading }) => {
  const navigate = useNavigate();
  const list = [1, 2, 3, 4, 5, 6];

  const handleClick = (url) => {
    const arrayPath = url.split("/");
    const komik = `/${arrayPath[arrayPath.length - 3]}/${
      arrayPath[arrayPath.length - 2]
    }/`;
    navigate(komik);
  };

  return (
    <div className="p-2 pb-4 border-solid border border-red-500 rounded-lg h-max">
      <div className="font-semibold text-red-500 text-sm">POPULAR MANGA</div>
      <div className="bg-red-500 w-full mt-1 mb-3" style={{ height: 1 }}></div>
      <div className="flex flex-col space-y-2">
        {isLoading &&
          list.map((item) => {
            return (
              <div className="border border-red-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex py-1 space-x-4">
                    <div className="w-20 h-32 bg-red-700 rounded"></div>
                    <div className="flex flex-col space-y-3">
                      <div className="h-2 bg-red-700 rounded"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 w-10 bg-red-700 rounded"></div>
                        <div className="h-2 w-10 bg-red-700 rounded"></div>
                        <div className="h-2 w-10 bg-red-700 rounded"></div>
                      </div>
                      <div className="h-2 bg-red-700 rounded"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 w-10 bg-red-700 rounded"></div>
                        <div className="h-2 w-10 bg-red-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {!isLoading &&
          popularManga.map((response) => {
            return (
              <div
                className="cursor-pointer"
                onClick={() => handleClick(response.url)}
                key={response.url}
              >
                <div key={response.title} className=" flex space-x-4">
                  <div
                    className="h-28 w-20"
                    style={{
                      backgroundImage: `url(${response.image})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="flex flex-col">
                    <p className="w-48 font-semibold text-xs truncate mb-2">
                      {response.title}
                    </p>
                    <div className="flex flex-wrap w-40 text-gray-400 text-xs">
                      <span className="mr-2 text-black">Genres :</span>
                      {response.genre.map((genre) => {
                        return (
                          <span key={genre} className="mr-2">
                            {genre}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PopularManga;
