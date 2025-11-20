import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const LoadingComponent = () => {
  const { isLoading } = useSelector((state: RootState) => state.auth);
  return (
    isLoading && (
      <div
        className="fixed w-full h-screen flex flex-col justify-center items-center bg-black/50"
        style={{ zIndex: 99999 }}
      >
        <div className="absolute w-full h-screen opacity-50 bg-gray"></div>
        <img
          src={"./dogloading-unscreen.gif"}
          alt="loading"
          className="w-[200px] h-[200px] object-cover"
        />
        <p className="text-white text-base font-bold">Đợi anh xíuuu....</p>
      </div>
    )
  );
};
export default LoadingComponent;
