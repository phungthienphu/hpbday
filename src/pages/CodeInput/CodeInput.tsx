import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  unlockMessage,
  clearUnlockedMessage,
} from "../../features/memorySlice";
import { Navigate } from "react-router-dom";
import CodeMessage from "./CodeMessage";

const CodeInput = () => {
  const [code, setCode] = useState("");
  // const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { unlockedMessage } = useSelector((state: RootState) => state.memory);
  const [errormessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      dispatch(clearUnlockedMessage());
    };
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  // function canOpenNote(allowedDate: string) {
  //   const today = new Date();
  //   const unlockDate = new Date(allowedDate);

  //   return today >= unlockDate;
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (canOpenNote(unlockedMessage?.date || "")) {
    //   setErrorMessage("Bức thư này chưa tới ngày được xem nhaa!");
    //   // setError(true);
    //   setShake(true);
    //   setTimeout(() => setShake(false), 500);
    //   setTimeout(() => setErrorMessage(""), 3000);
    //   return;
    // }
    try {
      dispatch(unlockMessage(code));
      setCode("");
      setErrorMessage("");
      // setError(false);
    } catch (error) {
      if (error instanceof Error) {
        // setError(true);
        setShake(true);
        setErrorMessage(error.message);
        setTimeout(() => setShake(false), 500);
        // setTimeout(() => setError(false), 3000);
      }
    }
  };

  return (
    <div className="container mx-auto lg:px-6 md:px-6 px-1 lg:py-12 md:py-12 py-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card text-center lg:mb-8 md:mb-8 mb-4 animate-fade-in">
          <h1 className="lg:text-4xl lg:font-bold md:text-4xl md:font-bold text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink to-pastel-purple mb-4">
            💌 Nhập mã bí mật 💌
          </h1>
          <p className="text-lg text-gray-700">
            Nhập mã đặc biệt để nhận thông điệp yêu thương từ anh nhé!
          </p>
        </div>

        <div className="grid gap-8">
          <div className={`card `}>
            <div className="flex items-center gap-4 mb-5 p-2">
              <img
                src="/him-face.png"
                alt="him_face_sticker"
                className={`w-20 h-[80px] md:w-40 md:h-[150px] lg:w-40 lg:h-[150px] hover:scale-110 cursor-pointer transition-all duration-300 bg-transparent ${
                  shake ? "animate-shake" : ""
                }`}
              />
              <div className="text-left border-b border-gray-300 pb-2 w-full">
                <h2 className="text-lg md:text-xl lg:text-xl font-semibold pb-2">
                  Tôi bảo này nhé!
                </h2>
                <p
                  className={`text-xs md:text-sm lg:text-sm ${
                    errormessage ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  {errormessage
                    ? errormessage
                    : "Nhập mã đặc biệt để nhận thông tin nha."}
                </p>
                {/* <p
                  className={`mt-2 text-xs md:text-sm lg:text-sm tracking-[0.2em]  ${
                    error ? "text-rose-500" : "text-gray-400"
                  }`}
                >
                  {error
                    ? "Mật mã sai rùiii"
                    : "💡 Chữ in hoa, không khoảng trắng"}
                </p> */}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 tracking-[0.3em] uppercase text-xs text-gray-500">
                  Enter Code
                </label>
                <div className="flex w-full lg:flex-row md:flex-row flex-col gap-1 lg:gap-0 md:gap-0 border border-gray-300 bg-white shadow-sm">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      setErrorMessage("");
                    }}
                    className="flex-1 px-5 py-3 text-base tracking-[0.35em] uppercase text-gray-600 focus:outline-none"
                    placeholder="ENTER CODE"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 md:px-10 py-3 bg-[#FFB6C1] text-white text-sm tracking-[0.35em] uppercase font-semibold border-l border-gray-300  transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {unlockedMessage && (
        <CodeMessage
          onClose={() => dispatch(clearUnlockedMessage())}
          unlockedMessage={unlockedMessage}
        />
      )}
    </div>
  );
};

export default CodeInput;
