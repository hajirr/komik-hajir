import { useNavigate } from "react-router-dom";

const HotKomikUpdate = ({ hotKomikUpdate, isLoading }) => {
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
    <div className="p-2 border-solid border border-sky-500 rounded-lg">
      <div className="font-semibold text-sky-500 text-sm">HOT KOMIK UPDATE</div>
      <div className="bg-sky-500 w-full mt-1 mb-3" style={{ height: 1 }}></div>
      <div className="flex space-x-2 justify-between overflow-x-auto pb-4">
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
          hotKomikUpdate.map((response) => {
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
                  ></div>
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

export default HotKomikUpdate;
