import { useNavigate } from "react-router-dom";

const RilisanTerbaru = ({ rilisanTerbaru, isLoading }) => {
  const navigate = useNavigate();
  const list = [1, 2, 3, 4, 5, 6];

  const handleClickDetail = (url) => {
    const arrayPath = url.split("/");
    const komik = `/${arrayPath[arrayPath.length - 3]}/${
      arrayPath[arrayPath.length - 2]
    }/`;
    navigate(komik);
  };

  const handleClickChapter = (url) => {
    const arrayPath = url.split("/");
    const chapter = `/${arrayPath[arrayPath.length - 3]}/${
      arrayPath[arrayPath.length - 2]
    }/`;
    navigate(chapter);
  };

  return (
    <div className="p-2 pb-4 border-solid border border-red-500 rounded-lg w-full">
      <div className="font-semibold text-red-500 text-sm">RILISAN TERBARU</div>
      <div className="bg-red-500 w-full mt-1 mb-3" style={{ height: 1 }}></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {isLoading &&
          list.map((item) => {
            return (
              <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
          rilisanTerbaru.map((response) => {
            return (
              <div key={response.url} className="flex space-x-2 justify-center">
                <div
                  className="h-48 w-28 md:w-20 md:h-32 cursor-pointer"
                  style={{
                    backgroundImage: `url(${response.image})`,
                    backgroundSize: "cover",
                  }}
                  onClick={() => handleClickDetail(response.url)}
                />
                <div className="">
                  <p
                    onClick={() => handleClickDetail(response.url)}
                    className="w-44 md:w-48 font-semibold text-sm md:truncate mb-4 cursor-pointer"
                  >
                    {response.title}
                  </p>
                  <div className="flex flex-col space-y-2">
                    {response.chapter.map((chapter) => {
                      return (
                        <div
                          key={chapter.url}
                          className="flex place-items-center justify-between cursor-pointer"
                        >
                          <div
                            className="bg-red-200 p-1 rounded "
                            onClick={() => handleClickChapter(chapter.url)}
                          >
                            <p className="text-red-700 text-xs">
                              {chapter.title}
                            </p>
                          </div>
                          <p className="text-xs">{chapter.updated_at}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RilisanTerbaru;
