import { useAppSelector } from "../../store/hooks";

const LoadingComponent = () => {
  const authLoading = useAppSelector((state) => state.auth.isLoading);
  const globalLoading = useAppSelector((state) => state.ui.globalLoading);
  const isLoading = authLoading || globalLoading;

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
