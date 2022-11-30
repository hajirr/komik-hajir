const RilisanTerbaru = ({ rilisanTerbaru }) => {
  return (
    <div className="p-2 border-solid border border-sky-500 rounded-lg w-full">
      <div className="font-semibold text-sky-500 text-sm">RILISAN TERBARU</div>
      <div className="bg-sky-500 w-full mt-1 mb-3" style={{ height: 1 }}></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {rilisanTerbaru.map((response) => {
          return (
            <div key={response.title} className="flex space-x-2 justify-center">
              <a href={response.url}>
                <div
                  className="h-48 w-28 md:w-20 md:h-32"
                  style={{
                    backgroundImage: `url(${response.image})`,
                    backgroundSize: "cover",
                  }}
                />
              </a>
              <div className="">
                <p className="w-44 md:w-48 font-semibold text-sm md:truncate mb-4">
                  {response.title}
                </p>
                <div className="flex flex-col space-y-2">
                  {response.chapter.map((chapter) => {
                    return (
                      <div className="flex place-items-center justify-between">
                        <a href={chapter.url}>
                          <div className="bg-sky-200 p-1 rounded ">
                            <p className="text-sky-700 text-xs">
                              {chapter.title}
                            </p>
                          </div>
                        </a>
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
