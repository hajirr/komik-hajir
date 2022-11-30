const HotKomikUpdate = ({ hotKomikUpdate }) => {
  return (
    <div className="p-2 border-solid border border-sky-500 rounded-lg">
      <div className="font-semibold text-sky-500 text-sm">HOT KOMIK UPDATE</div>
      <div className="bg-sky-500 w-full mt-1 mb-3" style={{ height: 1 }}></div>
      <div className="flex space-x-2 justify-between overflow-x-auto">
        {hotKomikUpdate.map((response) => {
          return (
            <a href={response.url}>
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
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default HotKomikUpdate;
