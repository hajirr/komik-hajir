const PopularManga = ({ popularManga }) => {
  return (
    <div className="p-2 border-solid border border-sky-500 rounded-lg h-max">
      <div className="font-semibold text-sky-500 text-sm">POPULAR MANGA</div>
      <div className="bg-sky-500 w-full mt-1 mb-3" style={{ height: 1 }}></div>
      <div className="flex flex-col space-y-2">
        {popularManga.map((response) => {
          return (
            <a href={response.url}>
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
                    {response.genre.map((response) => {
                      return <span className="mr-2">{response}</span>;
                    })}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default PopularManga;