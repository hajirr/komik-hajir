import zeta from "../assets/zeta.webp";

const Loading = () => {
  return (
    <div
      className="w-screen min-h-screen flex justify-center place-items-center"
      style={{ backgroundColor: "#F4F4F4" }}
    >
      <div className="w-96">
        <img src={zeta} alt="zeta_loader" className="animate-bounce" />
      </div>
    </div>
  );
};

export default Loading;
